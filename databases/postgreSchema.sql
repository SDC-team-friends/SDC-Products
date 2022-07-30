DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

\c products;

DROP TABLE IF EXISTS products, features, styles, related, photos, skus;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  category VARCHAR(255) NOT NULL,
  default_price VARCHAR(50) NOT NULL
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  feature VARCHAR(100) NOT NULL,
  value VARCHAR(255) NOT NULL,
  CONSTRAINT fk_product_feature
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  sale_price VARCHAR(50) NOT NULL,
  original_price VARCHAR(50) NOT NULL,
  default_style BOOLEAN NOT NULL,
  CONSTRAINT fk_product_style
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  CONSTRAINT fk_product_related
    FOREIGN KEY(current_product_id)
      REFERENCES products(id)
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  style_id INT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  CONSTRAINT fk_style_photo
   FOREIGN KEY(style_id)
     REFERENCES styles(id)
);

CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  style_id INT NOT NULL,
  size VARCHAR(20) NOT NULL,
  quantity INT NOT NULL,
  CONSTRAINT fk_style_sku
    FOREIGN KEY(style_id)
      REFERENCES styles(id)
);


COPY products
  FROM '/Users/jpg/Documents/RFP2205/SDC-Example-Data/product.csv'
  DELIMITER ','
  CSV HEADER;

COPY features
  FROM '/Users/jpg/Documents/RFP2205/SDC-Example-Data/features.csv'
  DELIMITER ','
  CSV HEADER;

COPY styles
  FROM '/Users/jpg/Documents/RFP2205/SDC-Example-Data/styles.csv'
  DELIMITER ','
  CSV HEADER;

COPY related
  FROM '/Users/jpg/Documents/RFP2205/SDC-Example-Data/related.csv'
  DELIMITER ','
  CSV HEADER
  WHERE related_product_id != 0;

COPY photos
  FROM '/Users/jpg/Documents/RFP2205/SDC-Example-Data/photos.csv'
  DELIMITER ','
  CSV HEADER;

COPY skus
  FROM '/Users/jpg/Documents/RFP2205/SDC-Example-Data/skus.csv'
  DELIMITER ','
  CSV HEADER;