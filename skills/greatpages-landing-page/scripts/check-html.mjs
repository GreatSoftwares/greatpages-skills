#!/usr/bin/env node
/**
 * Confere um index.html antes de mandar para o GreatPages. Sem dependências: node check-html.mjs pagina.html
 *
 * Sai com código 1 quando há ERRO (a página não deve ser importada assim). AVISO não bloqueia.
 * As regras espelham references/html-rules.md: o que a plataforma recusa, marca ou ignora, e o
 * que faz um formulário virar lead.
 */
import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
    console.error("Uso: node check-html.mjs <index.html>");
    process.exit(2);
}

const html = readFileSync(file, "utf8");
const errors = [];
const warnings = [];
const error = (text) => errors.push(text);
const warn = (text) => warnings.push(text);

const count = (pattern) => (html.match(pattern) ?? []).length;
const has = (pattern) => pattern.test(html);
const metaContent = (attribute, value) => {
    const tag = (html.match(/<meta\b[^>]*>/gi) ?? []).find((meta) => new RegExp(`\\s${attribute}\\s*=\\s*["']${value}["']`, "i").test(meta));
    return tag === undefined ? undefined : (/\scontent\s*=\s*["']([^"']*)["']/i.exec(tag)?.[1] ?? "");
};

const HTML_MAX_CHARS = 2_000_000;
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;
const FORM_KEY = /^[a-z0-9]{8}$/;
const PHONE_NAME = /fone|phone|whats|celular|\btel/i;
const PLACEHOLDER = /\[[A-ZÁÉÍÓÚÂÊÔÃÕÇ][^\]\n]{1,80}\]|lorem ipsum|\[URL-|\[DDD\]|\[NUMERO\]/g;

// Tamanho e esqueleto
if (html.length > HTML_MAX_CHARS) error(`HTML com ${html.length.toLocaleString("pt-BR")} caracteres; o argumento html aceita até ${HTML_MAX_CHARS.toLocaleString("pt-BR")}. Use .zip.`);
if (!/^\s*<!doctype html>/i.test(html)) error("Falta <!doctype html> na primeira linha.");
if (!has(/<html\b[^>]*\blang\s*=/i)) error('Falta lang no <html> (use lang="pt-BR").');
if (!has(/<meta\b[^>]*charset\s*=\s*["']?utf-8/i)) error('Falta <meta charset="utf-8">.');
if (!has(/<meta\b[^>]*name\s*=\s*["']viewport["']/i)) error("Falta a meta viewport: a página não vai se adaptar ao celular.");

// SEO e compartilhamento: vêm só do <head>
const title = /<title>([^<]*)<\/title>/i.exec(html)?.[1]?.trim() ?? "";
if (title === "") error("Falta <title>.");
else if (title.length > TITLE_MAX) warn(`<title> com ${title.length} caracteres; o Google corta perto de ${TITLE_MAX}.`);
const description = metaContent("name", "description");
if (description === undefined || description.trim() === "") error('Falta <meta name="description">.');
else if (description.length > DESCRIPTION_MAX) warn(`meta description com ${description.length} caracteres; o ideal é até ${DESCRIPTION_MAX}.`);
for (const property of ["og:title", "og:description", "og:image"]) {
    if (!has(new RegExp(`<meta\\b[^>]*property\\s*=\\s*["']${property}["']`, "i"))) warn(`Falta <meta property="${property}">: o link compartilhado sai sem preview.`);
}
const ogImage = metaContent("property", "og:image");
if (ogImage !== undefined && !/^https:\/\//i.test(ogImage)) error(`og:image precisa ser URL absoluta https (está "${ogImage}").`);

// Placeholders e links vazios
const placeholders = [...new Set((html.match(PLACEHOLDER) ?? []).map((item) => item.slice(0, 40)))];
if (placeholders.length > 0) error(`Placeholder no HTML: ${placeholders.slice(0, 8).join(", ")}${placeholders.length > 8 ? "…" : ""}.`);
const emptyLinks = count(/<a\b[^>]*href\s*=\s*["']#?["']/gi);
if (emptyLinks > 0) error(`${emptyLinks} link(s) com href vazio ou "#". CTA precisa de destino real.`);

// Hierarquia
const h1 = count(/<h1\b/gi);
if (h1 === 0) error("Falta <h1>: a headline do hero precisa ser o h1.");
else if (h1 > 1) warn(`${h1} <h1> na página; o ideal é um só.`);

// Código executável: aceito no import, mas marcado; no sync pede confirmação
const scripts = count(/<script\b/gi);
if (scripts > 0) warn(`${scripts} <script>: aceito, mas pages_html_sync vai pedir confirmação quando entrar código novo. Página sem script não cai nisso.`);
if (has(/<link\b[^>]*rel\s*=\s*["'](stylesheet|preconnect|preload|dns-prefetch)["']/i)) warn("<link rel=stylesheet/preconnect/preload> é código marcado. Fontes do Google: use @import dentro de <style>.");
if (has(/<(iframe|frame|frameset|object|embed|base|portal)\b/i)) warn("<iframe>, <object>, <embed> ou <base> na página: marcado; avalie se um link com imagem de capa resolve.");
if (has(/<meta\b[^>]*http-equiv/i)) warn("<meta http-equiv> é marcado. Remova se não for essencial.");
if (has(/\son[a-z]+\s*=/i)) error("Atributo on*= (onclick, onload...) no HTML. Troque por CSS ou por <script> inline, de preferência nenhum.");
if (has(/(href|src|action)\s*=\s*["']\s*javascript:/i)) error('URL "javascript:" em href/src/action: recusado.');
if (has(/@import\s+(?:url\()?\s*["']?https?:\/\/(?!fonts\.googleapis\.com)/i)) error("@import de CSS fora de fonts.googleapis.com é marcado como código perigoso.");
if (has(/expression\s*\(|-moz-binding|(?<![\w-])behavior\s*:/i)) error("CSS com expression(), -moz-binding ou behavior: é recusado.");
const dataUris = html.match(/src\s*=\s*["']data:[^"']{2000,}/gi) ?? [];
if (dataUris.length > 0) error(`${dataUris.length} imagem(ns) em data: URI grande. Envie como arquivo no .zip ou por URL https.`);
if (has(/cdn\.tailwindcss\.com|bootstrap(\.min)?\.css|cdn\.jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com/i)) warn("CSS ou JS por CDN: marcado e dependente de terceiro. Escreva o CSS na própria página.");

// Rastreamento: configura-se no painel, não no HTML
if (has(/fbq\s*\(|googletagmanager\.com|gtag\s*\(|google-analytics\.com/i)) warn("Pixel do Facebook, GTM ou Analytics colado no HTML. A plataforma injeta os dela: configure no painel da página e tire daqui.");

// Formulários
const forms = html.match(/<form\b[^>]*>[\s\S]*?<\/form>/gi) ?? [];
forms.forEach((form, index) => {
    const label = `Formulário ${index + 1}`;
    const open = /<form\b[^>]*>/i.exec(form)[0];
    if (/\saction\s*=/i.test(open)) warn(`${label}: tem action. Sem action o envio vira lead e mostra a mensagem; com action a página segue para a URL.`);
    const key = /data-gp-form\s*=\s*["']([^"']*)["']/i.exec(open)?.[1];
    if (key !== undefined && !FORM_KEY.test(key)) error(`${label}: data-gp-form="${key}" inválido. Não invente a chave: a plataforma atribui no import; só mantenha a que já existe.`);
    if (!/data-gp-conversao\s*=\s*["']true["']/i.test(open)) warn(`${label}: sem data-gp-conversao="true". O import liga sozinho quando o formulário parece de contato, mas é melhor declarar.`);
    const after = /data-gp-apos-envio\s*=\s*["']([^"']*)["']/i.exec(open)?.[1];
    if (after !== undefined && !["mensagem", "redirecionar", "seguir"].includes(after)) error(`${label}: data-gp-apos-envio="${after}" inválido (mensagem, redirecionar ou seguir).`);
    if (after === "redirecionar" && !/data-gp-redirect\s*=\s*["']https?:\/\//i.test(open)) error(`${label}: redirecionar sem data-gp-redirect com URL absoluta.`);
    if (after === "mensagem" && !/data-gp-mensagem\s*=\s*["'][^"']+["']/i.test(open)) warn(`${label}: data-gp-apos-envio="mensagem" sem data-gp-mensagem; o aviso vai sair "Obrigado!".`);

    const controls = form.match(/<(input|textarea|select)\b[^>]*>/gi) ?? [];
    const named = controls.filter((control) => /\sname\s*=\s*["'][^"']+["']/i.test(control));
    const unnamed = controls.filter((control) => !/\sname\s*=/i.test(control) && !/type\s*=\s*["'](submit|button|reset)["']/i.test(control));
    if (unnamed.length > 0) error(`${label}: ${unnamed.length} campo(s) sem name. Campo sem name não vai no lead.`);
    const textLike = named.filter((control) => /<(textarea|select)\b/i.test(control) || !/type\s*=/i.test(control) || /type\s*=\s*["'](text|email|tel|number|url)["']/i.test(control));
    if (textLike.length === 0) error(`${label}: nenhum campo de texto, e-mail ou telefone; não vira lead.`);
    if (textLike.length === 1 && !/type\s*=\s*["'](email|tel)["']/i.test(textLike[0]) && !/name\s*=\s*["'][^"']*(mail|fone|phone|whats|celular|tel)[^"']*["']/i.test(textLike[0])) {
        error(`${label}: com um campo só, ele precisa ser e-mail ou telefone para virar lead.`);
    }
    if (/type\s*=\s*["']password["']/i.test(form)) error(`${label}: campo password; formulário de login não vira lead.`);
    if (/role\s*=\s*["']search["']|type\s*=\s*["']search["']/i.test(form)) error(`${label}: formulário de busca não vira lead.`);
    for (const control of named) {
        const name = /\sname\s*=\s*["']([^"']+)["']/i.exec(control)[1];
        if (PHONE_NAME.test(name) && !/type\s*=\s*["']tel["']/i.test(control)) warn(`${label}: campo "${name}" parece telefone; use type="tel" e inputmode="tel".`);
        if (/type\s*=\s*["'](checkbox|radio|hidden)["']/i.test(control)) continue;
        const id = /\sid\s*=\s*["']([^"']+)["']/i.exec(control)?.[1];
        if (id === undefined || !new RegExp(`<label\\b[^>]*for\\s*=\\s*["']${id}["']`, "i").test(form)) {
            if (!/aria-label\s*=|placeholder\s*=/i.test(control)) warn(`${label}: campo "${name}" sem <label for>, aria-label ou placeholder; o lead sai com o name como título.`);
        }
    }
    if (!/<(button|input)\b[^>]*type\s*=\s*["']submit["']/i.test(form) && !/<button\b(?![^>]*type\s*=)/i.test(form)) error(`${label}: sem botão de envio.`);
    if (!/lgpd|privacidade|consent|aceito|concordo/i.test(form)) warn(`${label}: sem aviso de consentimento ou link de privacidade (LGPD).`);
});
if (forms.length === 0 && count(/data-conversao\s*=\s*["']true["']/gi) === 0) warn('Nenhum formulário e nenhum data-conversao="true": a página não vai registrar conversão.');

// Gatilhos de clique
const marked = html.match(/<(a|button)\b[^>]*data-conversao\s*=\s*["']true["'][^>]*>/gi) ?? [];
for (const trigger of marked) {
    if (/^<a\b/i.test(trigger) && !/href\s*=\s*["'](https?:|tel:|mailto:)/i.test(trigger)) error(`Gatilho data-conversao em <a> sem href externo, tel: ou mailto: ${trigger.slice(0, 80)}`);
}
const whatsapp = html.match(/href\s*=\s*["']https:\/\/(wa\.me|api\.whatsapp\.com)[^"']*["']/gi) ?? [];
for (const link of whatsapp) {
    if (/\?text=[^"']*[ áéíóúãõçÁÉÍÓÚÃÕÇ]/.test(link)) error(`Mensagem do WhatsApp sem codificar para URL: ${link.slice(0, 70)}`);
    if (!/wa\.me\/55\d{10,11}/i.test(link) && /wa\.me/i.test(link)) warn(`Link do WhatsApp fora do padrão wa.me/55DDDNUMERO: ${link.slice(0, 70)}`);
}

// Imagens e links
const images = html.match(/<img\b[^>]*>/gi) ?? [];
const noAlt = images.filter((image) => !/\salt\s*=/i.test(image)).length;
if (noAlt > 0) warn(`${noAlt} <img> sem alt.`);
const noSize = images.filter((image) => !/\swidth\s*=/i.test(image) || !/\sheight\s*=/i.test(image)).length;
if (noSize > 0) warn(`${noSize} <img> sem width e height: o layout pula enquanto carrega.`);
const relative = images.filter((image) => /src\s*=\s*["'](?!https?:|data:|\/\/)/i.test(image)).length;
if (relative > 0) warn(`${relative} <img> com caminho relativo: só funciona se o arquivo for no .zip.`);
const htmlLinks = count(/href\s*=\s*["'][^"'#:]*\.html?["']/gi);
if (htmlLinks > 0) error(`${htmlLinks} link(s) para outro .html. A página é uma rota só: use âncoras.`);
if (!has(/<footer\b/i)) warn("Sem <footer>: contato, privacidade e identificação da empresa ficam de fora.");
if (!has(/prefers-reduced-motion/i) && has(/@keyframes/i)) warn("Tem animação sem @media (prefers-reduced-motion: reduce).");
if (!has(/@media\s*\(\s*(min|max)-width/i)) warn("Sem media query: confira o layout no celular.");

for (const text of errors) console.log(`ERRO   ${text}`);
for (const text of warnings) console.log(`AVISO  ${text}`);
console.log(`\n${file}: ${errors.length} erro(s), ${warnings.length} aviso(s), ${html.length.toLocaleString("pt-BR")} caracteres, ${forms.length} formulário(s), ${marked.length} gatilho(s) de clique.`);
process.exit(errors.length > 0 ? 1 : 0);
