/**
 * This is for Contain function layer for contractor service.
 * @author Sandip Vaghasiya
 *
 */

const ObjectId = require("mongodb").ObjectId;
import { error } from "@hapi/joi/lib/base";
import dbService from "../../utilities/dbService";
import { date } from "@hapi/joi";

//********************/ getproductwithid **************************//

export const getproductwithid = async (req) =>{
    let where={
        _id : req.body.id,
        mainUserId : ObjectId(req.user.userId),
        isDeleted : false
    }
    let result = await dbService.findOneRecord("productModel",where);
    if (result) {
        return result
    }
    else{
        throw new Error("product not found")
    }
}

//*********************** updateproduct **************************//

export const updateproduct = async (req) =>{
    req.body["updatedAt"] = new Date();
    req.body["isUpdated"] = true;
    let where={
        _id : req.body.id,
        mainUserId : ObjectId(req.user.userId),
        isDeleted : false
    }
    let check = await dbService.findOneAndUpdateRecord("productModel",where,req.body,{new:true})
    if (check){
        return check;
    }
    else{
        return "product is not available"
    }
}

//********************* deleteproduct *************************//

export const deleteproduct = async (req) => {
    let where = {
        _id : req.body.id,
        mainUserId : ObjectId(req.user.userId)
    };
    let productdata = await dbService.findOneAndUpdateRecord("productModel", where,
     { isDeleted: true });
    return "product data is deleted";
}