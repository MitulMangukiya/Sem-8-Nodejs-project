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

//********************** addbulkproduct *************************//

export const addbulkproduct = async (req) =>{
   let products = req.body;
   
   try {
      for(let i=0;i<products.length;i++){
         let project = await dbService.findOneRecord("productModel",{productName : products[i].productName, mainUserId : products[i].userId}); 
         if(project){
            let update={}
            if(project.stockstatus == "outofstock"){
               update.stockstatus="instock"
               update.quantity += 1
            }
            await dbService.updateOneRecord("productModel",{_id : project._id},update)
         }
         else{
            await dbService.createOneRecord("productModel",products[i]) 
         }
      }
      return "product added successfully"
   }
   catch(error){
      console.log("can't add products ===> ", error);
   }
}