const axios = require('axios');
const data = require('./testData.js');

axios.defaults.baseURL = 'http://localhost:3000';

test('Query for products works', async() => {
  const res =  await axios.get('/products')
  expect(res.data).toEqual(data.products)
});

test('Query for a single product works', async() => {
  const res =  await axios.get('/products/1')
  expect(res.data).toEqual(data.product)
})

test('Query for product styles works', async() => {
  const res =  await axios.get('/products/1/styles')
  expect(res.data).toEqual(data.styles)
})

test('Query for related products works', async() => {
  const res =  await axios.get('/products/1/related')
  expect(res.data).toEqual(data.related)
})







