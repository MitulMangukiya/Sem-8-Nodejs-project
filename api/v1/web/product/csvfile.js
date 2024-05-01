import { Joi } from '../../../../utilities/schemaValidate'
import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { getcsv } from "../../../../services/product/getcsvfile"
// import { jsontocsv } from '../../../../utilities/jsontocsv';
const router = new Router();

/**
* @swagger
* /api/v1/product/getcsvfile:
*  post:
*   tags: ["Product"]
*   summary: get products information.
*   description: api used for get products information in csv file.
*   parameters:
*      - in: body
*        name: lead
*        description: download csv file.
*        schema:
*         type: object
*        properties:
*           page:
*             type: string
*           limit:
*             type: string
*           
*   responses:
*    "200":
*     description: success
*    "400":
*     description: fail
*   security:
*      - bearerAuth: [] 
*/

router.post('/getcsvfile',commonResolver.bind({ modelService: getcsv, isRequestValidateRequired: false,  }))

export default router;
