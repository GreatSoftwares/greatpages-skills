# Roteiro das tools do MCP

Todas as tools agem na conta da pessoa logada. Nenhuma recebe `id_account`: conta, usuário e
perfil vêm do login. O que a pessoa não pode fazer no painel, o agente também não pode.

## Visão geral

```
projects_list ──► (perguntar) ──► pages_import_html ──► pages_publish ──► url
                                        │                     ▲
                                        ▼                     │
                       pages_html_get ──► editar ──► pages_html_sync
                                                               │
domains_free_list / domains_list ──► domains_create ──► DNS ──► domains_ssl_refresh ──► pages_publish(id_domain)
```

## Projeto

`projects_list` devolve `id`, `title` e `type`. Apresente como `"Loja" (#42)`. Toda tool que
cria algo (`pages_import_html`, `pages_create`, `pages_duplicate`, `domains_create`,
`domains_link_project`) exige `id_project` na execução; sem ele devolve `PROJECT_REQUIRED` com
a lista e nada acontece. Conta com um projeto só também pergunta. Nunca escolha por conta
própria.

`projects_create` com `title` cria um projeto vazio quando a pessoa pedir.

## Criar a página: `pages_import_html`

Argumentos:

| Campo | Obrigatório | Nota |
|-------|-------------|------|
| `title` | sim | Título interno da página no painel. Não é o `<title>` do HTML. |
| `id_project` | sim na prática | Veja acima. |
| `html` | um dos dois | Texto do `index.html`, até 2.000.000 de caracteres. |
| `upload_id` | um dos dois | Do .zip enviado com `pages_upload_start`. |
| `page_link` | não | Caminho público desejado (ex.: `curso-de-ingles`). Sem ele, a plataforma gera. |

A página nasce **não publicada**. O resultado traz `page` (`id`, `title`, `id_project`,
`type: "html"`) e `report`:

- `report.forms[]`: cada formulário com `key` (a chave `data-gp-form` atribuída), `enabled` e
  `reason`. `enabled: true` significa que o envio vira lead. `reason` explica o `false`:
  `no_text_field`, `search`, `password`, `single_field` (um campo só e não é email/telefone).
- `report.unresolved[]`: referências relativas que não acharam arquivo (`not_found`), link para
  outra página `.html` (`linked_page`), `form_action` apontando para arquivo, `too_large`
  (acima de 10 MB), `invalid_path`.
- `report.images`: `pending` (indo para a galeria), `reused`, `kept_as_file`.
- `report.files`: contagem por tipo dos arquivos do .zip.

Se `unresolved` não estiver vazio, corrija e sincronize antes de publicar.

### Enviar .zip: `pages_upload_start`

Só em clientes com terminal. Roteiro:

1. Montar o .zip com o `index.html` **na raiz**, e CSS, JS, imagens e fontes ao lado ou em
   subpastas, referenciados por caminho relativo. Até 25 MB compactado, 50 MB descompactado,
   500 arquivos, 10 MB por arquivo.
2. `pages_upload_start` devolve `upload_url` (vale 10 minutos, uso único) e `upload_id`.
3. `curl --fail-with-body -T site.zip "<upload_url>"`.
4. `pages_import_html` (ou `pages_html_sync`) com o `upload_id`.

Erros do PUT: 400 não é zip, 403 link inválido, 409 link já usado, 410 expirou, 413 acima de
25 MB. Se o import falhar por validação do HTML, o `upload_id` continua valendo para uma nova
tentativa.

Imagens png, jpg, gif, webp e avif do .zip vão para a galeria da conta em segundo plano, numa
pasta com o título da página; svg fica como arquivo do site. Contam no armazenamento do plano:
se não couberem, nada é importado (`STORAGE_LIMIT_EXCEEDED`).

## Publicar: `pages_publish`

| Campo | Nota |
|-------|------|
| `id` | Página. |
| `id_domain` | Opcional. Sem ele, mantém o domínio atual da página (o padrão da conta em página nova). |
| `page_link` | Opcional. Caminho no domínio. Sem ele, mantém o atual. |
| `confirm_token` | Só na segunda chamada de uma republicação. |

- **Primeira publicação** de página que nunca foi ao ar sai direto e devolve `url`.
- **Republicar** sobrescreve o que está no ar e exige confirmação. Em cliente com elicitation
  a pergunta aparece sozinha. Nos demais, a primeira chamada devolve `requer_confirmacao`,
  `resumo` e `confirm_token`, e nada é publicado. Mostre o resumo, espere a pessoa concordar e
  repita com os **mesmos argumentos** mais o token. O token vale 5 minutos e uma vez só.
- Recusas: caminho já ocupado no domínio, domínio de outro projeto
  (`DOMAIN_PROJECT_MISMATCH`), teste A/B rodando, plano sem espaço, conta congelada.
- Timeout: a operação pode ter concluído. Confira com `pages_get` antes de repetir.

`pages_unpublish` tira do ar e sempre pede confirmação. O conteúdo fica guardado.

## Editar: `pages_html_get` e `pages_html_sync`

1. `pages_html_get` com `id` lê em pedaços de até 50.000 caracteres (`offset`, `limit`,
   `next_offset`). A primeira linha traz a `revision`. Para página grande, `download: true`
   devolve um link para `curl -o pagina.html "<download_url>"`.
2. `pages_html_conversions_get` lista formulários e gatilhos marcados, com a `revision`. Use
   antes de reescrever para saber o que precisa continuar no HTML novo.
3. Edite preservando `data-gp-form`, `data-gp-conversao`, `data-gp-apos-envio`,
   `data-gp-mensagem`, `data-gp-redirect` e `data-conversao`.
4. `pages_html_sync` com `id`, `revision` e `html` (ou `upload_id`).

Comportamentos do sync:

- `revision` diferente da atual: recusado. Leia de novo.
- Perdeu formulário ou gatilho ativo: recusado com `conversions_lost`. Devolva os atributos.
  `accept_conversion_loss: true` só se a perda for intencional e a pessoa souber.
- Adicionou código que executa (`<script>`, `<iframe>`, `on*=`, `javascript:`, `<link>` fora
  de icon/canonical, `meta http-equiv`, CSS com `@import` fora do Google Fonts) ou mudou a
  conversão pelo HTML: exige confirmação, igual à republicação. Página sem script nunca cai
  aqui.
- O sync **não publica**. O anterior fica no histórico. A página no ar só muda com
  `pages_publish`.
- Formulário igual ao anterior (mesmos `name`) herda a chave e as configurações mesmo sem
  `data-gp-*` no HTML novo. Formulário novo ganha chave nova.

Em página html, `pages_duplicate`, `pages_versions_list` e `pages_version_restore` são
recusadas, e `pages_update` só altera `title` (SEO vem do `<head>`).

## Domínio

### Sem domínio próprio

`domains_free_list` lista as bases de subdomínio gratuito (ex.: `pages.net.br`) e diz se a
conta já usou o dela (cada conta tem um). `domains_create` com `subdomain` (o nome escolhido),
`domain` (a base) e `id_project`. Nasce ativo, sem DNS. Depois `pages_publish` com o
`id_domain`.

### Domínio próprio

1. `domains_list` com o `id_project` mostra os domínios do projeto e o `status`
   (`ativo`, `pendente`, `erro`).
2. `domains_create` com `subdomain` (`www`, `lp`, ou vazio para a raiz), `domain`
   (`minhaempresa.com.br`) e `id_project`. Pede confirmação: o resumo diz se é vínculo de domínio
   já existente ou cadastro novo, e avisa de cobrança quando passa do limite do plano. Domínio
   com acento vai em punycode automaticamente.
3. A resposta traz `dns[]` (tipo, host, valor), `proximo_passo` e `link_painel`. Explique à
   pessoa o que criar no provedor (Registro.br, GoDaddy, Hostinger, Cloudflare). Leia os valores
   da resposta, nunca invente.
4. Quando a pessoa disser que configurou, `domains_ssl_refresh` com o `id`. No máximo uma vez a
   cada poucos minutos, nunca em laço. O domínio vira `ativo` quando o certificado sai. Pendente
   por mais de 24 horas: conferir os registros com a pessoa.
5. `pages_publish` com `id_domain` e, se quiser, `page_link`.

A plataforma só publica em domínio vinculado ao projeto da página. Em `DOMAIN_PROJECT_MISMATCH`,
pergunte: vincular o domínio ao projeto (`domains_link_project`) ou mover a página
(`pages_move`). Nunca decida sozinho.

Limites: 20 domínios novos por dia por conta, 10 operações pesadas por minuto.

## Depois de publicar

- `analytics_page` com `id` da página: visitas, conversões e taxa.
- `leads_list` com período (`date_start`, `date_end`, até 90 dias; sem período, últimos 30):
  os leads dos formulários, com os campos enviados.
- `pages_get`: estado atual, `published`, `edited` (alterações não publicadas), `url`.

## Teste A/B (opcional, quando houver tráfego)

1. `ab_tests_create` com a página.
2. `ab_tests_variations_create` (até 7). Cada variação tem `id` em `ab_tests_get`.
3. Em página html: `pages_html_get` e `pages_html_sync` com `id` da página e `id_variation`.
   Cada variação tem a própria `revision`. Teste rodando recusa edição: `ab_tests_pause` antes.
4. `ab_tests_variations_weights` com todas as variações somando 100.
5. `ab_tests_start` (confirmação; publica a página se não estiver no ar).
6. `ab_tests_finish` com a vencedora.

Teste A/B exige o recurso no plano da conta.

## Limites e ritmo

- Import, sync, publicar e despublicar: 10 por minuto por conta, até 130 s por chamada.
- Escrita em geral: 20 por minuto. Leitura: 120 por minuto.
- Não repita uma chamada pesada que deu timeout sem conferir o estado antes.
