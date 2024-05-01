import dbService from "../../utilities/dbService";
const {Parser} = require("json2csv")

export const getcsv = async (req,res) => {
  
    let where = {
      mainUserId: req.user.userId,
      isDeleted: false,
    };
    let productData = await dbService.findAllRecords(
      "productModel",
      where,
      {
        _id:0,
        productName: 1,
        productSKU: 1,
        productType: 1,
        companyName: 1,
        productPrice: 1
      }
    );
    // let products = productData.items
    // console.log("products===>",products)
    const Fields = [
        {
            label : "Product Name",
            value : "productName"
        },
        {
            label : "Product SKU",
            value : "productSKU"
        },
        {
            label : "Product Type",
            value : "productType"
        },
        {
            label : "company Name",
            value : "productName"
        },
        {
            label : "Product Price",
            value : "productPrice"
        }
    ]  
    if(productData && productData.length>0){
        const json2csvParser = new Parser({
            fields: Fields
        });
        const csvfile = json2csvParser.parse(productData);
        return {
            csvData : csvfile,
            header : {
                'contentType': 'text/csv'
            }
        }
    }
    else{
        throw new Error('No Product Data Found')
    }
}