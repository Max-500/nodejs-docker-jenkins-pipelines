const express = require('express');
const request = require('http').request;

const app = express();

app.get('/hello', (req, res) => {
  res.status(200).send('Hello World');
});

describe('GET /hello', () => {
  let server;
  beforeAll((done) => {
    server = app.listen(4000, done); // Inicia el servidor en el puerto 4000 antes de todas las pruebas
  });

  afterAll((done) => {
    server.close(done); // Cierra el servidor después de todas las pruebas
  });

  it('responds with Hello World', (done) => {
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: '/hello',
      method: 'GET',
    };

    const req = request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        expect(data).toBe('Hello World');
        expect(res.statusCode).toBe(200);
        done();
      });
    });

    req.on('error', (err) => {
      done(err);
    });

    req.end();
  });
});
