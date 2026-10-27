# Conectar o MCP do GreatPages

O servidor fala **MCP sobre HTTP** com **OAuth 2.1**. Não existe token para copiar: na primeira
chamada o agente abre o navegador, a pessoa faz login no GreatPages e escolhe as permissões.
As permissões valem para a conta daquele login.

| Ambiente | URL |
|----------|-----|
| Produção | `https://mcp.greatpages.com.br/mcp` |
| Whitelabel | `https://mcp.<dominio-do-whitelabel>/mcp` |

Requisito: uma conta GreatPages (gratuita serve; o plano gratuito publica em subdomínio
gratuito). Criar conta: https://greatpages.com.br

## Permissões que esta skill usa

Na tela de autorização todas vêm ligadas. Para o fluxo completo precisam estar ligadas:

| Permissão | Para que |
|-----------|----------|
| `pages:read` | `pages_list`, `pages_get`, `pages_html_get`, `projects_list` |
| `pages:write` | `pages_import_html`, `pages_html_sync`, `pages_create`, testes A/B |
| `pages:publish` | `pages_publish`, `pages_unpublish`, iniciar e pausar testes A/B |
| `projects:write` | `projects_create` |
| `domains:read` e `domains:write` | `domains_list`, `domains_create`, `domains_ssl_refresh` |
| `leads:read` | `leads_list` |
| `analytics:read` | `analytics_page` |

Perfil **Visualizador** não vê nada de escrita. **Colaborador** só alcança os projetos em que
está. Se uma tool esperada não aparece, é permissão desligada ou perfil sem acesso: reconectar
e ligar o toggle resolve o primeiro caso.

## Claude Code

```bash
claude mcp add --scope user --transport http greatpages https://mcp.greatpages.com.br/mcp
```

Na primeira tool chamada o navegador abre sozinho. `claude mcp list` mostra o estado; "Needs
authentication" antes do login é normal.

## Cursor

`~/.cursor/mcp.json` (global) ou `.cursor/mcp.json` (projeto):

```json
{
  "mcpServers": {
    "greatpages": { "url": "https://mcp.greatpages.com.br/mcp" }
  }
}
```

Reinicie o Cursor. Em Settings → MCP o servidor aparece com um botão de login.

## VS Code (GitHub Copilot)

`.vscode/mcp.json` ou o comando "MCP: Add Server":

```json
{
  "servers": {
    "greatpages": { "type": "http", "url": "https://mcp.greatpages.com.br/mcp" }
  }
}
```

## claude.ai

Settings → Connectors → Add custom connector → colar `https://mcp.greatpages.com.br/mcp`. O
login acontece no navegador. Sem terminal, o agente envia o HTML em texto (argumento `html`),
nunca por .zip.

## Windsurf, Zed, Cline e outros

Mesmo formato do Cursor, mudando o arquivo:

| Cliente | Arquivo |
|---------|---------|
| Windsurf | `~/.codeium/windsurf/mcp_config.json` |
| Cline | `cline_mcp_settings.json`, pela UI da extensão |
| Zed | `~/.config/zed/settings.json`, em `context_servers` |

Se o cliente pedir `type` ou `transport`, o valor é `http` (às vezes `streamable-http`).
Nunca `sse` nem `stdio`.

## Conferir

Peça ao agente "liste minhas páginas do GreatPages". Ele chama `pages_list` e traz as páginas
da conta. Se vier vazio em conta nova, tudo bem: o próximo passo é criar.

## Problemas comuns

- **Navegador não abre.** Chame qualquer tool: o fluxo começa na primeira chamada. Em servidor
  remoto sem navegador, fixe a porta com `--callback-port` e faça túnel.
- **Tela de login de novo.** O token expira em 1 hora e renova sozinho; se o grant foi revogado
  ou as permissões mudaram, o login repete uma vez.
- **Quem conectou antes de `pages:publish` existir** precisa reautorizar para publicar pelo agente.
