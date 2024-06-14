'use strict';

var express = require('express');
var router = express.Router();
var data = [
  {
    image: '<img src="https://media.istockphoto.com/id/503568727/pt/foto/sinal-em-branco-de-explora%C3%A7%C3%A3o-de-gato-malhado.jpg?s=1024x1024&amp;w=is&amp;k=20&amp;c=AMJd0aeJVcLDZfOzWfvjzpgun0XyW8XoM-hGGKmSqGE=" alt="Car Image" style="max-width:100px;">',
    brandModel: 'Amarelo',
    year: '2022',
    plate: 'CAT-420',
    color: 'Laranja'
  }
];

router.get('/', function(req, res) {
  res.json(data);
});
router.get('/cars', function(req, res) {
  res.json(data);
});
router.post('/cars', function(req, res) {
  data.push({
    image: req.body.image,
    brandModel: req.body.brandModel,
    year: req.body.year,
    plate: req.body.plate,
    color: req.body.color 
  });
  res.json({ message: 'success' });
});

module.exports = router;
