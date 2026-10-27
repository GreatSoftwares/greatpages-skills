# Piso de qualidade

Carregue depois que a direção está decidida e construa sem anunciar a lista. O contrato de
direção manda em tudo aqui, exceto nas linhas marcadas como **proibido**; o seu hábito não
manda em nada. Cada item é uma checagem sobre o resultado renderizado, não uma intenção.

## Tipografia

- **Escala com papéis.** Defina `--step-0: 1rem` e derive os papéis: texto, destaque,
  título de seção, display. Entre papéis adjacentes a diferença de tamanho ou peso é óbvia à
  primeira vista; se dois papéis parecem iguais, um deles não existe.
- **Display:** `clamp()` entre 2.25rem e 6rem no máximo. `line-height` de 0.95 a 1.1. Tracking
  levemente negativo em sans grandes, até `-0.04em`, nunca em serifa. `text-wrap: balance`.
- **Texto:** 1rem a 1.125rem, `line-height` 1.5 a 1.65, medida de 60 a 75 caracteres
  (`max-width: 65ch`). `text-wrap: pretty`. Em fundo escuro, texto claro ganha um passo de
  peso, um toque de tracking e um pouco mais de entrelinha.
- **Pesos:** dois ou três ao todo. Hierarquia vem de tamanho, peso, espaço e cor combinados,
  não de tamanho sozinho.
- **Quebras:** título quebrado à mão só entre frases, conferido em cada largura. Uma palavra
  sozinha na última linha de um título é defeito; o `balance` costuma resolver, senão edite a
  copy.
- **Detalhes de texto em português:** aspas curvas (“ ”), reticências de um caractere (…),
  espaço inflexível entre número e unidade (`R$&nbsp;197`, `10&nbsp;MB`), números com ponto
  de milhar e vírgula decimal. Sem travessão separando frases no corpo; use ponto ou vírgula.
- **Carregamento:** `@import` com só os pesos usados e `display=swap`; `font-family` com
  fallback genérico; `font-size-adjust` quando o fallback muda muito a altura de x.

## Cor e contraste

- **Contraste medido:** texto e placeholder ≥ 4.5:1; texto grande, botão e ícone ≥ 3:1.
  Confira os pares reais, inclusive texto sobre imagem (com overlay, não com adivinhação) e
  texto sobre a cor da marca.
- **Secundário tingido:** em superfície colorida, o texto secundário deriva do matiz ou da
  tinta, nunca de um cinza genérico. Texto `#999` sobre branco é **proibido**.
- **Uma cor para a ação.** O CTA é o único dono da cor mais saturada. Se a cor do botão
  aparece em ícone, borda e título, o botão perdeu.
- **Neutros com temperatura.** Branco e preto puros raramente; off-white e quase-preto
  tingidos pelo mundo.
- **Gradiente:** no máximo um, grande e sutil, dentro da estratégia de cor. Gradiente em texto
  é **proibido**: ênfase vem de peso ou tamanho.
- **Escuro de verdade:** tema escuro é composto, com elevação de superfície e contraste
  planejados, não a inversão do claro.

## Espaço e ritmo

- **Escala de 4px:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Variáveis `--s-1` a `--s-7`.
  Valores soltos fora da escala são defeito.
- **Agrupar por proximidade** antes de agrupar por caixa. Grupos apertados, separações
  generosas. Mais espaço acima de um título do que abaixo dele. Leia os valores computados.
- **Cadência:** intervalos apertados e generosos alternando de propósito. Um valor de
  espaçamento repetido até tudo ter o mesmo peso é monotonia, não sistema.
- **Container:** `max-width` entre 1120 e 1200px, `padding-inline: clamp(1rem, 4vw, 2.5rem)`.
- **Seções:** 6 a 9rem de respiro em desktop, 4 a 5rem em celular, ou mudança de fundo. Nunca
  separadas só por linha.

## Layout

- **Teste do estreitar de olhos:** com o detalhe borrado, o elemento primário, o secundário e
  os grupos ainda aparecem nessa ordem. Se não, a hierarquia é só texto.
- **Primeiro viewport:** oferta, ação funcional e prova visíveis sem rolar, em celular e em
  desktop. Em celular: título, subtítulo, ação, prova, depois a imagem; a imagem nunca empurra
  a ação para fora da tela.
- **Estrutura segue o conteúdo:** três cards iguais só quando os três itens são realmente
  equivalentes. Lista, tabela, passos numerados, par de colunas e sequência de imagens
  existem para quando não são.
- **Assimetria intencional** em um ou dois pontos (imagem sangrando a margem, título
  deslocado, um card maior que os outros porque importa mais). Em todos os pontos é bagunça;
  em nenhum, template.
- **Grid:** `display: grid` com `minmax(0, 1fr)` ou `min-width: 0` nos filhos; sem isso uma
  imagem com `width="800"` ou uma palavra longa estica a coluna e cria rolagem horizontal.
- **Alinhamento:** texto corrido à esquerda; centralizado só em hero e títulos curtos. Página
  inteira centralizada é a cara do gerador.
- **Profundidade:** sombra com deslocamento e desfoque suave (`0 12px 32px -16px`). Halo
  colorido sem deslocamento é decoração. Sombra dura `4px 4px 0` só num mundo que é mesmo
  neobrutalista; fora dele é fantasia.
- **Cards:** borda de 1px ou sombra, nunca os dois; raio consistente na página inteira;
  padding de 24 a 32px. Card dentro de card é **proibido**. Borda lateral colorida acima de
  1px em card, item de lista ou aviso é **proibido**.

## Controles

- **Botão:** altura mínima 48px, `padding: .9em 1.6em`, peso 600, raio igual ao do sistema
  ou pílula. Hover com mudança perceptível (escurecer 8%, subir 2px, 150 ms). `:focus-visible`
  com anel de 3px na cor da marca e `outline-offset`. Transição listando propriedades, nunca
  `transition: all`.
- **Link secundário:** texto com sublinhado de `text-decoration-thickness` e
  `text-underline-offset` definidos, não um segundo botão.
- **Formulário:** label visível acima do campo (placeholder não é label); placeholder mostra
  o formato com reticências (`(11) 90000-0000…`); campo com 48px de altura, borda `--line`,
  foco `--brand`; um campo por linha em celular; botão de largura total em celular; mensagem
  de erro ao lado do campo e com a correção, não só o problema; `autocomplete`, `inputmode`
  e `type` certos; nunca bloquear colar; `spellcheck="false"` em e-mail e telefone.
- **Alvo de toque:** 44px no mínimo, 8px de espaço entre alvos. `touch-action: manipulation`
  em botões e links.

## Imagem

- Uma imagem forte vale mais que cinco médias. Mostre o resultado, o processo ou a pessoa,
  nunca o logo gigante nem a foto de banco de imagens de aperto de mão.
- Recorte com intenção: `object-fit: cover`, `aspect-ratio` definido, máscara ou moldura que
  vem do grafismo de assinatura. Máscara geométrica fingindo contorno orgânico (círculo
  aproximando a silhueta de uma pessoa) é pior que nada.
- `width` e `height` em todo `<img>`; `loading="lazy"` fora da primeira dobra;
  `fetchpriority="high"` na do hero. Foto de hero até 200 KB, demais até 100 KB, `webp` ou
  `avif`; logo em `svg`.
- Sem foto da pessoa ainda: busque no Unsplash ou no Pexels (licença livre, sem atribuição
  obrigatória) a foto do **assunto específico** (a sala de fisioterapia, a mão no volante, o
  prato daquele tipo de cozinha), nunca da categoria ("negócios", "sucesso"). Uma foto
  decisiva vale mais que cinco medianas. Baixe para `img/`, nomeie, e liste na entrega como
  provisória. Nunca uma `<img>` quebrada no ar; nunca um bloco cinza "imagem aqui".
- **Como buscar a foto, na prática.** Com acesso à web: abra a busca do Pexels
  (`https://www.pexels.com/search/<termo em inglês>/`) ou do Unsplash
  (`https://unsplash.com/s/photos/<termo>`) com um termo específico ("physiotherapy
  session", "wood oven pizza", "mechanic hands engine"), escolha uma a três fotos que
  mostrem o assunto de verdade, pegue a URL direta da imagem (no Pexels tem a forma
  `https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=1600`;
  no Unsplash, `https://images.unsplash.com/photo-<id>?w=1600&q=80`) e, com terminal, baixe
  com `curl -L -o img/<nome>.jpg "<url>"`. As duas licenças permitem uso comercial sem
  atribuição; diga à pessoa de onde veio cada foto. Sem terminal, use a URL direta no `src`.
  Sem acesso à web, peça as fotos antes de construir: a página não sai sem fotografia.
- Além da fotografia, a página tem material visual autoral: grafismo de assinatura em SVG
  inline, padrão em CSS (`repeating-linear-gradient`, `radial-gradient`, grade visível),
  número gigante que é dado real, citação em display, tabela de horários desenhada, mapa de
  passos. Texto sobre fundo liso é o que sobra quando nada disso foi feito.

## Riqueza mínima

Uma página passa neste piso ou volta para a construção. Conte, não sinta:

| Item | Mínimo |
|------|--------|
| Campo que ocupa a tela inteira (cor da marca, foto com overlay, grafismo) | 1, e o hero costuma ser ele |
| Seções com fotografia real (da pessoa ou de banco livre, provisória) | 3 |
| Aparições do grafismo de assinatura (hero, divisor, moldura, marcador) | 3 |
| Momentos de display grande fora do hero (número, citação, fechamento) | 2 |
| Seções vizinhas com o mesmo fundo e a mesma densidade | no máximo 2 seguidas |
| Momento de movimento autoral | 1 |
| Elementos de texto sobre fundo liso sem nenhum outro material por seção | 0 em hero, prova, oferta e fechamento |

Página "seca" é a que falha em três linhas desta tabela. A correção não é adicionar sombra
e gradiente: é dar a cada seção um material (foto, campo de cor, grafismo, número, citação)
que carregue o que ela diz.
- Logos de clientes em cinza uniforme (`filter: grayscale(1); opacity: .7`), só se forem reais.

## Movimento

- **Um momento autoral**, ligado à assinatura da direção, orquestrado uma vez: a entrada do
  hero, ou a revelação de um elemento de prova. Não a mesma subida com fade em toda seção.
- **Feedback** em botão, link e campo: 100 a 150 ms. Entrada autoral: 500 a 800 ms. Saída
  mais rápida que entrada. Curva `cubic-bezier(0.16, 1, 0.3, 1)`; nada de bounce por reflexo.
- Anime `transform`, `opacity`, e quando o mundo pedir, `clip-path`, `mask`, `filter`,
  `box-shadow`; nunca `width`, `height`, `top`, `left`, `margin`.
- Conteúdo visível no estado padrão: uma animação que falha não pode esconder a página.
- `@media (prefers-reduced-motion: reduce)` reduz movimento sem apagar feedback.
- Sem parallax, sem contador animado, sem carrossel. Nenhum deles precisa de JS para ser
  dispensável.

## Superfícies do navegador

As partes que você não desenhou ainda carregam o design, e são o sinal mais barato de que a
página foi construída e não montada:

- `::selection` com cor da marca e tinta legível.
- `caret-color` nos campos, na cor da marca.
- `scrollbar-color` quando o mundo for escuro.
- Anel de foco na cor do sistema, não o azul do navegador.
- `text-underline-offset` e `text-decoration-thickness` em links.
- `font-variant-numeric: tabular-nums` em números alinhados (preço, horário, tabela).
- `color-scheme: dark` no `<html>` e `<meta name="theme-color">` quando o tema for escuro.

## Responsivo

- Mobile first. CSS base para 360px; `@media (min-width: 720px)` e `(min-width: 1024px)`.
- Teste mental em 360, 390, 768, 1024, 1440: nenhuma rolagem horizontal, nenhuma imagem
  cortando texto, nenhum botão colado na borda, nenhum título estourando.
- Tabela de preço vira pilha; comparativo largo vira lista.
- Texto nunca abaixo de 1rem em celular; títulos por `clamp()`.
- Topo em celular: logo e CTA. Links de âncora só em desktop. Sem menu hambúrguer.
- Botão de WhatsApp flutuante é bem-vindo em serviço local, com `data-conversao` e sem cobrir
  o CTA final.

## Copy no HTML

- Controles nomeiam a ação ("Quero meu orçamento"), nunca "Enviar" ou "Saiba mais".
- Mensagem pós-envio diz o que acontece e quando.
- Nada em caixa alta por CSS em texto corrido; em títulos de display só se o mundo pedir.
- `<title>` e `meta description` escritos para busca, não copiados da headline.

## Recusar

Defaults de categoria, não proibições, salvo as marcadas. Alcançar um deles com o eixo
livre significa que você não decidiu; a correção é reescrever o elemento, não suavizá-lo.

Esqueletos de página:

- Cards do mesmo tamanho com ícone, título e texto como estrutura da página. Card é o
  container preguiçoso.
- O template da métrica: número grande, rótulo pequeno, estatísticas de apoio, acento.
- Rótulo pequeno em caixa alta acima do título (eyebrow, kicker). **Proibido:** nenhum brief o
  traz de volta. O título carrega o próprio peso.
- Numeração de seção (01, 02, 03) sem que a ordem carregue informação.
- Hero dividido (texto de um lado, imagem do outro, fileira de logos embaixo) e headline
  centralizada sobre uma fileira de cards: são o template, qualquer que seja o mundo que o
  pinta.

Hábitos de superfície:

- Texto em gradiente. Vidro e desfoque como decoração.
- Sombra dura deslocada fora de um mundo neobrutalista.
- Mono como fantasia de "técnico" em vez de para código, dado ou medida.
- Emoji ou glifo Unicode no lugar de ícone.
- Ícone de check verde em lista de benefícios de página de luxo.
- Creme, papel, pergaminho, marfim ou luz de abajur numa página de persuasão que o brief não
  pediu: é o default vestido com a roupa do assunto. Refaça a partir dos materiais saturados
  do mundo.
- Claro ou escuro escolhido pela categoria em vez da cena.
- Depoimento inventado com nome e foto de banco de imagens.
- Headline que fala da empresa ("Somos referência em...") em vez do ganho da pessoa.

O piso segura a mecânica; nunca escolhe a direção. Com tudo verde, gaste a página no mundo
comprometido, e na dúvida entre refinado e comprometido, comprometa.
