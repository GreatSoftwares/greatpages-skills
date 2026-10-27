# Performance

Página lenta converte menos: a cada segundo a mais de carregamento o visitante de celular,
que é 83% do tráfego, vai embora. A landing page que você entrega tem um orçamento, e o
orçamento é medido, não estimado.

## Orçamento

| Métrica | Alvo | Como pegar |
|---------|------|------------|
| LCP (maior elemento visível) | ≤ 2,5 s em 4G, ≤ 1,5 s em desktop | Hero leve, imagem do hero com `fetchpriority="high"`, fonte do título sem bloqueio |
| CLS (deslocamento de layout) | ≤ 0,1 | `width` e `height` em toda imagem, `aspect-ratio` em caixas de mídia, `font-display: swap` com fallback de métrica parecida |
| INP (resposta à interação) | ≤ 200 ms | Sem JS, ou JS mínimo; nada de listener pesado em scroll |
| Peso total da página | ≤ 1,5 MB, ideal ≤ 1 MB | Imagens comprimidas, fontes só nos pesos usados |
| Imagem do hero | ≤ 200 KB | `webp` ou `avif`, 1600 px de largura no máximo |
| Demais imagens | ≤ 120 KB cada | `webp` ou `avif`, 1200 px no máximo; retratos 600 px |
| CSS | ≤ 60 KB | Sem framework; só o que a página usa |
| JS | 0 KB, ou ≤ 30 KB quando o pedido exige | Inline ou `js/main.js`, `defer` |
| Fontes | 2 famílias, 3 pesos, ≤ 150 KB ao todo | Subconjunto latino, `woff2` |
| Requisições | ≤ 25 | Uma folha de CSS, fontes próprias, imagens |

## Imagens

- **Formato:** `webp` (ou `avif` se a ferramenta gerar) para foto; `svg` para logo, ícone e
  grafismo; `png` só com transparência que o `webp` não resolveu.
- **Tamanho:** redimensione antes de colocar em `img/`. Com terminal:
  - macOS: `sips -Z 1600 -s format jpeg foto.jpg --out foto-1600.jpg` e depois
    `cwebp -q 80 foto-1600.jpg -o foto.webp` (`brew install webp`), ou
    `magick foto.jpg -resize 1600x -quality 80 foto.webp` (ImageMagick).
  - Linux: `magick` ou `cwebp` idem.
  - Sem conversor: a URL do Pexels já aceita `?w=1600` e a do Unsplash `?w=1600&q=80&fm=webp`;
    baixe nesse tamanho.
- **Responsivo:** no hero e em fotos de tela cheia, `srcset` com 800, 1200 e 1600 e `sizes`
  honesto (`sizes="(min-width: 1024px) 50vw, 100vw"`). Nas demais, uma largura certa basta.
- **Atributos:** `width` e `height` sempre (a proporção real, mesmo que o CSS redimensione);
  `loading="lazy"` e `decoding="async"` fora da primeira dobra; `fetchpriority="high"` só na
  imagem do hero, e só em uma.
- **Fundo por CSS** (`background-image`) não tem lazy nem priority: use `<img>` com
  `object-fit: cover` quando a imagem importa, e `background-image` só para textura pequena.
- **Vídeo:** nunca autoplay com som; `<video autoplay muted loop playsinline>` leve (≤ 2 MB,
  720p) ou, melhor, link com capa para YouTube. Nada de GIF animado.

## Fontes

A fonte é o maior risco de LCP e de CLS depois da imagem do hero. Em ordem de preferência:

1. **Própria, no .zip** (com terminal). Pegue o CSS do Google Fonts com um user agent moderno,
   baixe os `woff2` e sirva de `fonts/`:

   ```bash
   mkdir -p fonts
   curl -sA "Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/120 Safari/537.36" \
     "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;600&display=swap&subset=latin" \
     -o fonts/google.css
   grep -o "https://fonts.gstatic.com[^)]*" fonts/google.css | sort -u | while read -r u; do curl -sL "$u" -o "fonts/$(basename "$u")"; done
   ```

   Depois escreva os `@font-face` no `css/style.css` apontando para `../fonts/<arquivo>.woff2`,
   com `font-display: swap`, só os blocos `latin` (e `latin-ext` se houver nome com acento raro),
   e apague `fonts/google.css`. Sem requisição a terceiro: mais rápido e sem o Google no caminho
   do visitante (LGPD agradece).
2. **`@import` do Google Fonts** no topo do CSS, só sem terminal. Custa um ida-e-volta a mais;
   peça só os pesos usados e `display=swap`.

Sempre: `font-display: swap`; um fallback de sistema com largura parecida (`Arial` para
grotescas, `Georgia` para serifas) e `font-size-adjust` quando a altura de x diverge, para o
texto não pular quando a fonte chega; no máximo duas famílias e três pesos; nada de fonte
variável completa quando dois pesos resolvem.

## CSS

- Uma folha só, `css/style.css`, sem `@import` encadeado além do das fontes.
- Sem framework (Tailwind, Bootstrap): tudo que a página não usa pesa igual.
- `content-visibility: auto; contain-intrinsic-size: auto 600px;` nas seções abaixo da dobra:
  o navegador pula o layout do que não está na tela.
- `backdrop-filter`, `filter: blur()` e sombras enormes só em áreas pequenas; em tela cheia
  travam celular barato.
- Anime só `transform` e `opacity`; `will-change` apenas durante a animação, se tanto.
- `scroll-behavior: smooth` é grátis; parallax em JS não é.

## HTML

- DOM enxuto: uma landing page cabe em menos de 800 elementos. Wrapper dentro de wrapper
  pesa no layout e no CLS.
- `<head>` na ordem: charset, viewport, title, metas, CSS. Nada de script no `<head>`.
- Sem `<iframe>` (mapa, vídeo, formulário externo): cada um é uma página inteira carregando.
  Mapa é link para o Google Maps; vídeo é capa com link.
- Sem JS, o INP é perfeito e o sync nunca pede confirmação. Se precisar, `<script defer
  src="js/main.js">` no fim do `<body>`, sem biblioteca.
- A plataforma injeta pixel, GTM e consentimento conforme o painel; não cole esses snippets
  no HTML, senão carregam duas vezes.

## Medir

- **Com navegador e Lighthouse** (Claude Code com ferramentas de browser, ou terminal com
  Chrome): rode um audit de performance em modo celular na URL publicada e corrija até
  passar de 90. Olhe LCP, CLS e peso total, não só a nota.
- **Sem Lighthouse:** confira na mão. Tamanho dos arquivos (`du -sh site/img site/fonts
  site/css`), largura das imagens (`sips -g pixelWidth` no macOS, `identify` com
  ImageMagick), contagem de requisições (uma por `<img>`, `<link>`, `@font-face`,
  `url()`), e os atributos das imagens.
- **Depois de publicar:** abra a URL em celular real ou em rede limitada e veja se o hero
  aparece antes de 2,5 s com o título já na fonte certa.

## Checklist

- [ ] Hero: uma imagem até 200 KB, `fetchpriority="high"`, `srcset`, `width` e `height`.
- [ ] Demais imagens até 120 KB, `webp` ou `avif`, `loading="lazy"`, `decoding="async"`.
- [ ] Fontes próprias no .zip (ou `@import` sem terminal), ≤ 3 pesos, `font-display: swap`.
- [ ] CSS ≤ 60 KB, uma folha, `content-visibility` abaixo da dobra.
- [ ] Zero JS, ou ≤ 30 KB com `defer`.
- [ ] Sem iframe, sem GIF, sem autoplay com som, sem pixel colado.
- [ ] Peso total ≤ 1,5 MB, ≤ 25 requisições.
- [ ] Lighthouse celular ≥ 90 ou conferência manual registrada na entrega.
