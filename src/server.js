const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../config/dev.env') });

const port = process.env.SERVER_PORT || 5000;
const app = require('./app');

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;
