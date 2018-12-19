// Import dependencies
const hapi = require('hapi');
const mongoose = require('mongoose');

const Painting = require('./models/Painting');

// Mongoose configuration
mongoose.connect('mongodb://test:testing123@ds249565.mlab.com:49565/hapi-swagger-api');

mongoose.connection.once('open', () => {
  console.log('connected to database');
});


const server = hapi.server({
  port: 4000,
  host: 'localhost',
});


const init = async () => {
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (req, res) => {
        return `<h1> My Hapi Swagger modern api </h1>`;
      },
    },
    {
      method: 'GET',
      path: '/api/v1/paintings',
      handler: (req, res) => Painting.find(),
    },
    {
      method: 'POST',
      path: '/api/v1/paintings',
      handler: (req, res) => {
        const { name, url, techniques } = req.payload;
        const painting = new Painting({
          name,
          url,
          techniques,
        });

        return painting.save();
      },
    },
  ]);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unHandledRejection', (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

init();
