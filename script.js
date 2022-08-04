import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  thresholds: {
    http_req_failed: ['rate < 0.01']
  },

  scenarios: {
    reqPerSec_1: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '10s',
      preAllocatedVUs: 20, // how large the initial pool of VUs would be
      maxVUs: 100, // if the preAllocatedVUs are not enough, we can initialize more
    },

    // reqPerSec_10: {
    //   executor: 'constant-arrival-rate',
    //   rate: 10,
    //   timeUnit: '1s',
    //   duration: '10s',
    //   preAllocatedVUs: 20,
    //   maxVUs: 100,
    // },

    // reqPerSec_100: {
    //   executor: 'constant-arrival-rate',
    //   rate: 100,
    //   timeUnit: '1s',
    //   duration: '30s',
    //   preAllocatedVUs: 20,
    //   maxVUs: 200,
    // },

    // reqPerSec_1000: {
    //   executor: 'constant-arrival-rate',
    //   rate: 1000,
    //   timeUnit: '1s',
    //   duration: '30s',
    //   preAllocatedVUs: 20,
    //   maxVUs: 2000,
    // },
  },

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

const randId = Math.floor(Math.random() * (1000011 - 1 + 1)) + 1;
const randCount = Math.floor(Math.random() * (120 - 1 + 1)) + 1;
const randPage = Math.ceil(1000011 / randCount);

const endpoints = {
  products: `${baseUrl}/products`,
  productsWithParams: `${baseUrl}/products?count=${randCount}}&page=${randPage}`,
  productInfo: `${baseUrl}/products/${randId}`,
  productStyle: `${baseUrl}/products/${randId}/styles`,
  relatedProducts: `${baseUrl}/products/${randId}/related`
}

export default function () {
  let res = http.get(endpoints.products)
  check(res, { 'status was 200 (get products based on default page and count)': (r) => r.status === 200 })
  sleep(SLEEP_DURATION);
}

// export default function () {
//   console.log(endpoints.productsWithParams);
//   let res = http.get(endpoints.productsWithParams)
//   check(res, { 'status was 200 (get products based on page and count)': (r) => r.status === 200 })
//   sleep(SLEEP_DURATION);
// }

// export default function () {
//   let res = http.get(endpoints.productInfo)
//   check(res, { 'status was 200 (get product info)': (r) => r.status === 200 })
//   sleep(SLEEP_DURATION);
// }

// export default function () {
//   let res = http.get(endpoints.productStyle)
//   check(res, { 'status was 200 (get product styles)': (r) => r.status === 200 })
//   sleep(SLEEP_DURATION);
// }

// export default function () {
//   let res = http.get(endpoints.relatedProducts)
//   check(res, { 'status was 200 (get related products)': (r) => r.status === 200 })
//   sleep(SLEEP_DURATION);
// }

