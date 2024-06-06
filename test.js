const request = require('supertest');
const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
  res.status(200).send('Hello World');
});

describe('GET /hello', () => {
  it('responds with Hello World', (done) => {
    request(app)
      .get('/hello')
      .expect('Hello World')
      .expect(200, done);
  });
});
