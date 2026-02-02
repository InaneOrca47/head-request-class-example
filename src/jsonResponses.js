// Note this object is purely in memory.
// It will be reset each time the server restarts.
const users = {};
let userCount = 0;

const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);

  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  }
  // Allows for head or content requests
  // send head
  response.writeHead(status, headers);
  if (request.method !== 'HEAD') {
    // if it isn't head, send content
    response.write(content);
  }
  response.end();
};

const getUsers = (request, response) => {
  return respondJSON(request, response, 200, { users });
};

const updateUser = (request, response) => {
  const newUser = {
    createdAt: Date.now(),
  };

  users[userCount] = newUser;
  userCount++;

  return respondJSON(request, response, 201, newUser);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  }

  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getUsers,
  updateUser,
  notFound,
};
