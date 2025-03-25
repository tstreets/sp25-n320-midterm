const http = require("http");

const WebFile = require("./functions/webfile");

/**
 *
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function app(req, res) {
  const webFile = new WebFile(req.url);

  res.writeHead(200, { "Content-Type": webFile.getMimeType() });
  console.log(webFile.getMimeType());
  res.write(webFile.getFileToRender());
  res.end();
}

const server = http.createServer(app);

const port = process.env.PORT || 3000;
server.listen(port);

console.log(`Server: http://localhost:${port}`);
