# GreatPages Skills

Skills para agentes de IA criarem e publicarem páginas no [GreatPages](https://greatpages.com.br),
a plataforma de landing pages com hospedagem, leads, conversões, testes A/B e domínio.

Uma skill é uma pasta com um `SKILL.md` no formato aberto [Agent Skills](https://agentskills.io):
o agente lê e passa a saber fazer a tarefa do jeito certo. Funciona em Claude Code, claude.ai,
Cursor, Codex, GitHub Copilot, Windsurf e qualquer outro cliente compatível.

| Skill | O que faz |
|-------|-----------|
| [`greatpages-landing-page`](skills/greatpages-landing-page/SKILL.md) | Cria, refaz, ajusta e avalia landing pages de alta conversão e publica no GreatPages pelo MCP. Deriva a identidade visual do público em vez do visual padrão de IA, escreve a copy inteira antes do HTML, critica o resultado com nota antes de publicar, e entrega formulário que vira lead, WhatsApp contado como conversão, SEO no `<head>` e domínio. |

## Como funciona

Você instala a skill; o resto o agente faz. As skills agem na sua conta pelo
[servidor MCP oficial do GreatPages](https://mcp.greatpages.com.br/mcp), e a própria skill
instala o MCP no seu cliente quando ele ainda não está lá: no Claude Code é um comando, no
Cursor e no VS Code é uma entrada no arquivo de MCP. Não há token para copiar: na primeira
chamada o navegador abre, você faz login no GreatPages e escolhe as permissões.

Precisa de uma conta GreatPages; a gratuita publica em subdomínio gratuito. Para conectar o
MCP por conta própria ou em outro cliente, veja
[references/mcp-setup.md](skills/greatpages-landing-page/references/mcp-setup.md).

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
├── SKILL.md                      modos (criar, refazer, ajustar, avaliar, publicar), fluxo, regras, exemplo
├── references/
│   ├── mcp-setup.md              instalar e conectar o MCP em cada cliente, feito pelo agente
│   ├── mcp-workflow.md           roteiro tool a tool: projeto, import, publish, domínio, leads, A/B
│   ├── html-rules.md             o HTML que a plataforma aceita: forms que viram lead, conversão, limites
│   ├── direcao.md                de onde vem o visual: mundo do público, rut recusado, cor, tipo, contrato
│   ├── design.md                 piso de qualidade: tipografia, cor, espaço, layout, controles, movimento
│   ├── copy-e-secoes.md          dados de conversão, primeira tela, CTA, prova, estruturas por objetivo
│   └── critica.md                os três testes, nota por critério, piso mecânico, relatório de avaliação
```

## Contribuir

Issues e pull requests são bem-vindos: erro na referência, cliente que não está no guia de
conexão, seção que falta no guia de copy. Mudanças no contrato do HTML (o que a plataforma
aceita) vêm da equipe do GreatPages, porque espelham o código da plataforma.

## Licença

[MIT](LICENSE).
