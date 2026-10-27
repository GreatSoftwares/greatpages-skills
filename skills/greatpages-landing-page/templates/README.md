# Templates

Três pontos de partida que já cumprem o contrato do GreatPages: zero `<script>`, fontes pelo
`@import` do Google Fonts, formulário com `data-gp-*`, botões de conversão com
`data-conversao="true"`, SEO no `<head>`, responsivo de 360px a 1440px, `<details>` para FAQ.
Foram validados com o guard de HTML da plataforma: importam, sincronizam e publicam sem pedir
confirmação extra.

| Arquivo | Objetivo | Direção estética | Conversão |
|---------|----------|------------------|-----------|
| `captura.html` | Isca digital, newsletter, orçamento | Editorial sóbria (Fraunces + Source Sans 3, verde profundo, terracota) | Formulário no hero, `mensagem` após envio |
| `vendas.html` | Curso, produto, serviço com preço | Tecnológica densa (Bricolage Grotesque + Instrument Sans, fundo escuro, lima) | Botão de checkout externo marcado |
| `servico-whatsapp.html` | Clínica, oficina, escritório, restaurante | Calorosa artesanal (Lora + Nunito Sans, creme, oliva, terracota) | WhatsApp no topo, hero, fim e botão flutuante; `tel:` |
| `evento.html` | Webinar, aula ao vivo, lançamento, evento presencial | Enérgica (Syne + Manrope, creme, azul profundo, laranja, amarelo) | Formulário de inscrição no hero, programação em `<ol>` |

Antes de importar, rode o validador sem dependências sobre o arquivo final:

```bash
node ../scripts/check-html.mjs index.html
```

Ele aponta placeholder esquecido, SEO faltando, código marcado, formulário que não vira lead e
link de WhatsApp sem codificar. `ERRO` bloqueia; `AVISO` é para olhar.

## Como usar

1. Escolha o template pelo objetivo da página, não pela aparência. A aparência muda.
2. Troque **tudo** que está entre colchetes: `[Marca]`, `[URL-DO-CHECKOUT]`,
   `[URL-DA-FOTO]`, `55[DDD][NUMERO]`. Procure por `[` antes de importar: não pode sobrar nenhum.
3. Troque paleta (`:root`) e fontes (`@import` e `--display`/`--text`) para a marca. Dois
   templates com as mesmas cores parecem o mesmo site.
4. Reescreva a copy inteira com o brief. O texto do template é estrutura, não conteúdo.
5. Tire seções que não servem e acrescente as que faltam seguindo
   [../references/copy-e-secoes.md](../references/copy-e-secoes.md).
6. Imagens: URLs `https://` absolutas ou arquivos no .zip com caminho relativo. Sem imagem,
   troque o `<img>` por um bloco de cor, padrão CSS ou SVG inline. Nunca deixe `<img>` quebrada.
7. Formulário: ajuste campos e `name`, mantenha `data-gp-conversao="true"` e escolha entre
   `data-gp-apos-envio="mensagem"` (com `data-gp-mensagem`) e `redirecionar` (com
   `data-gp-redirect`). Não adicione `action`.
8. Mensagem do WhatsApp: o texto depois de `?text=` precisa ir codificado para URL.

## O que não fazer

- Não adicionar `<link rel="stylesheet">`, Tailwind, Bootstrap ou qualquer CSS/JS por CDN.
- Não colar pixel, GTM ou Analytics no HTML: configura-se no painel da página.
- Não usar `<iframe>` para mapa ou vídeo sem necessidade; link com capa resolve e não pede
  confirmação.
- Não inventar depoimentos, números ou logos para preencher as seções de prova.
