# Instalar e conectar o MCP do GreatPages

Esta skill depende do servidor MCP do GreatPages. Se as tools `pages_*` não estão disponíveis,
**instale você mesmo**: é um comando ou um arquivo de configuração, e a pessoa só precisa fazer
login no navegador. Não mande a pessoa "configurar o MCP" por conta própria.

| Ambiente | URL do servidor |
|----------|-----------------|
| Produção | `https://mcp.greatpages.com.br/mcp` |
| Whitelabel | `https://mcp.<dominio-do-whitelabel>/mcp` |

Transporte **HTTP** (alguns clientes chamam de `streamable-http`). Nunca `sse` nem `stdio`.
Autenticação **OAuth 2.1**: não existe token para pedir à pessoa; o login abre no navegador na
primeira chamada. Requisito: uma conta GreatPages (a gratuita serve e publica em subdomínio
gratuito; criar em https://greatpages.com.br).

## Roteiro

1. **Descubra o cliente** em que você está rodando (tabela abaixo). Na dúvida, pergunte em uma
   linha: "Você está no Claude Code, Cursor, VS Code, claude.ai ou outro?".
2. **Instale** com o comando ou o arquivo do cliente. Em arquivo JSON existente, **acrescente**
   a entrada `greatpages` sem apagar os outros servidores.
3. **Carregue** o servidor: alguns clientes só enxergam servidor novo depois de reconectar.
   No Claude Code, `/mcp` lista e reconecta; se as tools não aparecerem, peça para a pessoa
   reiniciar a sessão e chamar a skill de novo.
4. **Dispare o login** chamando uma tool leve, `projects_list`. O navegador abre; peça para a
   pessoa entrar na conta e **deixar ligadas** as permissões de páginas (leitura, escrita e
   publicação), domínios e projetos. O token vale 1 hora e renova sozinho.
5. **Confira** chamando `projects_list` de novo. Com a lista na mão, volte ao fluxo da skill.

## Por cliente

| Cliente | Como saber | O que fazer |
|---------|------------|-------------|
| Claude Code | Você tem terminal e o comando `claude` existe | Rodar o comando abaixo |
| Cursor | Pasta `.cursor/` no projeto ou `~/.cursor/` | Editar `mcp.json` |
| VS Code com Copilot | Pasta `.vscode/` e sem `.cursor/` | Editar `.vscode/mcp.json` |
| Windsurf | `~/.codeium/windsurf/` | Editar `mcp_config.json` |
| Zed | `~/.config/zed/` | Editar `settings.json` |
| Cline | Extensão no VS Code | Editar `cline_mcp_settings.json` pela UI da extensão |
| claude.ai | Sem terminal e sem arquivos | Pedir para a pessoa adicionar o conector |
| Outro com terminal | Formato do Cursor costuma servir | Editar o arquivo de MCP do cliente |

### Claude Code

```bash
claude mcp add --scope user --transport http greatpages https://mcp.greatpages.com.br/mcp
```

`--scope user` deixa disponível em todos os projetos; sem ele, só no diretório atual. Depois,
`claude mcp list` mostra `greatpages` como "Needs authentication": é o esperado antes do login.
Na sessão aberta, use `/mcp` para conectar; se as tools não aparecerem, a pessoa reinicia a
sessão. Remover: `claude mcp remove greatpages`.

### Cursor

`~/.cursor/mcp.json` (todos os projetos) ou `.cursor/mcp.json` (só este). Acrescente:

```json
{
  "mcpServers": {
    "greatpages": { "url": "https://mcp.greatpages.com.br/mcp" }
  }
}
```

Em Settings → MCP o servidor aparece com um botão de login; a pessoa clica e autoriza. O
retorno do login é `cursor://anysphere.cursor-mcp/oauth/callback`, aceito pelo servidor.

### VS Code (GitHub Copilot)

`.vscode/mcp.json` no projeto, ou o comando "MCP: Add Server" na paleta:

```json
{
  "servers": {
    "greatpages": { "type": "http", "url": "https://mcp.greatpages.com.br/mcp" }
  }
}
```

### Windsurf, Zed, Cline e outros

Mesmo JSON do Cursor, no arquivo do cliente:

| Cliente | Arquivo |
|---------|---------|
| Windsurf | `~/.codeium/windsurf/mcp_config.json` |
| Zed | `~/.config/zed/settings.json`, dentro de `context_servers` |
| Cline | `cline_mcp_settings.json`, pela UI da extensão |

Se o cliente pedir `type` ou `transport`, o valor é `http`.

### claude.ai

Não há arquivo para editar. Diga à pessoa, com estas palavras: "Em Settings → Connectors →
Add custom connector, cole `https://mcp.greatpages.com.br/mcp` e faça login. Depois me avise
que eu continuo." Sem terminal, o HTML vai em texto no argumento `html` das tools, nunca por .zip.

## Permissões que a skill usa

Na tela de autorização todas vêm ligadas. O fluxo completo precisa de:

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
está. Se uma tool esperada não aparece, é permissão desligada ou perfil sem acesso: reconectar e
ligar o toggle resolve o primeiro caso; o segundo é com o dono da conta.

## Problemas comuns

- **Navegador não abre.** Chame qualquer tool: o fluxo começa na primeira chamada. Em servidor
  remoto sem navegador, no Claude Code use `--callback-port` para fixar a porta e faça túnel.
- **Tela de login de novo.** O token expira em 1 hora e renova sozinho; se o grant foi revogado
  ou as permissões mudaram, o login repete uma vez.
- **Link de autorização expirou.** O fluxo vale 10 minutos; chame a tool de novo.
- **Servidor instalado e tools ausentes.** O cliente ainda não recarregou: `/mcp` no Claude
  Code, reiniciar o Cursor, ou reiniciar a sessão.
- **Quem conectou antes de `pages:publish` existir** precisa reautorizar para publicar pelo agente.
