const chai = require('chai')
const chaiHttp = require('chai-http')
const { server, redisClient } = require('../server')
const should = chai.should()

chai.use(chaiHttp)

describe('/api/games', () => {
  it('it should GET all stats', (done) => {
    chai.request(server)
        .get('/api/games')
        .query({ league: 'MLB' })
        .end(async(err, res) => {
            const data = JSON.parse(res.text)
            res.should.have.status(200)
            data.should.be.a('object')
            data.should.have.property('away_team')
            data.should.have.property('home_team')
          done()
        });
  });
  it('it should GET all stats', (done) => {
    chai.request(server)
    .get('/api/games')
    .query({ league: 'NBA' })
    .end(async(err, res) => {
        res.should.have.status(200)
        const dataNBA = JSON.parse(await redisClient.getAsync('NBA'))
        const dataMLB = JSON.parse(await redisClient.getAsync('MLB'))
        dataNBA.should.be.a('object')
        dataNBA.should.have.property('away_team')
        dataNBA.should.have.property('home_team')
        dataMLB.should.be.a('object')
        dataMLB.should.have.property('away_team')
        dataMLB.should.have.property('home_team')
      done()
    });
  });
});