const cors_anywhere = require("cors-anywhere");

const host = "localhost";
const port = 8080;

const proxy = cors_anywhere.createServer({
  originWhitelist: [], // Permitir todos os domínios
  requireHeader: ["origin", "x-requested-with"],
  removeHeaders: ["cookie", "cookie2"],
});

proxy.listen(port, host, () => {
  console.log(`Servidor proxy CORS em execução em http://${host}:${port}`);
});
