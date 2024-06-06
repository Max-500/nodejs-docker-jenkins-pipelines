import express from 'express';
import http from 'http';

const app = express();

app.get('/api/v1/welcome', (req, res) => {
  res.status(200).send('Welcome to the updated Node.js application!');
});

describe('GET /api/v1/welcome', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(4000, done); // Inicia el servidor en el puerto 4000 antes de todas las pruebas
  });

  afterAll((done) => {
    server.close(done); // Cierra el servidor después de todas las pruebas
  });

  it('responds with Welcome to the updated Node.js application!', (done) => {
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: '/api/v1/welcome',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        expect(data).toBe('Welcome to the updated Node.js application!');
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
