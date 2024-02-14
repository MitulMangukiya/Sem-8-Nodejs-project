/**
* This is for Contain function layer for product service.
* @author Sandip Vaghasiya
*
*/

const ObjectId = require("mongodb").ObjectId;
import dbService from "../../utilities/dbService";

/*************************** addProduct ***************************/
export const addProduct = async (req) => {
 console.log("req service =>", req.body);
 const { productName } = req.body;
 let productData = await dbService.findOneRecord("productModel", {
    productName: productName,
    mainUserId : ObjectId(req.user.userId)
 });
 console.log("productData =>", productData);
 if (productData) {
   throw new Error("productData Name Already Exists!");
 } else {
    req.body.mainUserId = req.user?.userId;
    req.body.createdBy = req.user?.userId;
   let project = await dbService.createOneRecord("productModel", req.body);
   console.log("project data =>", project);
   return project;
}
};