const clients = {};

export const addClient = (clientId, client) => {
  clients[clientId] = client;
};

export const sendDataToClient = (clientId, data) => {
  if (clients[clientId]) {
    clients[clientId].send(data);
  }
};
