---
name: greatpages-landing-page
description: Cria landing pages bonitas e de alta conversão (captura de leads, vendas, serviço local, evento, institucional de uma página) em HTML e publica no GreatPages pelo MCP, com formulário que vira lead, botão de WhatsApp contado como conversão, SEO no head e domínio próprio ou subdomínio gratuito. Use sempre que pedirem para criar, montar, publicar ou hospedar uma landing page, página de vendas, página de captura, página de lançamento, site de uma página ou "uma página no GreatPages". Also triggers in English for landing page, sales page, squeeze page, lead capture page, one-page site, publish or host a page.
metadata:
  author: GreatPages
  version: 1.0.0
  mcp: https://mcp.greatpages.com.br/mcp
---

# Landing pages no GreatPages

Esta skill ensina a transformar um pedido vago ("quero uma página para vender meu curso") em
uma landing page pronta, bonita e no ar, hospedada no GreatPages. O resultado é um `index.html`
completo (HTML, CSS e, se precisar, JS no mesmo arquivo), importado e publicado pelo servidor
MCP do GreatPages. A plataforma cuida de hospedagem, SSL, leads, conversões, pixel, GTM,
testes A/B e domínio.

A página que você entrega precisa passar em três provas: a pessoa olha e acha bonita, o
visitante entende em cinco segundos o que ganha e o que fazer, e cada lead cai no painel do
GreatPages.

## Fluxo

| # | Etapa | O que fazer | Referência |
|---|-------|-------------|------------|
| 1 | Brief | Entender objetivo, público, oferta, ação desejada e marca. Uma rodada de perguntas, no máximo cinco. | [Brief](#1-brief) |
| 2 | Conexão | Confirmar que o MCP `greatpages` está conectado. Se não, orientar a conexão. | [references/mcp-setup.md](references/mcp-setup.md) |
| 3 | Projeto | `projects_list` e perguntar em qual projeto a página fica. Nunca escolher sozinho. | [references/mcp-workflow.md](references/mcp-workflow.md) |
| 4 | Design e copy | Escolher direção estética, estrutura de seções e escrever a copy. | [references/design.md](references/design.md), [references/copy-e-secoes.md](references/copy-e-secoes.md) |
| 5 | HTML | Escrever o `index.html` seguindo o contrato da plataforma. Partir de um template quando couber. | [references/html-rules.md](references/html-rules.md), [templates/](templates/) |
| 6 | Importar | `pages_import_html` com `title`, `id_project` e `html` (ou `upload_id` do .zip). Ler o `report`. | [references/mcp-workflow.md](references/mcp-workflow.md) |
| 7 | Publicar | `pages_publish`. A primeira publicação sai direto. Devolver a URL. | [references/mcp-workflow.md](references/mcp-workflow.md) |
| 8 | Domínio | Se a pessoa quiser domínio próprio: `domains_create`, orientar DNS, `domains_ssl_refresh`, republicar com `id_domain`. | [references/mcp-workflow.md](references/mcp-workflow.md#domínio) |
| 9 | Entrega | Explicar onde ver leads (`leads_list`) e visitas (`analytics_page`), e como pedir ajustes. | [Entrega](#9-entrega) |

Ajustes depois do import seguem o ciclo `pages_html_get` (anotar `revision`) → editar →
`pages_html_sync` com a `revision` → `pages_publish` (republicar pede confirmação da pessoa).

## Regras que não se negociam

1. **Pergunte o projeto.** Toda tool que cria algo exige `id_project`. Sem ele nada é criado e a
   resposta traz a lista. Conta com um projeto só também pergunta.
2. **Nunca publique por cima sem a pessoa concordar.** Republicar e despublicar exigem
   confirmação. Se a tool devolver `confirm_token`, mostre o resumo, espere o "sim" e só então
   repita a chamada com o token e os mesmos argumentos.
3. **Preserve `data-gp-*` e `data-conversao`.** Eles ligam formulários e cliques aos leads e às
   conversões. Ao editar uma página existente, leia antes com `pages_html_conversions_get`.
4. **SEO e compartilhamento vêm do `<head>`.** `<title>`, `meta description`, `og:*` e
   `twitter:*` são obrigatórios. `pages_update` recusa `seo_*` em página html.
5. **Página de uma rota só.** O site é o `index.html`. Links para outro `.html` ficam quebrados.
   Use âncoras (`#secao`) para navegar.
6. **Prefira zero `<script>`.** FAQ com `<details>`, menu com âncoras, animação com CSS. Sem
   código executável a página é mais leve, mais segura e `pages_html_sync` nunca pede
   confirmação extra. Quando precisar de JS, inline e pequeno.
7. **Fontes pelo `@import` do Google Fonts dentro de `<style>`.** É o único host de CSS externo
   confiável para a plataforma. Não use `<link rel="stylesheet">` nem CDN de CSS ou JS.
8. **Nada de placeholder no ar.** `[NOME DA EMPRESA]`, lorem ipsum, `#` em link de CTA e imagem
   quebrada são defeitos. Se faltar dado, pergunte ou escreva a melhor versão e avise.
9. **Respeite os limites.** `html` até 2.000.000 de caracteres, .zip até 25 MB, imagem até 10 MB,
   até 500 arquivos. Sem `data:` URI de imagem grande.
10. **Fale a língua da pessoa.** Copy, mensagens de formulário e explicações em português do
    Brasil, salvo pedido contrário.

## 1. Brief

Reúna o essencial em uma só mensagem, com perguntas objetivas. Ofereça opções quando a pessoa
provavelmente não sabe responder. Não faça interrogatório: infira o que for razoável e diga o
que assumiu.

Precisa saber:

- **Objetivo da página:** capturar leads, vender, agendar pelo WhatsApp, inscrever em evento,
  apresentar a empresa. Define o tipo de template e a métrica de sucesso.
- **Quem é o público e qual dor resolve.** Uma frase basta.
- **A oferta:** o que a pessoa ganha ao agir (ebook, consulta, desconto, vaga, produto) e, se
  houver, preço e condições.
- **Ação principal (CTA):** formulário (quais campos), botão de WhatsApp (número e mensagem
  pré-preenchida), link externo de checkout, ou agenda.
- **Marca:** nome, logo (URL ou arquivo), cores, tom de voz, imagens disponíveis. Sem material,
  você define paleta e tipografia e explica a escolha.
- **Endereço:** subdomínio gratuito do GreatPages ou domínio próprio.

Se a pessoa já tem textos, depoimentos, fotos ou site antigo, peça. Material real sempre vence
texto inventado.

## 2. Conexão com o MCP

As tools começam com `pages_`, `projects_`, `domains_`, `leads_`, `analytics_` e `ab_tests_`.
Se nenhuma estiver disponível, o MCP não está conectado ou a permissão foi negada no
consentimento. Oriente a pessoa com [references/mcp-setup.md](references/mcp-setup.md) e
continue depois. Em produção a URL é `https://mcp.greatpages.com.br/mcp`.

## 3. Projeto

Chame `projects_list`, apresente os projetos por nome e id e pergunte onde a página fica. Se
não houver nenhum ou a pessoa quiser separar, `projects_create` com um nome claro. Guarde o
`id_project`: ele também filtra `domains_list`.

## 4. Design e copy

Antes de abrir o HTML, decida e anote em uma frase cada:

- **Direção estética** coerente com a marca e o público. Escolha uma e execute com precisão:
  editorial e sóbria, calorosa e artesanal, tecnológica e densa, luxuosa e minimalista,
  divertida e colorida. Veja [references/design.md](references/design.md).
- **Paleta:** uma cor dominante, uma neutra para fundo e texto, uma cor de destaque só para CTA.
  Contraste AA em todo texto.
- **Tipografia:** uma fonte de título com personalidade e uma de texto legível, do Google Fonts.
  Evite os pares mais batidos de páginas geradas por IA.
- **Estrutura de seções** adequada ao objetivo, com a copy de cada bloco. Veja
  [references/copy-e-secoes.md](references/copy-e-secoes.md).

Escreva a copy inteira antes do HTML. Headline com benefício concreto, subheadline que
explica como, CTA com verbo de ação e resultado, prova social verdadeira, objeções
respondidas, chamada final. Se não há depoimentos reais, não invente nomes: use números,
garantias ou simplesmente omita a seção.

## 5. HTML

Monte o `index.html` com as regras de [references/html-rules.md](references/html-rules.md).
Os templates em [templates/](templates/) já cumprem o contrato e servem de ponto de partida
(captura, vendas, serviço com WhatsApp, evento); troque paleta, fontes, copy, imagens e seções
para a página não parecer um modelo.

Checklist antes de importar:

- `<!doctype html>`, `<html lang="pt-BR">`, `<meta charset="utf-8">`, viewport.
- `<title>` até 60 caracteres, `meta description` até 155, `og:title`, `og:description`,
  `og:image` (1200x630, URL absoluta https), `og:url` se o endereço final já for conhecido.
- Um só `<h1>`. Hierarquia h2/h3 nas seções.
- Formulário com `name` em todos os campos, `<label>` visível, `type="email"` e `type="tel"`
  onde couber, `required` no que importa, e os atributos `data-gp-conversao="true"`,
  `data-gp-apos-envio="mensagem"` e `data-gp-mensagem="..."` (ou `redirecionar` com
  `data-gp-redirect`). Não ponha `action`.
- Botão de WhatsApp ou link externo que conta como conversão com `data-conversao="true"`.
- Fontes via `@import url('https://fonts.googleapis.com/...')` dentro de `<style>`.
- Imagens com `alt`, `width` e `height`, `loading="lazy"` fora da primeira dobra, URLs https
  absolutas ou arquivos no .zip.
- Responsivo de 360px a 1440px sem rolagem horizontal. Botões com no mínimo 44px de altura.
- Nenhum `[PLACEHOLDER]`, `href="#"` em CTA, `<script>` desnecessário, `<iframe>`, `<base>`,
  `on*=` ou `javascript:`.

Com terminal, rode o validador da skill antes de importar. Ele não tem dependências e aponta
placeholder esquecido, SEO faltando, código marcado, formulário que não vira lead e WhatsApp
sem codificar:

```bash
node scripts/check-html.mjs index.html
```

`ERRO` bloqueia o import; `AVISO` é para olhar. Depois abra a página num navegador: tag não
fechada muda o layout no celular e nenhum validador pega tudo.

## 6. Importar

Com terminal (Claude Code, Cursor): se a página tem arquivos próprios (imagens, CSS separado),
monte um .zip com o `index.html` na raiz, chame `pages_upload_start`, envie com
`curl --fail-with-body -T site.zip "<upload_url>"` e passe o `upload_id` a `pages_import_html`.
Página de um arquivo só: mande o texto direto em `html`, que é mais simples.

Sem terminal (claude.ai, ChatGPT com conector): sempre `html` em texto.

Leia o `report`: `forms` mostra cada formulário com a chave `data-gp-form` gerada e se a
conversão ficou ativa; `unresolved` lista referências quebradas; `images.pending` diz quantas
imagens ainda vão para a galeria. Formulário com `enabled: false` e `reason` precisa de
correção (campo de texto faltando, formulário de busca, etc.).

## 7. Publicar

`pages_publish` com o `id` da página. Primeira publicação sai direto e devolve `url`. Sem
`id_domain`, a página usa o endereço padrão da conta. Se a pessoa não tem domínio nenhum,
veja [Domínio](references/mcp-workflow.md#domínio): o subdomínio gratuito nasce ativo.

Depois de publicar, abra a URL (ou peça para a pessoa abrir) e confira no celular e no
desktop. Ajuste pelo ciclo get → sync → publish.

## 8. Domínio

Domínio próprio: `domains_create` com `subdomain` (ex.: `www` ou vazio), `domain` e
`id_project`. A resposta traz os registros DNS que a pessoa cria no provedor. Explique em
linguagem simples (tipo, nome, valor). Depois que ela configurar, `domains_ssl_refresh` uma
vez a cada alguns minutos, nunca em laço. Com o domínio ativo, `pages_publish` com
`id_domain` e, se quiser, `page_link`.

## 9. Entrega

Mensagem final para a pessoa:

- URL publicada e o que foi feito em uma linha.
- Onde ver leads (painel do GreatPages ou "me peça `leads_list`") e visitas (`analytics_page`).
- Se houver domínio pendente: os registros DNS e o que esperar.
- Convite para ajustes: "me diga o que mudar e eu atualizo e republico".
- Sugestão opcional de teste A/B de headline com `ab_tests_create` quando a página tiver tráfego.

## Exemplo de brief virando decisões

Pedido: "quero uma página pra minha clínica de fisioterapia em Sorocaba, pra pessoa marcar
pelo WhatsApp".

Decisões antes do HTML:

- **Tipo:** serviço local com WhatsApp. Template `servico-whatsapp.html`. Conversão: cliques
  no `wa.me` com `data-conversao="true"`, mais `tel:`.
- **Direção:** calorosa e limpa (saúde, confiança). Lora para títulos, Nunito Sans para texto.
  Off-white quente, verde-oliva de marca, terracota de destaque; o botão de WhatsApp fica no
  verde do WhatsApp para ser reconhecido.
- **Headline:** "Volte a se mover sem dor, com fisioterapeutas que acompanham você de perto em
  Sorocaba." Subheadline com o diferencial real (avaliação no mesmo dia, atendimento por
  convênio X e Y). CTA: "Agendar avaliação pelo WhatsApp".
- **Seções:** hero, barra de confiança (anos, atendimentos, nota no Google), serviços (4 cards
  com "a partir de"), como funciona em 3 passos, equipe com CREFITO, 3 avaliações reais que a
  pessoa mandou, endereço com link do mapa e horários, CTA final, botão flutuante, rodapé com
  CNPJ, responsável técnico e privacidade.
- **Faltou no brief:** fotos, número do WhatsApp, depoimentos. Perguntei os três na mesma
  mensagem e segui com o resto; a página só vai para import depois que vierem.
- **Entrega:** `projects_list` → pergunta do projeto → `pages_import_html` com `html` →
  `pages_publish` → URL. Depois: "quando quiser, ligo o seu domínio ou testo outra headline".

## Erros comuns e como sair

| Sintoma | Causa | Saída |
|---------|-------|-------|
| `PROJECT_REQUIRED` | Faltou `id_project` | Mostrar a lista devolvida e perguntar |
| `requer_confirmacao` com `confirm_token` | Republicar, despublicar, código novo no sync | Mostrar o `resumo`, esperar o sim, repetir com o token |
| Sync recusado por `revision` | A página mudou desde a leitura | `pages_html_get` de novo e refazer a edição |
| `conversions_lost` | O HTML novo perdeu formulário ou gatilho | Devolver os `data-gp-*`; só usar `accept_conversion_loss` se a perda for intencional e a pessoa souber |
| `DOMAIN_PROJECT_MISMATCH` | Domínio em outro projeto | Perguntar: vincular (`domains_link_project`) ou mover (`pages_move`) |
| `STORAGE_LIMIT_EXCEEDED` | Imagens não cabem no plano | Reduzir imagens ou usar URLs externas; mostrar `plans_list` se a pessoa quiser |
| Timeout em import, sync ou publish | Operação pesada, até 130 s | Conferir com `pages_get` antes de repetir |
| Formulário com `enabled: false` | Sem campo de texto, parece busca, só um campo não-contato | Ajustar campos e sincronizar |
| Tool não aparece | Permissão desligada no consentimento ou perfil sem acesso | Reconectar o MCP e ligar `pages:write`, `pages:publish`, `domains:write` |
