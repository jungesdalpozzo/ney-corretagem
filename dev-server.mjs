// Servidor local sem dependências: serve a pasta ./dist (com suporte a vídeo e página 404).
import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('./dist', import.meta.url)));
const PORT = Number(process.env.PORT) || 5173;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2'
};

async function send(res, file, status, req) {
  const s = await stat(file);
  const type = TYPES[extname(file).toLowerCase()] || 'application/octet-stream';
  const range = req.headers.range && /bytes=(\d*)-(\d*)/.exec(req.headers.range);
  if (range && status === 200) {
    const start = range[1] ? Number(range[1]) : 0;
    const end = range[2] ? Math.min(Number(range[2]), s.size - 1) : s.size - 1;
    res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${s.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1, 'Cache-Control': 'no-store' });
    return createReadStream(file, { start, end }).pipe(res);
  }
  res.writeHead(status, { 'Content-Type': type, 'Content-Length': s.size, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store' });
  createReadStream(file).pipe(res);
}

http.createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = resolve(join(ROOT, normalize(path)));
    if (file !== ROOT && !file.startsWith(ROOT + sep)) { res.writeHead(403).end('Forbidden'); return; }
    let s = await stat(file).catch(() => null);
    if (s?.isDirectory()) { file = join(file, 'index.html'); s = await stat(file).catch(() => null); }
    if (!s) return send(res, join(ROOT, '404.html'), 404, req);
    return send(res, file, 200, req);
  } catch {
    res.writeHead(500).end('Erro interno');
  }
}).listen(PORT, () => console.log(`\n  Ney Corretagem rodando em  http://localhost:${PORT}\n  (Ctrl+C para parar)\n`));
