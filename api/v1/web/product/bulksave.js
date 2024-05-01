/**
 * This is Contain Save router/api.
 * @author Sandip Vaghasiya
 *
 */

import { Joi } from '../../../../utilities/schemaValidate'
import { Router } from 'express';
import commonResolver from '../../../../utilities/commonResolver'
import { addbulkproduct } from "../../../../services/product/saveproduct";
import { handleCsv } from '../../../../utilities/handlecsv';
const router = new Router();

/**
* @swagger
* /api/v1/product/addbulkproducts:
*  post:
*   tags: ["Product"]
*   summary: Save many products information.
*   description: api used for Save many products information.
*   consumes: 
*      - multipart/formdata
*   parameters:
*      - in: formData
*        name: csvfile
*        type: file
*        description: add csv file here.
*           
*   responses:
*    "200":
*     description: success
*    "400":
*     description: fail
*   security:
*      - bearerAuth: [] 
*/

router.post('/addbulkproducts',handleCsv,commonResolver.bind({ modelService: addbulkproduct, isRequestValidateRequired: false,  }))

export default router;
