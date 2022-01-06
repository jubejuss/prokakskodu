import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../src/app';

const user = {
  email: 'maie@paie.ee',
  password: 'maie',
};

let token: string;

describe('indicators controller', () => {
  describe('GET /indicators', () => {
    it('responds with code 200 and token after login', async () => {
      const response = await request(app).post('/login').send(user);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('token');
      expect(response.body.token).to.be.a('string');
      token = response.body.token;
    });
    it('responds with code 401 and error message because no token', async () => {
      const response = await request(app).get('/indicators');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No token provided');
    });
    it('responds with code 401 and error message because invalid token', async () => {
      const response = await request(app)
        .get('/indicators')
        .set('Authorization', 'Bearer akshdhajshdjhasjdhjas');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('invalid token');
    });
    it('responds with code 200 and array of indicators', async () => {
      const response = await request(app)
        .get('/indicators')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('Indicators');
      expect(response.body.Indicators).to.be.a('array');
      expect(response.body.Indicators.length).to.greaterThan(0);
    });
  });
});
