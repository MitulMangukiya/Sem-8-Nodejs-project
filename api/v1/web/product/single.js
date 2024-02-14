/**
 * This is Contain Save router/api.
 * @author Sandip Vaghasiya
 *
 */

 import { Joi } from '../../../../utilities/schemaValidate'
 import { Router } from 'express';
 import commonResolver from '../../../../utilities/commonResolver'
 import { getproductwithid } from "../../../../services/product/getproduct";
 const router = new Router();

/**
 * @swagger
 * /api/v1/product/getproductwithid:
 *  post:
 *   tags: ["Product"]
 *   summary: get product information.
 *   description: api used for get product information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: get product information.
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

 router.post('/getproductwithid', commonResolver.bind({ modelService: getproductwithid, isRequestValidateRequired: false,  }))
export default router;
