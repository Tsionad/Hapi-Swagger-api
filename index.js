// Import dependencies
const hapi = require('hapi');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');


// Mongoose configuration
mongoose.Promise = global.Promise; // Allows use of native promises with mongoose
mongoose
  .connect(
    process.env.DB_URI, // DB URI from .env file
    { useNewUrlParser: true } // Resolves deprecation warning
  )
  .then(console.log('Connected to database.'));

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
