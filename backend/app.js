let express = require('express');
let app = express();
let config = require('./config/config');

require('./config/express.config')(app);
require('./config/mongoose.config')(config);

module.exports = app;