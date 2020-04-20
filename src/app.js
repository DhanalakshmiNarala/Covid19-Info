const express = require('express');
const app = express();
const morgan = require('morgan');

const userRoutes = require('./routes/user');
const authenticationRoutes = require('./routes/authentication');

const { authorize } = require('./controllers/authentication');

app.use(morgan('dev'));
app.use(express.json());

//Handling CORS errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/signUp', userRoutes);
app.use('/auth', authenticationRoutes);

app.use(authorize);

app.use((req, res, next) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
    },
  });
});

module.exports = app;
