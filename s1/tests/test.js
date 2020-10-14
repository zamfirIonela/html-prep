// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

// Configure chai
chai.use(chaiHttp);
chai.use(require('chai-json-schema'));
chai.should();

describe("Profile Page", () => {
    describe("GET /", () => {
        // Test to get all students record
        it("should respond with status 200", (done) => {
             chai.request(app)
                 .get('/')
                 .end((err, res) => {
                     res.should.have.status(200);
                     chai.expect(res.text).to.have.lengthOf.above(0)
                     done();
                  });
         });
    });
});