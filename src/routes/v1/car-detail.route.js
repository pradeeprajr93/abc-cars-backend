const express = require('express');
const carDetailController = require('../../controllers/car-detail.controller');

const router = express.Router();

router
  .route('/')
  .post(carDetailController.createCarDetail)
  .get(carDetailController.getCarDetails);

router
  .route('/:productId')
  .get(carDetailController.getCarDetail)
  .delete(carDetailController.deleteCarDetail);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Car Details
 *   description: Car Details CRUD
 */

/**
 * @swagger
 * /car-details:
 *   post:
 *     summary: Create a Car Detail
 *     tags: [CarDetails]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - make
 *               - exShowRoomPrice
 *               - description
 *               - productId
 *               - imageLink
 *             properties:
 *               name:
 *                 type: string
 *               make:
 *                 type: string
 *               exShowRoomPrice:
 *                 type: string
 *               description:
 *                 type: string
 *               imageLink:
 *                 type: string
 *               productId:
 *                 type: string
 *                 description: must be unique
 *             example:
 *               name: Nexon EV
 *               make: TATA MOTORS
 *               exShowRoomPrice: Rs.14,50,000
 *               description: Electric car. Made in India.
 *               productId: TATNEX001
 *               imageLink: https://imgd.aeplcdn.com/1280x720/n/cw/ec/42611/tata-nexon-ev-right-front-three-quarter6.jpeg
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CarDetail'
 *       "400":
 *         $ref: '#/components/responses/DuplicateProductId'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

 /**
 * @swagger
 * /car-details/{productId}:
 *   delete:
 *     summary: Delete a Car Detail
 *     tags: [CarDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product Id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 * 
 */
