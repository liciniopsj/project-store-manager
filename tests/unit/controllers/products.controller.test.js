const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
chai.use(require('sinon-chai'));

const service = require('../../../src/services/products.service');
const controller = require('../../../src/controllers/products.controller');
// const productNameValidation = require('../../../src/middlewares/productNameValidation');

const mock = require('./mocks/products.controller.mock');

describe('Unit test for product controller', function () {
  it('returnAllProducts', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(service, 'getAllProducts')
      .resolves({ type: null, message: mock });
    
    await controller.returnAllProducts(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock)
  });

  it('returnProductById', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(service, 'getProductById')
      .resolves({ type: null, message: mock });
    
    await controller.returnProductById(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock)
  });

  it('returnProductById - Product not found', async function () {
    const req = { params: { id: 5 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(service, 'getProductById')
      .resolves({ type: 404, message: 'Product not found' });
    
    await controller.returnProductById(req, res);
    
    expect(res.status).to.been.calledWith(404);
    expect(res.json).to.have.been.calledWith('Product not found')
  });

  it('createNewProduct', async function () {
    sinon
      .stub(service, "addProduct")
      .resolves({ message: { name: "Test Product" } });

    const req = {};
    const res = {};

    req.body = { name: "Test Product" };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();


    await controller.createNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ name: "Test Product" });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});

