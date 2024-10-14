const express = require('express');

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();


/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: product name
 *        price:
 *          type: integer
 *          description: product price
 *        image:
 *          type: string
 *          description: product URL
 *        isblock:
 *          type: boolean
 *          description: product isblock or not
 *      required:
 *        - name
 *        - price
 *        - image
 *      example:
 *        name: PS5
 *        price: 7000
 *        image: http://ps5.com/640/480
 */

/**
 * @swagger
 * /api/v1/products:
 *  post:
 *    summary: create a new product
 *    tags: [Product]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *          type: object
 *          $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: new product created!
 */
router.post('/', validatorHandler(createProductSchema, 'body'), async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});


/**
 * @swagger
 * /api/v1/products:
 *  get:
 *    summary: return all products
 *    tags: [Product]
 *    responses:
 *      200:
 *        description: List all products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});


/**
 * @swagger
 * /api/v1/products/{id}:
 *  get:
 *    summary: return product for id product
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: idProduct
 *    responses:
 *      200:
 *        description: List one product for id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Product not found
 */
router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  try{
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  }
  catch(error){
    next(error);
  }
});


/**
 * @swagger
 * /api/v1/products/{id}:
 *  patch:
 *    summary: Update product
 *    tags: [Product]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *          type: object
 *          $ref: '#/components/schemas/Product'
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: idProduct
 *    responses:
 *      200:
 *        description: List one product for id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Product not found
 */
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try{
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  }
  catch(error){
    next(error);
  }

});

/**
 * @swagger
 * /api/v1/products/{id}:
 *  delete:
 *    summary: delete product for id product
 *    tags: [Product]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: idProduct
 *    responses:
 *      200:
 *        description: Product deleted!
 *      404:
 *        description: Product is not deleted!
 */
router.delete('/:id', validatorHandler(deleteProductSchema, 'params'), async (req, res) => {
  const { id } = req.params;
  const product = await service.delete(id);
  res.json(product);
});

module.exports = router;
