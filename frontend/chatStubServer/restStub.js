const http = require('http');
const uuidv4 = require('uuid/v4');

const port = 8080;
const requestHandler = (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.writeHead(200, {"Content-Type": "application/json"});
  response.end(JSON.stringify({ gameUUID: uuidv4() }));
};
const server = http.createServer(requestHandler);
server.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
