/**
* This is for Contain function layer for product service.
* @author Sandip Vaghasiya
*
*/

const ObjectId = require("mongodb").ObjectId;
import dbService from "../../utilities/dbService";

/*************************** addProduct ***************************/
export const addProduct = async (req) => {
//  console.log("req service =>", req.body);
 const {productName} = req.body;

 let productData = await dbService.findAllRecords("productModel", {
    mainUserId : ObjectId(req.user.userId),
    isDeleted : false
 },{productName:1,_id:0});
 console.log("productname =>", productData);

const existproducts = productData.map((item)=>item.productName.toLowerCase())
if(existproducts.includes(productName.toLowerCase())){
   throw new Error("product Name Already Exists!");
}
else {
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
      let where={
         mainUserId : req.user.userId,
         isDeleted : false
      }
      let existproducts = await dbService.findAllRecords("productModel",where,{productName : 1,_id:0})
      let arrayofexistproducts = existproducts.map((pname)=>pname.productName.toLowerCase())
      console.log("products===>",arrayofexistproducts)
      
      let count = 0
      for(let i=0;i<products.length;i++){
         if(!arrayofexistproducts.includes(products[i].productName)){
            await dbService.createOneRecord("productModel",products[i]) 
            console.log("newproducts===>",products[i].productName)
            count++
         }
      }
      console.log(count)
      return "unique products added successfully"
   }
   catch(error){
      console.log("can't add products ===> ", error);
   }
}