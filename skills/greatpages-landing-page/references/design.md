# Design de landing page que converte

Bonito aqui tem definição: a página parece feita por um designer para aquela marca, não gerada
por um modelo. O visitante percebe hierarquia sem pensar, lê sem esforço e sabe onde clicar. O
que segue é o mínimo para chegar lá. Decida tudo antes de escrever CSS.

## 1. Direção estética

Escolha **uma** direção e execute com consistência. Misturar duas gera página genérica.

| Direção | Quando | Tipografia | Cor | Forma |
|---------|--------|------------|-----|-------|
| Editorial sóbria | Consultoria, advocacia, educação, B2B | Serifa de display + sans neutra | Fundo claro quente, uma cor profunda, destaque discreto | Muito espaço, grid rígido, linhas finas |
| Calorosa artesanal | Gastronomia, bem-estar, produto físico, local | Serifa humanista ou sans arredondada | Terrosos, creme, verde ou terracota | Cantos arredondados, fotos grandes, texturas sutis |
| Tecnológica densa | SaaS, app, infoproduto técnico | Sans geométrica de peso alto + mono para detalhes | Fundo escuro, acento elétrico único | Cards, bordas finas, grade visível |
| Luxo minimalista | Imóveis, estética, joalheria, alto ticket | Serifa fina de display + sans leve | Preto, off-white, um metálico ou tom profundo | Margens enormes, imagem em destaque, pouco texto |
| Divertida colorida | Infantil, eventos, marcas jovens | Sans de display gorda + sans simples | Duas cores saturadas e uma neutra | Blocos sólidos, formas, ilustração |

Anote a direção, três adjetivos e o "um detalhe memorável" (um grafismo, um recorte de foto,
uma animação de entrada, uma tipografia). Esse detalhe aparece no hero e volta uma vez no fim.

## 2. Hierarquia

O olho segue tamanho, peso, contraste e posição. Em cada seção só uma coisa pode ser a maior.

- **Hero:** headline é o maior texto da página (clamp de 2rem a 4rem). Subheadline com 55% a
  60% do tamanho, peso normal. CTA logo abaixo, dentro da primeira dobra em celular. Uma
  imagem ou grafismo. Nada mais.
- **Seções:** título (h2) com 1.6 a 2.4rem, um parágrafo de contexto, depois o conteúdo. Não
  comece seção com texto corrido sem título.
- **Um foco por bloco.** Três cards iguais, não cinco. Um depoimento em destaque, não um
  carrossel de doze.
- **Zonas de respiro:** separe seções por espaço (6 a 9rem em desktop, 4 a 5rem em celular)
  ou por mudança de fundo, não por linhas.
- **CTA repetido** em três pontos: hero, após a prova social, no fim. Mesmo texto ou variação
  curta. Mesma cor sempre.

## 3. Tipografia

- **Duas famílias no máximo.** Uma para títulos com personalidade, uma para texto com
  legibilidade. Pesos: 2 ou 3 no total.
- **Escala modular.** Defina `--step-0: 1rem` e derive: 1.125, 1.25, 1.5, 2, 2.5, 3.5. Use
  `clamp()` para os títulos: `font-size: clamp(2rem, 1.2rem + 3.5vw, 4rem)`.
- **Corpo:** 1rem a 1.125rem, `line-height: 1.6`, largura de leitura entre 55 e 72 caracteres
  (`max-width: 60ch`).
- **Títulos:** `line-height` de 1.05 a 1.2, `letter-spacing` levemente negativo em sans
  grandes (`-0.02em`), nunca em serifa.
- **Google Fonts** via `@import` no `<style>`. Pares que funcionam e fogem do óbvio:
  - Fraunces + Source Sans 3 (editorial)
  - Playfair Display + DM Sans (luxo)
  - Bricolage Grotesque + Instrument Sans (tecnológica)
  - Lora + Nunito Sans (calorosa)
  - Syne + Manrope (jovem)
  - Newsreader + IBM Plex Sans (consultoria)
  - Cormorant Garamond + Outfit (estética, beleza)
  - Space Grotesk só se a marca já usa. Evite Inter, Roboto, Arial, Montserrat e Poppins como
    padrão: são a cara de página gerada.
- Carregue só os pesos usados (`wght@400;600;800`). `display=swap`.

## 4. Cor

- **Três papéis:** dominante (marca, grandes áreas), neutra (fundo e texto) e destaque (só CTA
  e um ou dois acentos). Proporção perto de 60/30/10.
- Defina em `:root` como variáveis: `--bg`, `--fg`, `--muted`, `--brand`, `--brand-ink`,
  `--accent`, `--accent-ink`, `--surface`, `--line`.
- **Contraste:** 4.5:1 em texto normal, 3:1 em texto grande e em botão sobre fundo. Teste os
  pares que vai usar. Texto cinza claro sobre branco é o erro mais comum.
- **Neutros com temperatura.** Off-white quente (`#f7f3ec`) ou frio (`#f4f6f8`) em vez de
  `#fff` puro; preto azulado ou marrom (`#15181d`, `#1f1a17`) em vez de `#000`.
- **O botão de CTA** tem a cor mais saturada da página e aparece com essa cor **só** nele.
- **Fundo escuro** funciona em tecnologia e luxo. Nele, texto em `#e8e8e8` e não branco puro,
  e reduza o peso das fontes de display.
- Gradiente: no máximo um, sutil, em área grande (hero ou fundo), nunca roxo-azul em branco.

## 5. Espaçamento e layout

- **Escala de 8px:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Variáveis `--s-1` a `--s-7`.
- **Container:** `max-width: 1120px` (ou 1200), `padding-inline: clamp(1rem, 4vw, 2.5rem)`.
- **Grid:** `display: grid` com `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`
  para cards; `grid-template-columns: 1.1fr 0.9fr` para hero com imagem. Em celular tudo vira
  uma coluna sozinho. Dê `min-width: 0` aos filhos do grid: sem isso, uma imagem com
  `width="800"` ou uma palavra longa estica a coluna e cria rolagem horizontal no celular.
- **Alinhamento:** texto à esquerda em blocos longos; centralizado só em hero e títulos de
  seção curtos. Página inteira centralizada parece template.
- **Assimetria intencional** em um ou dois pontos (imagem sangrando a margem, título
  deslocado, card maior) dá vida. Em todos os pontos vira bagunça.
- **Cards:** `border: 1px solid var(--line)` ou sombra suave, nunca os dois. Raio consistente
  (`--radius: 12px` ou 0 para editorial). Padding interno 24 a 32px.
- **Botões:** altura mínima 48px, padding `0.9em 1.6em`, raio igual ao dos cards ou pílula,
  peso 600, hover com mudança perceptível (escurecer 8%, elevar 2px), `:focus-visible` com
  anel.
- **Formulário:** campos com 48px de altura, label acima (não só placeholder), um por linha em
  celular, borda `--line` e foco `--brand`. Botão largura total no celular.

## 6. Imagem

- Uma imagem forte no hero vale mais que dez médias. Mostre o resultado ou a pessoa, não o
  logo gigante.
- Recorte com intenção: `object-fit: cover`, `aspect-ratio` definido, borda ou máscara que
  conversa com a direção (arredondada, arco, inclinada).
- Fotos reais da pessoa ou do produto sempre que existirem. Banco de imagens só com cara de
  real, sem aperto de mão e sem escritório genérico.
- Ícones: um conjunto só, traço consistente (SVG inline simples ou caracteres). Nada de emoji
  como ícone de benefício.
- Logos de clientes em cinza uniforme (`filter: grayscale(1); opacity: .7`).

## 7. Movimento

- Uma entrada bem feita (fade e subida de 12px, `animation-delay` escalonado nos elementos do
  hero) e hovers em botão e card. Só isso.
- CSS puro. `@media (prefers-reduced-motion: reduce)` desliga tudo.
- Sem parallax, sem contadores animados, sem carrossel. Nenhum deles precisa de JS para ser
  dispensável.

## 8. Responsivo

- Mobile first. Escreva o CSS para 360px e abra com `@media (min-width: 720px)` e
  `@media (min-width: 1024px)`.
- Hero em celular: título, subtítulo, CTA, imagem (nessa ordem). Imagem não pode empurrar o
  CTA para fora da tela.
- Menu: em landing page basta logo + CTA no topo. Links de âncora só em desktop. Nada de menu
  hambúrguer com JS.
- Tabelas de preço viram pilha. Comparativos largos viram lista.
- Texto nunca abaixo de 1rem em celular; títulos com clamp.
- Teste mental: 360, 390, 768, 1024, 1440. Nenhuma rolagem horizontal, nenhuma imagem
  cortando texto, nenhum botão colado na borda.

## 9. Anti-padrões (recusar na revisão)

- Inter ou Roboto, gradiente roxo em branco, três cards com emoji, tudo centralizado, sombra
  forte em tudo, bordas de 20px em tudo.
- Headline que fala da empresa ("Somos líderes em...") em vez do ganho da pessoa.
- Botão "Saiba mais" ou "Enviar". Botão fala o que a pessoa ganha ("Quero minha vaga").
- Depoimento inventado com nome e foto de banco de imagens.
- Hero com três CTAs diferentes.
- Seção de "nossos valores" em página de conversão.
- Texto cinza `#999` em fundo branco.
- Imagem de hero com texto por cima sem overlay ou com overlay que mata a foto.
- Ícone de check verde em lista de benefícios de página "luxo".

## 10. Revisão final de design

Antes de importar, releia a página como visitante em celular e responda:

1. Em 5 segundos sei o que é, para quem é e o que fazer?
2. O CTA é o elemento mais chamativo da primeira tela?
3. Consigo ler tudo sem aproximar? Nada cortado?
4. A página parece desta marca ou de qualquer marca?
5. Existe um detalhe que eu lembraria amanhã?
