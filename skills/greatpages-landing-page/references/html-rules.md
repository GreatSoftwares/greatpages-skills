# O HTML que o GreatPages aceita

Uma página `html` no GreatPages é um site de uma rota: o `index.html` e, opcionalmente, os
arquivos dele. A plataforma guarda o arquivo como veio, acrescenta a chave dos formulários e,
na publicação, injeta o runtime que transforma envio de formulário em lead, conta cliques
marcados, e liga pixel, GTM e consentimento configurados no painel. Você escreve HTML normal
e respeita este contrato.

## Esqueleto

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Título da página | Marca</title>
  <meta name="description" content="Até 155 caracteres com o benefício e a ação.">
  <link rel="canonical" href="https://www.exemplo.com.br/">
  <link rel="icon" href="https://.../favicon.png">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Título para compartilhamento">
  <meta property="og:description" content="Descrição para compartilhamento">
  <meta property="og:image" content="https://.../capa-1200x630.jpg">
  <meta property="og:url" content="https://www.exemplo.com.br/">
  <meta name="twitter:card" content="summary_large_image">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800&family=Source+Sans+3:wght@400;600&display=swap');
    :root { --cor-1: #0f3d3e; --cor-2: #f4efe6; --destaque: #e4572e; }
    /* todo o CSS aqui */
  </style>
</head>
<body>
  <!-- seções -->
</body>
</html>
```

SEO e compartilhamento social vêm **só** do `<head>`. `pages_update` recusa `seo_*` e
`social_*` em página html. Favicon por `<link rel="icon">` e canonical são aceitos.

## O que é permitido, o que é marcado e o que é recusado

| Recurso | Status | Nota |
|---------|--------|------|
| HTML, CSS inline em `<style>` e atributo `style` | Permitido | Sem limite além do tamanho. |
| `@import url('https://fonts.googleapis.com/...')` em `<style>` | Permitido | Único host externo de CSS confiável. |
| Imagens por URL `https://` absoluta | Permitido | Qualquer host. Prefira as próprias (no .zip ou galeria). |
| `<a href="https://...">`, `mailto:`, `tel:`, `#ancora` | Permitido | |
| `<details>/<summary>`, `<dialog>` sem JS, animações CSS | Permitido | Preferido a JS. |
| `<link rel="icon">`, `rel="canonical"`, `rel="alternate"`, `apple-touch-icon` | Permitido | |
| `<script>` inline ou arquivo do .zip | Marcado | Importa, mas no sync entrar com script novo exige confirmação da pessoa. Vai no arquivo publicado e o suporte não desliga. |
| `<link rel="stylesheet">`, `rel="preconnect"`, `rel="preload"` | Marcado | Mesma regra do script. Use `@import` para fontes e `<style>` para o resto. |
| `<iframe>` (vídeo do YouTube, mapa) | Marcado | Aceito, mas pede confirmação no sync. Avalie se um link com imagem de capa resolve. |
| `on*=` (onclick, onload...) e `href="javascript:..."` | Marcado | Evite. |
| `<meta http-equiv>`, `<base>`, `<object>`, `<embed>` | Marcado | Evite. |
| CSS com `expression()`, `-moz-binding`, `behavior:`, `@import` de outro host | Recusado ou marcado | Não use. |
| `<svg>` inline | Permitido | Sem `<script>` dentro. Arquivo .svg no .zip não pode ter entidades no DOCTYPE. |
| `data:` URI em `src` | Evitar | Tamanho e CPU. Imagem grande em data URI pode estourar o limite do servidor. Ícone pequeno em CSS tudo bem. |
| Link para outra página `.html` | Quebrado | A página é uma rota só. O import lista em `unresolved.linked_page`. |

**Regra prática:** página sem `<script>`, sem `<iframe>` e sem `<link>` fora dos safe é
"código zero". Ela importa, sincroniza e publica sem nenhuma confirmação extra, e é a mais
segura. Só adicione código quando a pessoa pedir algo que exige (contador regressivo
verdadeiro, calculadora, vídeo embutido).

Pixel do Facebook, GTM e Analytics são configurados no painel da página, não no HTML. Não
cole snippets de rastreamento no HTML: a plataforma injeta os dela.

## Limites

| Limite | Valor |
|--------|-------|
| `html` em texto na tool | 2.000.000 de caracteres |
| HTML total guardado | 10.000.000 de caracteres |
| Profundidade de elementos | 256 |
| Elementos + atributos | 60.000 |
| Atributos por tag | 256 |
| .zip compactado | 25 MB |
| .zip descompactado | 50 MB |
| Arquivos no .zip | 500 |
| Um arquivo do .zip | 10 MB |
| Texto total (css, js, svg, json) no .zip | 12 MB |

Extensões aceitas no .zip: `html` (só o index), `css`, `js`, `mjs`, `json`, `txt`,
`webmanifest`, `wasm`, `png`, `jpg`, `jpeg`, `gif`, `webp`, `avif`, `svg`, fontes `woff2`,
`woff`, `ttf`, `otf`, mídia `mp4`, `webm`, `mp3`, `ogg`, `wav`, `pdf`, `vtt`. Outras
extensões ficam de fora (`unused`). Nada pode ir na pasta `_gp/`, que é da plataforma.

## Formulários que viram leads

O runtime injetado na publicação intercepta o `submit` de todo
`form[data-gp-form][data-gp-conversao="true"]`, envia os campos como lead da página, dispara
o evento do pixel configurado e mostra o aviso ou redireciona. Você não escreve nada disso.

```html
<form data-gp-conversao="true"
      data-gp-apos-envio="mensagem"
      data-gp-mensagem="Recebemos seu pedido. Falamos com você em até 1 dia útil."
      aria-label="Pedido de orçamento">
  <label for="nome">Nome</label>
  <input id="nome" name="nome" type="text" autocomplete="name" required>

  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" autocomplete="email" required>

  <label for="whatsapp">WhatsApp</label>
  <input id="whatsapp" name="whatsapp" type="tel" autocomplete="tel" inputmode="tel" placeholder="(11) 90000-0000" required>

  <label for="interesse">O que você precisa?</label>
  <select id="interesse" name="interesse">
    <option>Site novo</option>
    <option>Landing page</option>
  </select>

  <label class="consent">
    <input type="checkbox" name="aceite" value="sim" required>
    Concordo em receber contato e li a <a href="https://.../privacidade" target="_blank" rel="noopener">política de privacidade</a>.
  </label>

  <button type="submit">Quero um orçamento</button>
</form>
```

Regras:

- **Não ponha `action`.** Sem `action`, o import define `data-gp-apos-envio="mensagem"`. Com
  `action` para URL externa, o padrão vira `seguir` (envia o lead e deixa o formulário seguir
  para a URL) e o import marca `form_action` em `unresolved` se apontar para arquivo.
- **`name` em todo campo.** Campo sem `name` não é enviado. O `name` vira o id do campo do lead
  (`form_nome`, `form_email`). O rótulo do lead vem do `<label>` ligado por `for`, do
  `aria-label` ou do `placeholder`, nessa ordem. Nomes consistentes (`nome`, `email`,
  `whatsapp`/`telefone`) facilitam integrações.
- **Telefone:** `type="tel"` ou `name` com `fone`, `phone`, `whats`, `celular` ou `tel` marca o
  campo como telefone no lead.
- **Conversão ativa** exige ao menos um campo de texto (`text`, `email`, `tel`, `number`,
  `url`, `textarea`, `select`). Formulário com um campo só precisa ser e-mail ou telefone.
  Formulário com `type="password"`, `role="search"` ou `type="search"` não vira lead.
- **Campos ignorados:** `password`, `file`, `reset`, `button`, `image`, e nomes com `csrf`,
  `token`, `nonce`, `captcha`, `turnstile`, `__`, `_wp`.
- **Depois do envio** (`data-gp-apos-envio`): `mensagem` mostra `data-gp-mensagem` em um aviso
  de tela cheia por alguns segundos; `redirecionar` leva a `data-gp-redirect` (página de
  obrigado, grupo de WhatsApp, checkout); `seguir` deixa o formulário seguir o `action`.
- **`data-gp-form`** é a chave de 8 caracteres que a plataforma atribui no import. Não
  invente; ao reescrever uma página existente, mantenha a que já está lá. Formulário com os
  mesmos `name` herda a chave sozinho.
- **Validação nativa** (`required`, `type`, `pattern`, `minlength`) funciona: formulário
  inválido não envia lead.
- Botão de envio **dentro do form** com `type="submit"` conta pelo form. Não o marque com
  `data-conversao`.

## Cliques que contam como conversão

Em `<a href="...">` (não `#`, não `javascript:`) ou `<button>` fora de formulário:

```html
<a class="btn" data-conversao="true"
   href="https://wa.me/5511900000000?text=Ol%C3%A1%2C%20vim%20pela%20p%C3%A1gina%20e%20quero%20um%20or%C3%A7amento"
   target="_blank" rel="noopener">Falar no WhatsApp</a>
```

Use em: WhatsApp, checkout externo, agenda (Calendly), download direto, ligação (`tel:`).
Marque só o que é a conversão de verdade, não todo link. Vários botões para a mesma ação
(topo, meio, fim) podem todos ter a marca.

## Imagens e arquivos

- `alt` descritivo em toda imagem de conteúdo; `alt=""` em decorativa.
- `width` e `height` nos `<img>` para o layout não pular. `loading="lazy"` fora da primeira
  dobra; a imagem do hero sem lazy e, se possível, com `fetchpriority="high"`.
- Formatos: `webp` ou `avif` para foto, `svg` para logo e ícone, `png` para transparência.
  Foto de hero até 200 KB, demais até 100 KB. Nada acima de 10 MB.
- Com .zip: caminhos relativos (`img/hero.webp`). O import reporta os que não achou.
- Com `html` em texto: URLs absolutas `https://`. Peça as imagens à pessoa ou use banco de
  imagens com licença livre. Nunca `src="#"` ou placeholder cinza no ar.
- Logo da pessoa: se ela só tem o arquivo, envie no .zip; sem terminal, peça uma URL pública.
- Fontes próprias (`woff2`) podem ir no .zip com `@font-face` apontando relativo.

## Performance e acessibilidade mínimas

- CSS no `<head>`, uma folha só. Sem framework CSS externo.
- `font-display: swap` (o Google Fonts aplica com `display=swap`).
- Contraste AA: 4.5:1 em texto, 3:1 em texto grande e botões.
- Foco visível em links, botões e campos (`:focus-visible`).
- Alvo de toque com 44px de altura mínima.
- Um `<h1>`, ordem lógica de h2/h3, `<main>`, `<header>`, `<footer>`, `<section>` com
  `aria-labelledby` quando couber.
- `prefers-reduced-motion`: desligue animações de entrada.
- Sem rolagem horizontal em 360px. Teste mentalmente cada seção em uma coluna.

## Rodapé obrigatório

Nome da empresa (razão social se houver), CNPJ quando a pessoa fornecer, e-mail ou WhatsApp de
contato, link para política de privacidade (ou texto curto de privacidade na própria página) e
termos quando a página vende algo. Formulário com dados pessoais precisa de aviso de
consentimento (LGPD). Páginas de saúde e finanças precisam dos disclaimers do setor.
