const express = require('express');
const router = express.Router();

const queries = require('../db/queries');

router.get('/', function (req, res, next) {
  queries.allWines('wines', function(err, result) {
    if (err) {
      next(err);
    } else {
      res.status(200).json(result);
    }
  });
});

router.get('/:id', function (req, res, next) {
  const wineID = parseInt(req.params.id);
  queries.singleWine('wines', wineID, function (err, result) {
    if (err) {
      res.status(422).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

router.post('/', function(req, res, next) {
  const newWine = req.body;
  newWine.price = parseFloat(newWine.price);
  newWine.rating = parseInt(newWine.rating);
  newWine.year = parseInt(newWine.year);

  queries.addWine('wines', newWine, function(err, result) {
    if (err) {
      res.status(422).json(err);
    } else {
      res.status(201).json(result);
    }
  });
});

router.put('/:id', function (req, res, next) {
  const wineID = parseInt(req.params.id);
  const wine = req.body;

  const updateWine = {
    name: wine.name || null,
    region: wine.region || null,
    year: parseInt(wine.year) || null,
    price: parseFloat(wine.price) || null,
    notes: wine.notes || null,
    rating: parseInt(wine.rating) || null
  };

  queries.updateWine('wines', wineID, updateWine, function(err, result) {
    if (err) {
      res.status(422).json(err);
    } else {
      res.status(200).json(result);
    }
  });

});

router.delete('/:id', function (req, res, next) {
  const wineID = parseInt(req.params.id);
  queries.deleteWine('wines', wineID, function (err, result) {
    if (err) {
      res.status(422).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
