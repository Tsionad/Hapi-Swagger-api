const hapi = require('hapi');

const server = hapi.server({
  port: 3000,
  host: 'localhost',
});

const init = async () => {
  server.route({
    method: 'GET',
    path: '/',
    handler: function(req, res) {
      return `<h1> My Hapi Swagger modern api </h1>`;
    }
  });

  await server.start();
  console.log(`Server is running at: ${server.info.uri}`);
};

init();
