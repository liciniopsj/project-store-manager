const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const model = require('../../../src/models/products.model');
const productMock = require('./mocks/products.model.mock');
const { expect } = chai;


describe('Unity test for the Product Model', function () {
  it('Select All', async function () {
    sinon.stub(connection, 'execute').resolves([productMock]);

    const data = await model.selectAll();

    expect(data).to.be.deep.equal(productMock);

  });
  
  it("Select by Id", async function () {
    sinon.stub(connection, 'execute').resolves(productMock);

    const data = await model.selectProductById(1);

    expect(data).to.be.deep.equal(productMock[0]);

  });

  it('insertNewProduct', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const data = await model.insertNewProduct([{ name: "teste" }]);

    expect(data).to.be.equal(4);
  })

  afterEach(function () {
    sinon.restore();
  });
});
