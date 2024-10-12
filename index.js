const express = require('express');
const routerApi = require('./routes');

const app = express();

const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/NuevaRuta', (req, res) => {
  res.send('Hola soy una nueva ruta');
});

routerApi(app);

app.listen(port,() => {
  console.log('Mi port' + port);
});
