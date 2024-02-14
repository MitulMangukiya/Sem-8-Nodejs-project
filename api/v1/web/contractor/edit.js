/**
 * This is Contain Save router/api.
 * @author Sandip Vaghasiya
 *
 */

 import { Joi } from '../../../../utilities/schemaValidate'
 import { Router } from 'express';
 import commonResolver from '../../../../utilities/commonResolver'
 import { updatecontractor } from "../../../../services/contractor/contractor";
 const router = new Router();
 

/**
 * @swagger
 * /api/v1/contractor/update:
 *  post:
 *   tags: ["Contractor"]
 *   summary: update Contractor information.
 *   description: api used for update Contractor information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: update Contractor information.
 *        schema:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           firstName:
 *             type: string
 *           lastName:
 *             type: string
 *           contactorType: 
 *             type: string
 *           companyName:
 *             type: string
 *           phone:
 *             type: string
 *           email:
 *             type: string
 *           micsConNotes:
 *             type: string
 *           address1:
 *             type: string
 *           address2:
 *             type: string
 *           city:
 *             type: string
 *           state:
 *             type: string
 *           zipcode:
 *             type: string
 *           country:
 *             type: string
 *           empIdentiNumber:
 *             type: string
 *           licenseInfo:
 *             type: string
 *           insureanceInfo:
 *             type: string
 *           bondInfo:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 *   security:
 *      - bearerAuth: [] 
 */

 router.post('/update', commonResolver.bind({ modelService: updatecontractor, isRequestValidateRequired: false,  }))


export default router;