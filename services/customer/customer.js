/**
 * This is for Contain function layer for contractor service.
 * @author Sandip Vaghasiya
 *
 */

const ObjectId = require("mongodb").ObjectId;
import dbService from "../../utilities/dbService";
import {
  encryptpassword,
  decryptPassword,
  generateJwtTokenFn,
} from "../../utilities/universal";

/*************************** addCustomer ***************************/
export const addCustomer = async (req) => {
  console.log("req service =>", req.body);
  const { email } = req.body;
  console.log("email =>", email);
  let customerData = await dbService.findOneRecord("customerModel", {
    email: email,
  });
  console.log("customerData =>", customerData);
  if (customerData) {
    throw new Error("Email Address Already Exists!");
  } else {
    console.log("req.body.password =>", req.body.password);
    let password = await encryptpassword(req.body.password);
    console.log("encryptpassword  password =>", password);
    console.log("still we have req.body.password =>", req.body.password);
    req.body.password = password;
    console.log("after we have req.body.password =>", req.body.password);
    //let project = await customerModel.saveQuery(req.body);
    let project = await dbService.createOneRecord("customerModel", req.body);
    console.log("project data =>", project);

    return project;
  }
};

export const onLogin = async (req, res, next) => {
  const payload = req.body;
  console.log("payload==>", payload);
  let userData = await dbService.findOneRecord("customerModel", {
    email: payload.email.toLowerCase(),
    isDeleted: false,
  });
  console.log("userData==>", userData);
  if (!userData) throw new Error("Email not exists");

  let match = await decryptPassword(payload.password, userData.password);
  if (!match) throw new Error("Password Invalid");
  if (userData.isMailVerified == false) throw new Error("Please verify email");

  if (userData?.loginToken) {
    if (userData?.loginToken?.length >= 5) {
      let rr = await dbService.findOneAndUpdateRecord(
        "customerModel",
        { _id: userData._id },
        {
          $pop: { loginToken: -1 },
        },
        { new: true }
      );
    }
  }

  let token = await generateJwtTokenFn({ userId: userData._id });
  let updateData = {
    $push: {
      loginToken: {
        token: token,
      },
    },
    lastLoginDate: Date.now(),
  };

  let data = await dbService.findOneAndUpdateRecord(
    "customerModel",
    { _id: userData._id },
    updateData,
    { new: true }
  );

  // res.setHeader("Access-Control-Expose-Headers", "token");
  // res.setHeader("token", data.loginToken[data.loginToken.length - 1].token);

  return {
    email: data.email,
    lastLogin: data.lastLoginDate,
    token: token,
  };
};

/*************************** getCustomer ***************************/
export const getCustomer = async (req) => {
  console.log("request=>", req);
  let { user: { userId }  } = req
  console.log("userId=>", userId);

  let customerData = await dbService.findAllRecords("customerModel", {
    _id: userId,
    isDeleted: false
  });

  return customerData;
};

//*********************** deletecustomer **************************//
export const deletecustomer = async (req) => {
  let where = {
      // _id : req.body.id,
      _id : ObjectId(req.user.userId)
  };
  let customerdata = await dbService.findOneAndUpdateRecord("customerModel", where,
   { isDeleted: true });
  return "customer data is deleted";
}

//*********************** addprofileImg **************************//

export const addprofileImg = async (req) => {
    let customerimg = await dbService.findOneAndUpdateRecord("customerModel",{_id:ObjectId(req.user.userId),isDeleted:false},{"profileImg":req.body.image});
    return req.body
}
