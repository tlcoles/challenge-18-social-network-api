const { connect, connection } = require('mongoose');

//! Look at exercise 13 for connection details
connect('mongodb://localhost/developersApplications', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;