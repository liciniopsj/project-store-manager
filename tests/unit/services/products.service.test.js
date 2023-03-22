const chai = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/products.model');
const service = require('../../../src/services/products.service');
const mock = require('./mocks/products.service.mock');

const { expect } = chai;

describe('Unity test for the Product Model', function () {
  it('getAllProducts', async function () {
    sinon.stub(model, 'selectAll').resolves(mock);

    const data = await service.getAllProducts();

    expect(data.type).to.be.equal(null);
    expect(data.message).to.be.deep.equal(mock);
  });

  it('getProductById', async function () {
    sinon.stub(model, 'selectProductById').resolves([mock]);

    const data = await service.getProductById(1);

    expect(data.type).to.be.equal(null);
    expect(data.message).to.be.deep.equal(mock);
  });

  it('getProductById - Product not found', async function () {
    sinon.stub(model, 'selectProductById').resolves([null]);

    const data = await service.getProductById(5);

    expect(data.type).to.be.equal(404);
    expect(data.message).to.be.deep.equal({ message: "Product not found" });
  });

  afterEach(function () {
    sinon.restore();
  });
});