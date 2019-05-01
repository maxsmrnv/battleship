const http = require('http');
const uuidv4 = require('uuid/v4');

const port = 3001;
const requestHandler = (request, response) => {
  response.end(JSON.stringify({ battleUUID: uuidv4() }));
};
const server = http.createServer(requestHandler);
server.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
