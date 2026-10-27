# Estrutura e copy por tipo de página

Landing page tem um objetivo e uma ação. Toda seção existe para levar à ação ou derrubar uma
objeção. Seção que não faz nenhum dos dois sai. A ordem abaixo é a padrão; adapte à oferta,
nunca à vontade de preencher espaço.

## Princípios de copy

- **Benefício antes de recurso.** "Durma a noite inteira em 14 dias" vence "Programa de
  higiene do sono com 6 módulos".
- **Específico vence genérico.** Números, prazos, nomes de lugar, quantidade de alunos.
  "Mais de 1.200 famílias atendidas em Curitiba" e não "milhares de clientes satisfeitos".
- **Fale com uma pessoa.** "Você" sempre. Frases curtas. Verbo no presente.
- **Um pensamento por frase.** Parágrafos de até três linhas na tela do celular.
- **Headline:** resultado desejado + prazo ou mecanismo + sem a dor principal. Fórmulas:
  - "[Resultado] em [prazo], sem [objeção]."
  - "Para [público] que quer [resultado] sem [dor]."
  - "O jeito [adjetivo] de [verbo] [objeto]."
  - Pergunta que o público faz a si mesmo: "Cansado de [dor]?" só se a resposta for óbvia.
- **Subheadline:** explica o como em uma frase e inclui a prova ou o diferencial.
- **CTA:** verbo em primeira pessoa + ganho. "Quero minha consulta", "Receber o guia grátis",
  "Garantir minha vaga", "Falar com a equipe agora". Nunca "Enviar", "Saiba mais", "Clique aqui".
- **Microcopy abaixo do CTA:** tira o medo. "Sem compromisso", "Resposta em 1 dia útil",
  "Cancele quando quiser", "Seus dados estão protegidos".
- **Prova verdadeira ou nenhuma.** Não invente depoimentos, números, logos ou selos. Sem prova,
  use garantia, processo transparente ou a história real da pessoa.
- **Objeções**: liste as cinco principais do público e responda cada uma em algum lugar
  (seção "Como funciona", FAQ, garantia, bio).
- **Urgência honesta.** Vagas, data e preço só se forem reais. Contador falso destrói confiança.
- **Português natural.** Sem "soluções inovadoras", "excelência", "alavancar", "sinergia".
  Leia em voz alta: se ninguém falaria aquilo, reescreva.
- **Tom pela marca:** mais formal em saúde, direito e finanças; direto em serviços; caloroso
  em bem-estar e educação; enérgico em eventos e lançamentos.

## O que os dados dizem

Do Unbounce Conversion Benchmark Report (edição 2024, 57 milhões de visitas em 41 mil
páginas), para orientar decisões, não para citar na página:

- Mediana de conversão de landing page: 6,6%. Página na faixa de 10% ou mais está entre as
  melhores. Meta realista para uma página nova: passar de 5% em captura e de 2% em vendas.
- Texto no nível de leitura do 5º ao 7º ano converte 11,1%; texto "profissional" converte
  5,3%. Palavras difíceis, tempo de leitura e contagem de palavras correlacionam negativamente
  com conversão. Escreva simples e curto. Exceção: serviços financeiros toleram linguagem técnica.
- 83% das visitas vêm do celular, e o desktop ainda converte 8% melhor: a página que não
  funciona bem no celular perde a maioria do tráfego.
- Tráfego de e-mail converte muito mais (19,3%) que busca paga (10,9%) e social pago (12%):
  a página de captura alimenta o canal que mais converte depois.
- Cada campo a mais no formulário reduz a conversão. Peça o mínimo que a oferta exige:
  nome e e-mail para isca; mais WhatsApp quando haverá contato humano. Resto, depois.
- Uma ação por página. Dois CTAs diferentes competindo no hero reduzem a conversão.

## Tipo 1: Captura de leads (isca, newsletter, orçamento)

Objetivo: o formulário. Página curta. Tudo acima da dobra ou a um scroll.

1. **Hero com formulário ao lado** (desktop) ou logo abaixo (celular): headline com o ganho da
   isca, subheadline com o que tem dentro, três bullets de benefício, formulário com 2 ou 3
   campos (nome, e-mail, WhatsApp se a oferta exige contato), CTA, microcopy de privacidade.
2. **O que você vai receber:** três a cinco itens concretos (capítulos, aulas, planilhas).
3. **Para quem é / para quem não é:** duas colunas curtas. Qualifica o lead.
4. **Quem está por trás:** foto real, nome, uma frase de autoridade, um número.
5. **Prova social:** um ou dois depoimentos verdadeiros, ou logos, ou "X pessoas já baixaram".
6. **CTA final** repetindo o formulário ou âncora para ele.
7. **Rodapé.**

Formulário: `data-gp-apos-envio="redirecionar"` para a página ou link de entrega quando a isca
for digital; `mensagem` quando for contato humano ("Recebemos. Falamos com você em até 1 dia
útil pelo WhatsApp.").

## Tipo 2: Vendas (curso, produto, serviço com preço)

Objetivo: o botão de compra ou o pedido de contato comercial. Página longa com ritmo:
problema → solução → prova → oferta → objeções → fechamento.

1. **Hero:** headline com a transformação, subheadline com o mecanismo, CTA primário (comprar
   ou falar com vendas), prova curta embaixo ("4,9 de 5 em 312 avaliações", "turma 7").
2. **Problema:** três a quatro dores narradas como a pessoa sente, sem exagero. Fecha com a
   virada ("Não é falta de esforço. É falta de método.").
3. **Solução / o que é:** o produto em uma frase, depois o mecanismo em três passos ou pilares.
4. **O que está incluído:** módulos, entregáveis, bônus, com valor percebido claro.
5. **Para quem é:** perfil ideal em bullets.
6. **Prova social forte:** depoimentos com nome, cidade ou cargo, resultado específico. Vídeo
   como link com capa, não iframe, salvo pedido.
7. **Quem ensina / quem entrega:** credenciais em números e fatos.
8. **Oferta:** preço, parcelamento, o que acompanha, comparação com alternativas se fizer
   sentido. Um plano em destaque. Botão de CTA com `data-conversao="true"` apontando para o
   checkout externo, ou formulário para vendas consultivas.
9. **Garantia:** prazo e condição em linguagem simples.
10. **FAQ:** seis a oito perguntas que vendem (acesso, tempo, suporte, pagamento, pré-requisito).
    Com `<details>`.
11. **Fechamento:** repete a transformação, CTA, microcopy de segurança.
12. **Rodapé** com termos, privacidade, CNPJ e contato.

## Tipo 3: Serviço local com WhatsApp (clínica, oficina, escritório, restaurante)

Objetivo: clique no WhatsApp (ou ligação). Página média. Confiança e proximidade.

1. **Hero:** headline com serviço + benefício + cidade/bairro, subheadline com diferencial
   (horário, atendimento no mesmo dia, especialidade), botão de WhatsApp grande com
   `data-conversao="true"` e mensagem pré-preenchida, botão secundário "Ver serviços" (âncora).
2. **Barra de confiança:** anos de atuação, atendimentos, avaliação no Google, convênios.
3. **Serviços:** três a seis cards com nome, uma linha e, se quiser, "a partir de".
4. **Como funciona:** três passos (fala no WhatsApp, agenda, resolve).
5. **Sobre / equipe:** fotos reais, nomes, registro profissional quando se aplica.
6. **Depoimentos:** com primeiro nome e bairro.
7. **Localização e horário:** endereço em texto, link para o mapa (`https://maps.google.com/?q=...`)
   em vez de iframe, horários em tabela simples.
8. **CTA final** com WhatsApp e telefone (`tel:`).
9. **Rodapé.**

Botão flutuante de WhatsApp (`position: fixed`) no canto inferior direito é bem-vindo aqui,
também com `data-conversao="true"`.

## Tipo 4: Evento, webinar, lançamento

Objetivo: inscrição. Urgência real por data.

1. **Hero:** nome do evento, promessa, data e horário com fuso, formato (online ao vivo,
   presencial com local), formulário de inscrição ou CTA para ele.
2. **O que você vai aprender / viver:** bullets concretos.
3. **Para quem é.**
4. **Quem apresenta:** foto, nome, credencial.
5. **Programação / agenda:** horários e blocos. Em `<ol>` ou tabela simples.
6. **Prova:** edições anteriores, números, depoimentos.
7. **Inscrição** repetida, com o que acontece depois ("você recebe o link por e-mail e WhatsApp").
8. **FAQ** curto (gravação, certificado, custo).
9. **Rodapé.**

## Tipo 5: Institucional de uma página

Objetivo: contato. Para quem só quer "ter um site". Mais leve, menos pressão.

1. **Hero:** o que a empresa faz, para quem, com uma frase de posicionamento e CTA de contato.
2. **Serviços ou produtos.**
3. **Diferenciais** em três pontos com prova.
4. **Clientes / cases** com logos ou mini-relatos.
5. **Sobre** com história curta e equipe.
6. **Contato:** formulário (nome, e-mail, telefone, mensagem) e dados diretos.
7. **Rodapé** completo.

## Elementos transversais

- **Topo fixo ou não:** logo à esquerda, CTA à direita. Em celular, só isso. Links de âncora
  em desktop se a página for longa.
- **Prova social perto de cada CTA.** Depoimento ou número a um scroll do botão.
- **Rodapé** sempre com: nome e CNPJ (quando houver), contato, links de privacidade e termos,
  "Feito no GreatPages" é opcional e discreto.
- **Página de obrigado:** o GreatPages mostra a mensagem de `data-gp-mensagem` em tela cheia.
  Se a pessoa quiser uma página de obrigado completa, é outra página html publicada em outro
  caminho, e o formulário usa `redirecionar` para ela.

## Checklist de copy antes de publicar

- [ ] Headline fala do ganho da pessoa, não da empresa.
- [ ] Todo CTA tem verbo e ganho; nenhum "Enviar".
- [ ] Nenhum dado inventado (depoimento, número, logo, selo).
- [ ] Cada objeção principal tem resposta em algum lugar.
- [ ] Zero placeholders, zero lorem ipsum.
- [ ] Ortografia e concordância revisadas; sem jargão vazio.
- [ ] `<title>` e `meta description` escritos para busca, não copiados da headline.
- [ ] Mensagem pós-envio diz o que acontece e quando.
