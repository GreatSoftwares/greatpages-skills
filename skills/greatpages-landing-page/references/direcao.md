# Direção: de onde vem o visual

Uma landing page é uma superfície de persuasão: o visitante julga o design antes de ler. Por
isso a direção visual não é "estilo": é a decisão de qual mundo a página habita, e esse mundo
vem do público, não da categoria do produto nem do seu hábito.

Siga a ordem. Cada passo fecha uma porta pela qual páginas geradas costumam escapar.

## 1. Nomeie o que é verdade

Em uma frase cada:

- **Mecanismo:** o que este negócio faz de único, em termos do que acontece com o cliente.
  "Clínica de fisioterapia" é categoria; "avaliação no mesmo dia e plano com metas semanais
  medidas em graus de amplitude" é mecanismo.
- **Cena:** quem vai abrir a página, onde, em que estado. "Mulher de 45 anos, no celular, à
  noite, com dor nas costas há três semanas, depois de pesquisar no Google."
- **Casa cultural:** o mundo em que esse público vive e reconhece. Objetos, lugares, rituais,
  publicações, gráficos, interfaces, música, roupa, embalagem.
- **O que esta página precisa provar** além de dizer.

## 2. Liste o rut e recuse

Escreva, explicitamente, duas coisas:

- **O que a categoria sempre entrega.** A página que todo concorrente tem: foto de banco de
  imagens, três cards com ícone, paleta previsível.
- **O oposto previsível.** A "alternativa" que todo gerador oferece quando pedem algo
  diferente: creme com serifa e terracota; preto com neon e bordas brilhantes; editorial com
  hairlines, serifa itálica e etiquetas em mono; tinta chapada com caixas pretas e sombra dura.

Os dois estão fora. Se alguém consegue adivinhar sua estética só pela categoria, ou pela
categoria mais o que você evitou, refaça. Isso vale mesmo quando o assunto "pede": livro não
pede serifa e creme, tecnologia não pede mono e escuro, bem-estar não pede verde-sálvia.

## 3. Derive sete candidatos do mundo do público

Da casa cultural do passo 1, liste **sete** sistemas visuais concretos que o público conhece
de cor, cada um com três linhas:

- por que ressoa com esse público e consegue carregar o mecanismo;
- como é: ground e cores principais, voz tipográfica, e a assinatura que o torna reconhecível;
- o que da página ele carregaria: só o acento (fraco), as superfícies (bom), a estrutura
  (forte).

Fontes de candidatos: a embalagem do produto que esse público compra, o guia impresso que
lê, o aplicativo que usa todo dia, a placa da rua onde mora, o uniforme da profissão, o
equipamento do ofício, o cartaz do evento que frequenta, a notação técnica da área (partitura,
planta, goniômetro, tabela nutricional, ticket de bolsa), a identidade de uma instituição que
ele respeita, uma escola de design que a área adotou.

Regras do sorteio:

- Se mais de três dos sete são da mesma família material (todos "papel", todos "tela"), a
  derivação parou no objeto mais óbvio. Cave até cobrir três famílias.
- O nome do produto e a metáfora literal do pedido ("raiz", "farol", "ponte") gastam no
  máximo um candidato.
- Near-duplicatas contam uma vez.
- Ordene por ressonância. **Não pegue o primeiro automaticamente:** o primeiro costuma ser o
  mais seguro, e o terceiro ou quarto o mais lembrável. Escolha o que tem a melhor combinação
  de identificação do público e clareza do produto, e diga por que.

Apresente à pessoa só a escolha, em três linhas, com o segundo colocado como alternativa em
uma linha. Não ofereça os sete; a decisão é sua, a aprovação é dela.

## 4. Comprometa o mundo

### Estratégia de cor, antes das cores

Escolha uma e diga qual:

| Estratégia | O que é | Quando |
|------------|---------|--------|
| **Contida** | Neutros tingidos pelo mundo mais um acento que faz trabalho real (ação, estado) | Serviços de alta confiança, finanças, jurídico, saúde quando a cena pede calma |
| **Comprometida** | Uma cor saturada ocupa 30% a 60% da página: campos inteiros, não detalhes | A maioria das landing pages; é o que faz a página ser daquela marca |
| **Paleta cheia** | Três ou quatro cores com papéis nomeados | Eventos, infantil, lifestyle, marcas que já têm sistema |
| **Encharcada** | A superfície é a cor; o texto e os controles vivem dentro dela | Lançamentos, moda, produtos de personalidade forte |

Cor compromete em escala de página: campos que são donos de regiões inteiras, não acentos
espalhados sobre um fundo neutro. O botão de CTA tem a cor mais saturada e a usa sozinho.

Em landing page o padrão é **Comprometida** ou mais forte. **Contida** só quando o brief
pede sobriedade com todas as letras (jurídico, financeiro, saúde de alta complexidade), e
mesmo assim o hero é um campo inteiro da cor do mundo ou uma fotografia de tela cheia. Uma
página com fundo branco do começo ao fim e a cor só no botão é a versão segura, e a versão
segura é o risco conhecido.

**Claro ou escuro nunca é padrão.** Escreva a cena física (quem, onde, com que luz) e deixe
ela decidir. Página aberta no celular à noite por alguém com dor: escura cansa menos; página
de evento aberta no escritório: clara.

Defina as cores em `:root` com papéis, nunca por valor: `--ground`, `--surface`, `--ink`,
`--ink-2`, `--brand`, `--brand-ink`, `--accent`, `--accent-ink`, `--line`. Em superfície
colorida, o texto secundário é tingido do próprio matiz ou da tinta, nunca cinza.

### Tipografia como objeto do mundo

Escolha as faces como quem escolhe um objeto da casa cultural, não de uma lista de "fontes
bonitas". Estas são as defaults de gerador e exigem um motivo que nenhuma outra face
satisfaria, e associação temática nunca é motivo: **Fraunces, Playfair Display, Cormorant,
Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter como display,
DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans, Instrument Serif, Poppins,
Montserrat.** Também fora: Impact, Arial Black e a sans do sistema como voz de display.

O método: a partir do candidato escolhido, nomeie a voz (condensada de cartaz, grotesca
industrial, serifa de jornal de bairro, humanista de guia de viagem, geométrica de
sinalização, egípcia de embalagem, display gordinha de bala) e procure no catálogo do Google
Fonts a face que tem essa voz. Dois pares de exemplo por voz, para calibrar, não para copiar:

| Voz | Display | Texto |
|-----|---------|-------|
| Cartaz condensado | Anton, Big Shoulders Display, Barlow Condensed, Oswald | Barlow, Archivo, Public Sans |
| Grotesca industrial | Archivo Black, Schibsted Grotesk, Familjen Grotesk, Hanken Grotesk | Archivo, Karla, Work Sans |
| Sinalização geométrica | Unbounded, Red Hat Display, Sora, Urbanist | Figtree, Onest, Mulish |
| Jornal e livro | Libre Caslon Text, Source Serif 4, Spectral, Literata, EB Garamond | Libre Franklin, Source Sans 3 |
| Egípcia de embalagem | Zilla Slab, Bitter, Arvo, Roboto Slab | Rubik, Karla |
| Display com personalidade | Gloock, Young Serif, Yeseva One, Bodoni Moda, Italiana, Marcellus | Jost, Josefin Sans |
| Gordinha e amigável | Baloo 2, Fredoka, Caprasimo, Righteous | Nunito, Quicksand |
| Técnica e de medida | Chakra Petch, Michroma, Exo 2, JetBrains Mono (só para dado) | Chivo, Epilogue |
| Manual e humana | Caveat, Kalam, Patrick Hand (só em acento) | Lato, Raleway |

Confirme no Google Fonts que a face e os pesos existem antes de importar. Uma família de
display com personalidade e uma de texto com legibilidade; no máximo três pesos ao todo.

### Grafismo de assinatura

Todo mundo tem um sinal que o torna reconhecível com o texto removido: um recorte de foto,
uma grade visível, um traço de régua, uma moldura, um padrão derivado do ofício. Escolha um,
defina em CSS ou SVG inline, use no hero e repita uma ou duas vezes na página (divisor,
moldura de foto, marcador de lista). Ícones, se houver, são de um conjunto só, em SVG inline
com o mesmo traço; emoji e caracteres Unicode não são ícones.

## 5. Escreva o contrato de direção

Cinco blocos, 120 a 180 palavras no total, antes do primeiro `<`:

- **TESE:** a ideia que esta página possui e o arranjo padrão que recusa.
- **MUNDO:** estratégia de cor com as cores nomeadas; as duas faces e seus pesos; materiais
  (papel, metal, tela, fita, concreto); o grafismo de assinatura.
- **HISTÓRIA:** o que o visitante entende, passa a acreditar e faz.
- **PRIMEIRO VIEWPORT:** o que está onde, em que escala, e onde está a ação. Em celular e em
  desktop.
- **ASSINATURA:** o detalhe lembrável e o único momento de movimento autoral.

Teste de clima: se um bloco poderia descrever outra marca da mesma categoria, ele não foi
escrito ainda.

O contrato nunca entra no HTML: nem em comentário, nem em `data-*`, nem em texto oculto. Ele
vive na conversa e na sua cabeça.

## 6. O primeiro viewport é uma tese, não um cabeçalho

A primeira tela demonstra o mecanismo na escala em que ele existe na vida. Um hero de
"headline, subtítulo, botão, imagem ao lado, fileira de logos" é o template, pintado com
qualquer mundo. Pergunte: se o visitante fechasse depois de uma tela, o que descreveria uma
hora depois? Se a resposta honesta for um clima, a tese não comprometeu.

Ao mesmo tempo, Persuade exige que a abertura torne a oferta inteligível e desejável, exponha
uma ação clara e prove algo que só este negócio pode provar. A ação é a que o visitante veio
fazer, em forma funcional: o formulário real, o botão real de WhatsApp. Um mundo comprometido
que esconde a oferta ou a ação não terminou de traduzir. Os dois extremos apagam a direção: o
pôster sem partes funcionais e a página genérica de produto.

## 7. Prove, não afirme

Mostre o negócio fazendo o trabalho: o resultado, o processo, a medida, a especificidade que
um concorrente não conseguiria copiar e colar. Dados de demonstração são material de design:
escreva em fidelidade total e rotule como exemplo onde um visitante poderia confundir com
real. O que fica fora do seu alcance são as afirmações comerciais: preço, clientes, números
de resultado, prazos, capacidades que o negócio não tem. Recusar uma direção ousada porque os
dados ainda não existem é timidez vestida de honestidade: construa, rotule, e entregue à
pessoa a lista do que substituir.

## 8. Ritmo de rolagem

Varie densidade, escala, imagem, movimento e silêncio dentro de uma gramática só. Uma
passagem densa (a oferta, a prova) ganha uma passagem quieta depois. A página termina
ancorada por um fechamento real: a ação, com a tese repetida, não um rodapé que aparece do
nada. Um ritmo de espaçamento do começo ao fim, com mais espaço acima de um título do que
abaixo dele.

## Checagem antes de construir

- Alguém adivinharia o visual só pela categoria? Pela categoria mais o que evitei?
- O mundo escolhido carrega a estrutura ou só o acento?
- A primeira tela tem oferta, ação funcional e prova, e ainda assim é lembrável?
- A estratégia de cor está nomeada, e claro ou escuro veio da cena?
- As faces vieram do mundo, e nenhuma está na lista de defaults?
- Existe um grafismo de assinatura e um único momento de movimento?
