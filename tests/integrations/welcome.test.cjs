const request = require('supertest');
const app = require('../../app.js');

describe('GET /api/v1/welcome', () => {
  it('responds with Welcome message', (done) => {
    request(app)
      .get('/api/v1/welcome')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        if (!('message' in res.body)) throw new Error("Missing 'message' key");
        if (res.body.message !== 'Welcome to this Api ya 4') throw new Error(`Unexpected message: ${res.body.message}`);
      })
      .end(done);
  });
});
