const express = require('express');


const productsRouter = require('./products.router');
//const categoriesRouter = require('./categories.router');
//const usersRouter = require('/.users.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  app.use('/products', productsRouter);

}

module.exports = routerApi;
