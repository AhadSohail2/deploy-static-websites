const express = require("express");
const httpProxy = require("http-proxy");


const app = express();

const proxy = httpProxy.createProxyServer();

const BASE_PATH = "https://vercel-clone-ahad.s3.us-east-1.amazonaws.com/__outputs"

app.use((req, res) => {
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];

    const resolvesTo = `${BASE_PATH}/${subdomain}`

    return proxy.web(req, res, { target: resolvesTo, changeOrigin: true })

})

proxy.on('proxyReq', (proxyReq, req, res) => {
    const url = req.url;
    if (url === '/')
        proxyReq.path += 'index.html'

})

app.listen(8000, () => {
    console.log("Server started on port 8000");
});