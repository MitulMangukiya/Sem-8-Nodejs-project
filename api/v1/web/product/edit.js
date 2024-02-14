/**
 * This is Contain Save router/api.
 * @author Sandip Vaghasiya
 *
 */

 import { Joi } from '../../../../utilities/schemaValidate'
 import { Router } from 'express';
 import commonResolver from '../../../../utilities/commonResolver'
 import { updateproduct } from "../../../../services/product/getproduct";
 const router = new Router();
 

/**
 * @swagger
 * /api/v1/product/update:
 *  post:
 *   tags: ["Product"]
 *   summary: update product information.
 *   description: api used for update product information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: update product information.
 *        schema:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           productName:
 *             type: string
 *           productType: 
 *             type: string
 *           companyName:
 *             type: string
 *           productPrice:
 *             type: number
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 *   security:
 *      - bearerAuth: [] 
 */

 router.post('/update', commonResolver.bind({ modelService: updateproduct, isRequestValidateRequired: false,  }))


export default router;
