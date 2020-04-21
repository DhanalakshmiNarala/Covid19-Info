const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../config/dev.env') });

const port = process.env.SERVER_PORT || 5000;
const app = require('./app');

if (process.env.NODE_ENV !== 'testing') {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
}

module.exports = app;
