const db = require('./db-connect');

function allWines(tableName, callback) {
  db.any(`SELECT * FROM ${tableName}`)
    .then(function(result) {
      callback(null, result);
    })
    .catch(function (err) {
      callback(err);
    });
}

function singleWine(tableName, id, callback) {
  db.any(`SELECT * FROM ${tableName} WHERE id = ${id}`)
  .then(function(result) {
    if (result.length) {
      callback(null, result);
    } else {
      callback('That wine doesn\'t exist.');
    }
  })
  .catch(function(err) {
    callback(err);
  });
}

function addWine(tableName, wineObj, callback) {
  db.any(`INSERT INTO ${tableName} (name, region, year, price, notes, rating) VALUES('${wineObj.name}', '${wineObj.region}', ${wineObj.year}, ${wineObj.price}, '${wineObj.notes}', ${wineObj.rating})`)
  .then((result) => {
    callback(null, `${wineObj.name} was added to the inventory!`);
  })
  .catch((err) => {
    callback(err);
  });
}

function updateWine(tableName, id, updateWine, callback) {
  const newWine = {};
  db.any(`SELECT * FROM ${tableName} WHERE id=${id}`)
    .then(function(wine) {
      wine = wine[0];
      for (var key in updateWine) {
        if (updateWine[key]) {
          newWine[key] = updateWine[key];
        } else {
          newWine[key] = wine[key];
        }
      }
      for (key in newWine) {
        db.any(`UPDATE ${tableName} SET ${key} = ${newWine[key]} WHERE id = ${id}`);
      }
      callback(null, newWine);

    }).catch(function(err) {
      callback(err);
    });

}

function deleteWine (tableName, id, callback) {
  db.any(`DELETE FROM ${tableName} WHERE id = ${id}`)
  .then(function(result) {
    if (result.length) {
      callback(null, 'That wine was deleted.');
    } else {
      callback('That wine doesn\'t exist.');
    }
  })
  .catch(function(err) {
    callback(err);
  });
}

module.exports = {
  allWines,
  singleWine,
  addWine,
  updateWine,
  deleteWine
};
