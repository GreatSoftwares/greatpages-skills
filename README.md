# GreatPages Skills

Skills para agentes de IA criarem e publicarem páginas no [GreatPages](https://greatpages.com.br),
a plataforma de landing pages com hospedagem, leads, conversões, testes A/B e domínio.

Uma skill é uma pasta com um `SKILL.md` no formato aberto [Agent Skills](https://agentskills.io):
o agente lê e passa a saber fazer a tarefa do jeito certo. Funciona em Claude Code, claude.ai,
Cursor, Codex, GitHub Copilot, Windsurf e qualquer outro cliente compatível.

| Skill | O que faz |
|-------|-----------|
| [`greatpages-landing-page`](skills/greatpages-landing-page/SKILL.md) | Cria uma landing page bonita e de alta conversão em HTML e publica no GreatPages pelo MCP, com formulário que vira lead, WhatsApp contado como conversão, SEO no `<head>` e domínio próprio ou subdomínio gratuito. |

## Antes de tudo: conectar o MCP do GreatPages

As skills agem na sua conta pelo servidor MCP oficial. Não há token para copiar: na primeira
chamada o agente abre o navegador, você faz login e escolhe as permissões.

```bash
claude mcp add --scope user --transport http greatpages https://mcp.greatpages.com.br/mcp
```

Cursor, VS Code, claude.ai e os demais clientes estão em
[skills/greatpages-landing-page/references/mcp-setup.md](skills/greatpages-landing-page/references/mcp-setup.md).
Precisa de uma conta GreatPages; a gratuita publica em subdomínio gratuito.

> Com o MCP conectado você já tem a skill sem instalar nada: o prompt `criar-landing-page`
> do servidor devolve o conteúdo dela. No Claude Code, digite
> `/mcp__greatpages__criar-landing-page`. Instalar a skill no cliente serve para o agente
> ativá-la sozinho quando você pedir uma landing page, antes mesmo de chamar o MCP.

## Instalar a skill

**Com a CLI `skills`** (Claude Code, Cursor, Codex, Copilot, Windsurf e outros):

```bash
npx skills add GreatSoftwares/greatpages-skills
```

**Claude Code, como plugin:**

```
/plugin marketplace add GreatSoftwares/greatpages-skills
/plugin install greatpages@greatpages-skills
```

**Claude Code, cópia manual** (todos os projetos ou só o atual):

```bash
git clone https://github.com/GreatSoftwares/greatpages-skills.git
cp -R greatpages-skills/skills/greatpages-landing-page ~/.claude/skills/     # ou .claude/skills/
```

**claude.ai:** Settings → Capabilities → Skills → enviar a pasta `skills/greatpages-landing-page`
compactada em .zip.

**Outros clientes:** copie a pasta para o diretório de skills do cliente (`.cursor/skills/`,
`.codex/skills/`, `.github/skills/`).

## Usar

Peça ao agente algo como:

> Quero uma página para minha clínica de fisioterapia em Sorocaba, para a pessoa agendar pelo WhatsApp.

A skill guia o agente por brief, projeto, design e copy, HTML, import, publicação e domínio, e
devolve a URL no ar. Ajustes depois seguem o ciclo ler → editar → sincronizar → republicar,
sempre com a sua confirmação antes de mudar o que está no ar.

## O que tem na skill

```
skills/greatpages-landing-page/
├── SKILL.md                      fluxo, regras, checklists e exemplo
├── references/
│   ├── mcp-setup.md              conectar o MCP em cada cliente
│   ├── mcp-workflow.md           roteiro tool a tool: projeto, import, publish, domínio, A/B
│   ├── html-rules.md             o HTML que a plataforma aceita: forms, conversão, limites
│   ├── design.md                 hierarquia, tipografia, cor, espaçamento, responsivo
│   └── copy-e-secoes.md          estrutura e copy por tipo de página, com dados de conversão
├── scripts/
│   └── check-html.mjs            validador sem dependências: node check-html.mjs index.html
└── templates/
    ├── captura.html              isca digital com formulário no hero
    ├── vendas.html               página de vendas longa com checkout externo
    ├── servico-whatsapp.html     serviço local com WhatsApp
    └── evento.html               webinar ou evento com inscrição e programação
```

## Contribuir

Issues e pull requests são bem-vindos: erro na referência, template novo, cliente que não
está no guia de conexão. Mudanças no contrato do HTML (o que a plataforma aceita) vêm da
equipe do GreatPages, porque espelham o código da plataforma.

## Licença

[MIT](LICENSE). Os templates podem ser usados em qualquer página, no GreatPages ou fora dele.
