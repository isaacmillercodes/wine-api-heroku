DROP DATABASE IF EXISTS wine_cellar;
CREATE DATABASE wine_cellar;

\c wine_cellar;

DROP TABLE IF EXISTS wines;

CREATE TABLE wines(
  id serial PRIMARY KEY,
  name varchar(255),
  region varchar(255),
  year integer,
  price float,
  notes varchar(255),
  rating integer
);

INSERT INTO wines (name, region, year, price, notes, rating)
  VALUES('Sweet Berry Wine', 'California', 2005, 5.99, 'A Steve Brule Classic', 78);
