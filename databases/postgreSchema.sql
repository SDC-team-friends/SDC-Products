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
  feature VARCHAR(100) NOT NULL,
  value VARCHAR(255) NOT NULL,
  product_id INT NOT NULL,
  CONSTRAINT fk_product_feature
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  original_price VARCHAR(50) NOT NULL,
  sale_price VARCHAR(50) NOT NULL,
  default_style BOOLEAN NOT NULL,
  product_id INT NOT NULL,
  CONSTRAINT fk_product_style
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  related_id INT NOT NULL,
  current_id INT NOT NULL,
  CONSTRAINT fk_product_related
    FOREIGN KEY(current_id)
      REFERENCES products(id)
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  style_id INT NOT NULL,
  CONSTRAINT fk_style_photo
   FOREIGN KEY(style_id)
     REFERENCES styles(id)
);

CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  quantity INT NOT NULL,
  size VARCHAR(20) NOT NULL,
  style_id INT NOT NULL,
  CONSTRAINT fk_style_sku
    FOREIGN KEY(style_id)
      REFERENCES styles(id)
);
