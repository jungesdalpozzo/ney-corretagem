# Portal dos Sonhos Capital Imobiliário — site

Site institucional e catálogo de imóveis rurais da **Portal dos Sonhos Capital Imobiliário**, com o corretor **Valdinei Gonçalves (Ney)**, em Cunha-SP e região.
Site 100% estático (HTML, CSS e JavaScript puros), sem dependências e sem etapa de build.

## Estrutura

```
dist/                 ← tudo que vai para o ar
  index.html          página inicial (coleção, temporada, vídeo, corretor, contato)
  imovel.html         página imersiva de cada imóvel (imovel.html?id=<slug>)
  404.html            página de erro
  data.js             DADOS DOS IMÓVEIS (textos, números, fotos, vídeo)
  home.css / home.js  estilo e comportamento da página inicial
  imovel.css / .js    estilo e comportamento da página do imóvel
  assets/
    imoveis/<slug>/g  fotos otimizadas (grandes)
    imoveis/<slug>/t  miniaturas
    video/            vídeo da Fazenda Vida Nova (completo + loop de fundo)
    fonts/            fontes hospedadas no próprio site
dev-server.mjs        servidor local (npm run dev)
Dockerfile, nginx.conf  publicação na VPS
originais/            fotos e vídeo brutos (NÃO vão para o GitHub)
_arquivo/             versões antigas e rascunhos (NÃO vão para o GitHub)
```

## Rodar no computador

Requer Node 18 ou superior.

```bash
npm run dev
```

Abra http://localhost:5173

## Adicionar ou editar um imóvel

1. Otimize as fotos (JPG, lado maior até 1600 px) e coloque em `dist/assets/imoveis/<slug>/g/`, com miniaturas de 720 px em `.../t/`.
2. Em `dist/data.js`, copie o bloco de um imóvel existente e ajuste `slug`, textos, números, `cover`, `chapters` e `gallery`.
3. O imóvel aparece automaticamente na página inicial, no menu do rodapé e ganha a página `imovel.html?id=<slug>`.

## Subir para o GitHub

Crie um repositório vazio no GitHub (ex.: `ney-corretagem`) e, dentro desta pasta:

```bash
git add -A
git commit -m "Site Portal dos Sonhos"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/ney-corretagem.git
git push -u origin main
```

O `.gitignore` já deixa de fora os originais pesados (o vídeo bruto tem 169 MB e o GitHub recusa arquivos acima de 100 MB).

## Publicar na hospedagem Hostinger (hPanel) via GitHub

O arquivo `.htaccess` na raiz faz o servidor entregar o conteúdo de `dist/` e bloqueia o acesso ao `.git` e aos arquivos internos.

1. No hPanel, abra o site → **Gerenciador de Arquivos** → `public_html` e **apague tudo** que estiver lá (o deploy por Git exige a pasta vazia).
2. No hPanel → **Avançado → GIT**:
   - **Repositório:** `https://github.com/SEU-USUARIO/ney-corretagem.git` (repositório público)
     ou `git@github.com:SEU-USUARIO/ney-corretagem.git` (privado: copie a chave SSH mostrada no hPanel e adicione em GitHub → Settings → Deploy keys)
   - **Branch:** `main`
   - **Diretório:** deixe em branco (instala em `public_html`)
   - Clique em **Criar** e depois em **Implantar**.
3. **Deploy automático (opcional):** no mesmo painel, ative *Implantação automática*, copie a URL do webhook e cole em GitHub → Settings → Webhooks → Add webhook.

Daí em diante, cada `git push` publica o site.

## Publicar na VPS (Hostinger)

### Opção A — EasyPanel (recomendado)

1. No EasyPanel, crie um **App** e em *Source* escolha **GitHub**, apontando para o repositório e a branch `main`.
2. Em *Build*, escolha **Dockerfile** (o arquivo já está na raiz).
3. Em *Domains*, adicione um domínio provisório apontando para a porta **80** do container, por exemplo
   `ney.179-197-235-218.sslip.io` (troque pelo IP da sua VPS) ou o hostname que a Hostinger fornece.
4. Clique em **Deploy**. A cada `git push`, basta clicar em Deploy de novo (ou ativar o deploy automático).

### Opção B — Docker direto na VPS

```bash
git clone https://github.com/SEU-USUARIO/ney-corretagem.git
cd ney-corretagem
docker build -t ney-site .
docker run -d --name ney-site --restart unless-stopped -p 8080:80 ney-site
```

O site fica em `http://IP-DA-VPS:8080`. Para atualizar: `git pull && docker build -t ney-site . && docker rm -f ney-site` e rode o `docker run` de novo.

### Opção C — nginx já instalado na VPS

Copie o conteúdo de `dist/` para a pasta do site (ex.: `/var/www/ney`) e use o bloco de `nginx.conf` trocando `root` por essa pasta.

## Antes de divulgar

- Confirmar com o Ney os textos da seção "O corretor" e os números de cada imóvel.
- Quando houver domínio definitivo, atualizar as tags `og:image` com a URL completa e ativar HTTPS (o EasyPanel faz isso sozinho).
