// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

// Configure chai
chai.use(chaiHttp);
chai.use(require('chai-json-schema'));
chai.should();

let cvSchema = {
    title: 'CV schema',
    type: 'object',
    required: ['name', 'age', 'skills', 'education'],
    properties: {
        name: {
            type: 'string'
        },
        age: {
            type: 'number'
        },
        skills: {
            type: 'array',
            minItems: 1,
            uniqueItems: true,
            items: {
                type: 'string'
            }
        },
        education: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'object',
                required: ['institution', 'educationLevel', 'startYear', 'endYear']
            }
        }

    }
}

describe("JSON", () => {
    describe("GET /cv.json", () => {
        it('should return a valid json', (done) => {
            chai.request(app)
                 .get('/cv.json')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     chai.assert.jsonSchema(res.body, cvSchema)
                     done();
                  });
        })
    })
});