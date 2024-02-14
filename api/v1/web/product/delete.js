/**
 * This is Contain Save router/api.
 * @author Sandip Vaghasiya
 *
 */


import { Joi } from '../../../../utilities/schemaValidate'
import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { deleteproduct } from "../../../../services/product/getproduct";
const router = new Router();


/**
 * @swagger
 * /api/v1/product/delete:
 *  post:
 *   tags: ["Product"]
 *   summary: delete product.
 *   description: api used for delete product information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: delete product information.
 *        schema:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 *   security:
 *      - bearerAuth: [] 
 */

 router.post('/delete', commonResolver.bind({ modelService: deleteproduct, isRequestValidateRequired: false, }))

export default router;
