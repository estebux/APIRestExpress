const express = require('express');
const faker = require('faker');

const router = express.Router();

app.get('/',(req, res) => {
  const { limit, offset } = req.query;
  if(limit && offset){
    res.json({
      limit,
      offset
    });
  }
  else{
    res.send('NO hay parametros');
  }});

  module.exports = router;
