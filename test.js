const express = require('express');
const http = require('http');

const app = express();

app.get('/hello', (req, res) => {
  res.status(200).send('Hello World');
});

describe('GET /hello', () => {
  let server;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('responds with Hello World', async () => {
    const response = await new Promise((resolve, reject) => {
      http.get(`http://localhost:${server.address().port}/hello`, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode, body: data });
        });
      }).on('error', reject);
    });

    expect(response.body).toBe('Hello World');
    expect(response.statusCode).toBe(200);
  });
});