# Crítica

Use em dois momentos: antes de publicar o que você construiu (obrigatório) e quando a pessoa
pede para avaliar ou melhorar uma página que existe (modo **avaliar**). Nos dois, a crítica
é sobre o resultado renderizado, não sobre a intenção. Nunca substitua a evidência por um
"sim" genérico.

## Evidência

- **Com navegador:** abra o arquivo (ou a URL publicada) em 1280px e em 390px. Capture a
  página inteira nos dois. Settle as animações de entrada antes de olhar: elemento escondido
  por timing vira "elemento faltando" e você o "conserta" quebrando a página.
- **Sem navegador:** leia o HTML seção por seção imaginando os dois tamanhos. Confira as
  medidas computáveis no CSS (tamanhos, contrastes, `min-width`, `clamp`).
- **Modo avaliar em página do GreatPages:** `pages_get` para estado e URL, `pages_html_get`
  para o HTML, `pages_html_conversions_get` para saber o que está ligado a lead e conversão.
  Abra a URL publicada se existir.

## Os três testes

1. **Cinco segundos.** Olhe só o primeiro viewport em celular. Responda: o que é, para quem
   é, o que fazer. Qualquer uma sem resposta imediata é falha grave.
2. **Estreitar de olhos.** Com a tela borrada, o elemento primário, o secundário e os grupos
   ainda aparecem na ordem certa? O CTA é o ponto mais chamativo da primeira tela?
3. **Lembrança.** Fechou a aba. Uma hora depois, o que descreveria? Se a resposta honesta é um
   clima ("era clean", "era profissional"), a direção não comprometeu.
4. **Secura.** Conte na tabela de [riqueza mínima](design.md#riqueza-mínima): campo de tela
   inteira, fotografia em três seções, assinatura três vezes, display fora do hero duas vezes,
   fundos alternando, um movimento. Três linhas abaixo do mínimo é página seca, e página seca
   volta para a construção antes de qualquer polimento.

## Nota por critério

Pontue de 1 a 5 cada um. Abaixo de 3 em qualquer linha é correção obrigatória; abaixo de 4
na média é "não publica ainda".

| Critério | 5 | 1 |
|----------|---|---|
| **Clareza da oferta** | Headline com ganho, prazo ou lugar; sub explica o como | Fala da empresa, genérica, duas ideias |
| **Ação** | Uma ação, funcional, no hero, repetida após a prova e no fim, verbo + ganho | "Enviar", "Saiba mais", dois botões competindo, ação só no fim |
| **Prova** | Real, específica, perto de cada ação | Inventada, vaga, ou ausente onde o visitante decide |
| **Direção** | Reconhecível com o texto removido; o mundo carrega superfícies e estrutura | Template pintado; adivinhável pela categoria |
| **Material** | Foto, campo de cor, grafismo, número ou citação carregando cada seção que decide | Texto sobre fundo liso, seção após seção; "imagem aqui" |
| **Hierarquia** | Estreitar de olhos revela a ordem; um foco por bloco | Tudo do mesmo peso; tudo centralizado; três CTAs |
| **Tipografia** | Escala com papéis, medida de 60 a 75ch, títulos balanceados, faces do mundo | Default de gerador, palavra sozinha em título, texto abaixo de 1rem |
| **Cor** | Estratégia nomeada; contraste medido; CTA dono da cor | Cinza sobre branco, gradiente roxo, cor da ação espalhada |
| **Ritmo** | Denso e quieto alternando; mais espaço acima do título | Um espaçamento só; seções separadas por linha |
| **Celular** | Sem rolagem horizontal; ação na primeira tela; alvos de 44px | Imagem empurra o CTA; título estoura; botão colado na borda |
| **Copy** | Língua da pessoa, específica, nível de leitura simples, tipografia PT certa | Jargão, "transformar sua vida", aspas retas, placeholder |
| **Conversão GreatPages** | Formulário `enabled`, `data-conversao` nos cliques certos, SEO no head | Form sem `name`, `action` indevido, WhatsApp sem marca, sem `og:image` |

## Piso mecânico

Confira cada item no CSS ou no render, não na memória:

- Contraste: texto ≥ 4.5:1, grande e botão ≥ 3:1, inclusive sobre imagem e sobre a marca.
- Tipografia: display ≤ 6rem, tracking ≥ -0.04em, texto 1rem+, medida ≤ 75ch, `balance` em
  título, `pretty` em corpo.
- Espaço: valores na escala de 4px; mais espaço acima do título.
- Sombra com deslocamento e desfoque; sem halo; sem sombra dura fora de neobrutalismo.
- Um momento de movimento; `prefers-reduced-motion`; nada anima `width`/`height`/`top`.
- Estados: hover, foco visível, campo com erro, botão desabilitado se existir.
- Superfícies do navegador: `::selection`, `caret-color`, anel de foco, sublinhado.
- Imagens: `alt`, `width`, `height`, lazy fora da dobra, nenhuma quebrada.
- Recusas: eyebrow, numeração sem sentido, cards iguais como estrutura, texto em gradiente,
  emoji como ícone, creme-serifa-terracota sem brief, escuro-neon sem brief.

## Contrato da plataforma

- `<!doctype html>`, `lang`, `charset`, viewport, `<title>`, `meta description`, `og:*`.
- Formulário: sem `action`, `name` em todo campo, campo de texto ou contato, `data-gp-conversao="true"`,
  `data-gp-apos-envio` com `mensagem` + `data-gp-mensagem` ou `redirecionar` + `data-gp-redirect`,
  consentimento. Chave `data-gp-form` existente preservada; nunca inventada.
- `data-conversao="true"` em WhatsApp, `tel:`, checkout, agenda; em `<a>` com href externo.
- Nenhum `<script>` sem necessidade; nenhum `<link rel="stylesheet">`, `<iframe>`, `<base>`,
  `on*=`, `javascript:`, `@import` fora de fonts.googleapis.com, pixel ou GTM colado.
- Nenhum link para outro `.html`; âncoras para navegar.
- Tamanho dentro dos limites; imagens até 10 MB; sem `data:` URI grande.

## Como corrigir

Classifique cada achado antes de mexer:

- **Direção não comprometeu:** o problema é de tese ou mundo. Não polir: volte a
  [direcao.md](direcao.md) e refaça a decisão. Polir uma direção errada é o erro mais caro.
- **Hierarquia ou ritmo:** reorganize blocos e espaços; não adicione elementos.
- **Defeito local:** contraste, tamanho, alinhamento, estado faltando. Corrija no CSS.
- **Copy:** reescreva a frase; não mude o layout para esconder texto ruim.
- **Contrato:** corrija o atributo; é bloqueante para publicar.

Corrija tudo em **um lote**, olhe de novo, e pare. Duas rodadas é o teto. O que sobrar vai
para a pessoa como lista honesta ("faltam as fotos reais da equipe; o depoimento 2 está
rotulado como exemplo"), nunca como "pronto".

## Relatório no modo avaliar

Quando a pessoa pediu avaliação, entregue nesta forma e não altere nada sem ela pedir:

1. **Veredito em uma frase** e a nota média.
2. **Os três testes**, uma linha cada.
3. **Tabela de critérios** com nota e o achado principal de cada um.
4. **Cinco correções de maior impacto**, em ordem, com o que muda na conversão esperada.
5. **O que já está bom** e não deve ser tocado.
6. Oferta: "quer que eu aplique as cinco? Eu edito e republico com a sua confirmação".
