const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const app = express();
const port = 3001;
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Rest Express",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:" + port,
      }
    ]
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
}

app.use(express.json());
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/NuevaRuta', (req, res) => {
  res.send('Hola soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,() => {
  console.log('Mi port: ' + port);
});
