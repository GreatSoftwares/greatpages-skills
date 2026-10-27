# GreatPages Skills

Skills para agentes de IA (Claude Code, claude.ai, Cursor, Codex, GitHub Copilot, Windsurf e
outros) criarem e publicarem landing pages no [GreatPages](https://greatpages.com.br). Você
instala a skill; o agente desenha, escreve, publica e, se precisar, instala o MCP do
GreatPages sozinho.

## Instalar

O jeito mais rápido, em qualquer cliente compatível com [Agent Skills](https://agentskills.io):

```bash
npx skills add GreatSoftwares/greatpages-skills
```

Depois é só pedir uma landing page ao agente. Se o MCP do GreatPages ainda não estiver
conectado, a skill instala e abre o login no navegador. Precisa de uma conta GreatPages; a
gratuita publica em subdomínio gratuito.

### Por cliente

**Claude Code**, para todos os projetos, como plugin:

```
/plugin marketplace add GreatSoftwares/greatpages-skills
/plugin install greatpages@greatpages-skills
```

Ou copiando a pasta (em `~/.claude/skills/` vale para todos os projetos; em `.claude/skills/`
só para o projeto atual):

```bash
git clone https://github.com/GreatSoftwares/greatpages-skills.git
cp -R greatpages-skills/skills/greatpages-landing-page ~/.claude/skills/
```

**Cursor:** `npx skills add GreatSoftwares/greatpages-skills` no projeto, ou copie a pasta
`skills/greatpages-landing-page` para `.cursor/skills/`.

**Codex:** copie a pasta para `.codex/skills/`.

**GitHub Copilot:** copie a pasta para `.github/skills/`.

**claude.ai:** compacte a pasta `skills/greatpages-landing-page` em .zip e envie em
Settings → Capabilities → Skills. No claude.ai não há terminal, então o MCP você conecta
por conta própria: Settings → Connectors → Add custom connector →
`https://mcp.greatpages.com.br/mcp`.

**Outros clientes:** copie a pasta para o diretório de skills do cliente.

### Conferir

Peça ao agente: "Crie uma landing page para [seu negócio]". Ele deve começar pelo brief
(poucas perguntas), conectar o MCP se faltar, perguntar em qual projeto a página fica e
seguir até a URL publicada. Para conectar o MCP por conta própria em qualquer cliente, veja
[references/mcp-setup.md](skills/greatpages-landing-page/references/mcp-setup.md).

## O que a skill faz

| Skill | O que faz |
|-------|-----------|
| [`greatpages-landing-page`](skills/greatpages-landing-page/SKILL.md) | Cria, refaz, ajusta e avalia landing pages de alta conversão e publica no GreatPages pelo MCP. Deriva a identidade visual do público em vez do visual padrão de IA, escreve a copy inteira antes do HTML, critica o resultado com nota antes de publicar, e entrega formulário que vira lead, WhatsApp contado como conversão, SEO no `<head>` e domínio. |

Exemplo de pedido:

> Quero uma página para minha clínica de fisioterapia em Sorocaba, para a pessoa agendar pelo WhatsApp.

A skill guia o agente por brief, projeto, direção visual e copy, HTML, crítica, import,
publicação e domínio, e devolve a URL no ar. Ajustes depois seguem o ciclo ler → editar →
sincronizar → republicar, sempre com a sua confirmação antes de mudar o que está no ar.
"Avalie essa página" devolve um relatório com nota, sem alterar nada.

## Estrutura

```
skills/greatpages-landing-page/
├── SKILL.md                      modos (criar, refazer, ajustar, avaliar, publicar), fluxo, regras, exemplo
├── references/
│   ├── mcp-setup.md              instalar e conectar o MCP em cada cliente, feito pelo agente
│   ├── mcp-workflow.md           roteiro tool a tool: projeto, import, publish, domínio, leads, A/B
│   ├── html-rules.md             o HTML que a plataforma aceita: forms que viram lead, conversão, limites
│   ├── direcao.md                de onde vem o visual: mundo do público, rut recusado, cor, tipo, contrato
│   ├── design.md                 piso de qualidade: tipografia, cor, espaço, layout, controles, movimento
│   ├── copy-e-secoes.md          dados de conversão, orçamento de palavras, primeira tela, CTA, prova, estruturas
│   ├── icones.md                 sprite SVG pronto (Lucide e Simple Icons) e onde ícone entra
│   ├── performance.md            orçamento de LCP, CLS, peso, imagens, fontes próprias, como medir
│   └── critica.md                os quatro testes, nota por critério, piso mecânico, relatório de avaliação
```

## Contribuir

Issues e pull requests são bem-vindos: erro na referência, cliente que não está no guia de
conexão, seção que falta no guia de copy. Mudanças no contrato do HTML (o que a plataforma
aceita) vêm da equipe do GreatPages, porque espelham o código da plataforma.

## Licença

[MIT](LICENSE).
