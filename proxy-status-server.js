#!/usr/bin/env node
const http = require('http');
const net = require('net');
const dns = require('dns').promises;

const PORT = parseInt(process.env.PORT || '8765', 10);

function parseProxyUrl(url) {
  try {
    const u = new URL(url);
    return { host: u.hostname, port: parseInt(u.port || '80', 10) };
  } catch {
    return null;
  }
}

function getCheckTarget() {
  const url = process.env.PROXY_URL || process.env.REACT_APP_PROXY_URL;
  if (url) {
    const parsed = parseProxyUrl(url);
    if (parsed) return { host: parsed.host, port: 80 };
  }
  const host = process.env.PROXY_HOST || 'home.ddns.phitik.com';
  const port = parseInt(process.env.PROXY_PORT || '80', 10);
  return { host, port };
}

function checkTcp(host, port, timeoutMs = 5000) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const timer = setTimeout(() => {
      socket.destroy();
      resolve(false);
    }, timeoutMs);
    socket.on('connect', () => {
      clearTimeout(timer);
      socket.destroy();
      resolve(true);
    });
    socket.on('error', () => {
      clearTimeout(timer);
      resolve(false);
    });
    socket.connect(port, host);
  });
}

async function checkProxy() {
  const { host, port } = getCheckTarget();
  try {
    const ips = await dns.resolve4(host);
    const ip = ips && ips[0];
    if (!ip) return { online: false, host, port, step: 'dns', error: 'no IP' };
    const online = await checkTcp(ip, port);
    return { online, host, port, ip };
  } catch (err) {
    return { online: false, host, port, step: 'dns', error: err.message };
  }
}

const server = http.createServer(async (req, res) => {
  if (req.url !== '/' && req.url !== '/api/proxy-status') {
    res.writeHead(404);
    res.end();
    return;
  }
  const result = await checkProxy();
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(result));
});

server.listen(PORT, () => {
  console.log(`Proxy status server: resolve host → IP, then TCP check port. http://localhost:${PORT}`);
});
