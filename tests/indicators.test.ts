import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../src/app';

describe('indicators controller', () => {
  describe('GET /indicators', () => {
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
  });
});
