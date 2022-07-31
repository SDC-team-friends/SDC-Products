import http from 'k6/http'; // uses the k6/http API to make a load test request call
import { sleep, check, group } from 'k6';
import { Trend, Rate } from 'k6/metrics';

let AllProductsTrend = new Trend('Get all products');
let ProductsTrend = new Trend('Get products based on page and count');
let ProductsWithParamsTrend = new Trend('Get ProductsWithParams');
let ProductInfoTrend = new Trend('Get product info');
let ProductStylesTrend = new Trend('Get product styles');
let RelatedProductsTrend = new Trend('Get related products');

export const options = {
  stages: [
    { duration: '30s', target: 1000 },
  ]

/*
  For load testing, we ramp up the VU to a good amount and maintain it for a fixed period of time before ramping it down to 0.
*/
  // stages: [
  //   { duration: '10s', target: 100 },
  //   { duration: '10s', target: 100 },
  //   { duration: '10s', target: 0 },
  // ],

/*
  For stress testing involves the constant ramping up of VUs gradually over a period of time.
  We start with 200 VUs and then increment it by 200 VUs each time. Then, we ramp it down as part of the recovery phase.
*/
  // stages: [
  //   { duration: '30s', target: 200 },
  //   { duration: '30s', target: 400 },
  //   { duration: '30s', target: 600 },
  //   { duration: '30s', target: 800 },
  //   { duration: '30s', target: 1000 },
  //   { duration: '30s', target: 0 },
  // ],

};

const SLEEP_DURATION = 1

const baseUrl = `http://localhost:3000`;

const endpoints = {
  allProducts: `${baseUrl}/products`,
  products: `${baseUrl}/products?count=${Math.floor(Math.random() * (200 - 1 + 1)) + 1}&page=${Math.floor(Math.random() * (5001 - 1 + 1)) + 1}`,
  productInfo: `${baseUrl}/products/${Math.floor(Math.random() * (1000011 - 1 + 1)) + 1}`,
  productStyle: `${baseUrl}/products/${Math.floor(Math.random() * (1000011 - 1 + 1)) + 1}/styles`,
  relatedProducts: `${baseUrl}/products/${Math.floor(Math.random() * (1000011 - 1 + 1)) + 1}/related`
}

export default function () {
  group('Show flow', function() {
    let getAllProductsRes = http.get(endpoints.allProducts)
    check(getAllProductsRes, { 'status was 200 (get all products)': (r) => r.status === 200 })
    AllProductsTrend.add(getAllProductsRes.timings.duration)

    sleep(SLEEP_DURATION)

    let getProductsRes = http.get(endpoints.products)
    check(getProductsRes, { 'status was 200 (get products based on page and count)': (r) => r.status === 200 })
    ProductsTrend.add(getAllProductsRes.timings.duration)

    sleep(SLEEP_DURATION)

    let getProductInfoRes = http.get(endpoints.productInfo)
    check(getProductInfoRes, { 'status was 200 (get product info)': (r) => r.status === 200 })
    ProductInfoTrend.add(getProductInfoRes.timings.duration)


    sleep(SLEEP_DURATION)

    let getProductStyleRes = http.get(endpoints.productStyle)
    check(getProductStyleRes, { 'status was 200 (get product styles)': (r) => r.status === 200 })
    ProductStylesTrend.add(getProductStyleRes.timings.duration)

    sleep(SLEEP_DURATION)

    let getRelatedProductsRes = http.get(endpoints.relatedProducts)
    check(getRelatedProductsRes, { 'status was 200 (get related products)': (r) => r.status === 200 })
    RelatedProductsTrend.add(getRelatedProductsRes.timings.duration)

    sleep(SLEEP_DURATION)

  })
}


// export default function () {
//   let res = http.get(endpoints.allProducts)
//   check(res, { 'status was 200': (r) => r.status === 200 })
//   sleep(SLEEP_DURATION);
// }

// export default function () {
//   let res = http.get(endpoints.products)
//   check(res, { 'status was 200': (r) => r.status === 200 })
//   sleep(SLEEP_DURATION);
// }

// export default function () {
//   let res = http.get(endpoints.productInfo)
//   check(res, { 'status was 200': (r) => r.status === 200 })
//   sleep(SLEEP_DURATION);
// }

// export default function () {
//   let res = http.get(endpoints.productStyle)
//   check(res, { 'status was 200': (r) => r.status === 200 })
//   sleep(SLEEP_DURATION);
// }

// export default function () {
//   let res = http.get(endpoints.relatedProducts)
//   check(res, { 'status was 200': (r) => r.status === 200 })
//   sleep(SLEEP_DURATION);
// }

