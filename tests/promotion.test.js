// // tests/promotion.test.js
// const request = require('supertest');
// const app = require('../src/server'); // Adjust path if needed

// describe('Promotion Rule Engine', () => {
//   test('returns correct promotion based on player level and country', async () => {
//     const player = {
//       level: 10,
//       country: 'IN',
//       days_since_last_purchase: 5,
//       spend_tier: 'low'
//     };

//     const res = await request(app)
//       .post('/promotion')
//       .send(player)
//       .expect(200);

//     expect(res.body).toBeDefined();
//     expect(res.body.title).toBe('Comeback Bonus');
//   });

//   test('returns null if no matching promotion', async () => {
//     const player = {
//       level: 2,
//       country: 'BR',
//       days_since_last_purchase: 0,
//       spend_tier: 'low'
//     };

//     const res = await request(app)
//       .post('/promotion')
//       .send(player)
//       .expect(200);

//     expect(res.body).toBeNull();
//   });

//   test('returns error for missing level', async () => {
//     const player = {
//       country: 'IN',
//       days_since_last_purchase: 5
//     };

//     const res = await request(app)
//       .post('/promotion')
//       .send(player)
//       .expect(400);

//     expect(res.body.error).toBe('Invalid or missing player level');
//   });

//   test('returns error for unsupported country', async () => {
//     const player = {
//       level: 15,
//       country: 'ZZ',
//       days_since_last_purchase: 5
//     };

//     const res = await request(app)
//       .post('/promotion')
//       .send(player)
//       .expect(400);

//     expect(res.body.error).toMatch(/Unsupported country/);
//   });

//   test('respects rule priority', async () => {
//     const player = {
//       level: 10,
//       country: 'US',
//       days_since_last_purchase: 5,
//       spend_tier: 'high'
//     };

//     const res = await request(app)
//       .post('/promotion')
//       .send(player)
//       .expect(200);

//     expect(res.body).toBeDefined();
//     expect(res.body.title).toBe('High Roller Pack'); // Assuming promo2 has higher priority
//   });

  
// });


const request = require('supertest');
const app = require('../src/server');

describe('Promotion Rule Engine', () => {
  test('returns correct promotion based on player level and country', async () => {
    const player = {
      level: 10,
      country: 'IN',
      days_since_last_purchase: 5,
      spend_tier: 'low'
    };

    const res = await request(app)
      .post('/promotion')
      .send(player)
      .expect(200);

    expect(res.body).toBeDefined();
    expect(res.body.title).toBe('Comeback Bonus');
  });

  test('returns null if no matching promotion', async () => {
    const player = {
      level: 2,
      country: 'BR', // previously unsupported
      days_since_last_purchase: 0,
      spend_tier: 'low'
    };

    const res = await request(app)
      .post('/promotion')
      .send(player)
      .expect(200);

    expect(res.body).toBeNull();
  });

  test('returns error for missing level', async () => {
    const player = {
      country: 'IN',
      days_since_last_purchase: 5
    };

    const res = await request(app)
      .post('/promotion')
      .send(player)
      .expect(400);

    expect(res.body.error).toBe('Invalid or missing player level');
  });

  test('respects rule priority', async () => {
    const player = {
      level: 10,
      country: 'US',
      days_since_last_purchase: 5,
      spend_tier: 'high'
    };

    const res = await request(app)
      .post('/promotion')
      .send(player)
      .expect(200);

    expect(res.body).toBeDefined();
    expect(res.body.title).toBe('High Roller Pack'); // Assuming promo2 has higher priority
  });

});
