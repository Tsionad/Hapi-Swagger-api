// Import dependencies
const hapi = require('hapi');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

const Painting = require('./models/Painting');


// Mongoose configuration
mongoose.Promise = global.Promise; // Allows use of native promises with mongoose
mongoose
  .connect(
    process.env.DB_URI, // DB URI from .env file
    { useNewUrlParser: true }, // Resolves deprecation warning
  )
  .then(console.log('Connected to database.'));

const server = hapi.server({
  port: 3000,
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
  console.log(`Server is running at: ${server.info.uri}`);
};

init();
