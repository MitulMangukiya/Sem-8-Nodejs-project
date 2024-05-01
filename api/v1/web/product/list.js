 import { Router } from 'express';
 import commonResolver from '../../../../utilities/commonResolver'
 import { listProductWithPopulate } from "../../../../services/product/listProduct";
 const router = new Router();

/**
 * @swagger
 * /api/v1/product/listProduct:
 *  post:
 *   tags: ["Product"]
 *   summary: list product information.
 *   description: api used for list product information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: list product information.
 *        schema:
 *         type: object
 *         properties:
 *           page:
 *             type: string
 *           limit:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 *   security:
 *      - bearerAuth: [] 
 */

 router.post('/listProduct', commonResolver.bind({ modelService: listProductWithPopulate, isRequestValidateRequired: false, }))




export default router;
