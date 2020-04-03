import * as clientService from './clientService.js';

export const addClient = (req, res) => {
  const { clientId } = req.params;
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  res.writeHead(200, headers);
  clientService.addClient(clientId,
    {
      id: clientId,
      send: (data) => res.write(JSON.stringify(data)),
    });
};
