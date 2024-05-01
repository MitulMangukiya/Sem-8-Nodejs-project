/**
 * This is for Contain function layer for contractor service.
 * @author Sandip Vaghasiya
 *
 */

const ObjectId = require("mongodb").ObjectId;
import nodemon from "nodemon";
import dbService from "../../utilities/dbService";
import { paginationFn } from "../../utilities/pagination";

/*************************** listproduct ***************************/
export const listProduct = async (req,res) => {

  let { page = 1, limit = 0 } = req.body;

  const { docLimit, noOfDocSkip } = paginationFn({ page, limit });

  // let count = await dbService.recordsCount("productModel", {
  //   mainUserId: ObjectId(req.user.userId),
  //   isDeleted: false,
  // });

  let filter = {
    mainUserId: ObjectId(req.user.userId),
    isDeleted: false,
  };
  let productData = await dbService.findManyRecordsWithPagination(
    "productModel",
    filter,
    { sort: { productName: 1 }, limit: docLimit, skip: noOfDocSkip },
    {
      _id:0,
      productName: 1,
      productSKU: 1,
      productType: 1,
      companyName: 1,
      productPrice: 1
    }
  );

  let products = productData.items
  // console.log("products===>",products)
}

/************************** listProductWithAggregationWithfacet **********************/
export const listProductWithAggregationWithfacet = async (req) => {
  console.log("req.body===>", req.body);

  let { page = 1, limit = 0 } = req.body;
  const { docLimit, noOfDocSkip } = paginationFn({ page, limit });
  let mainUserId = ObjectId(req.user.userId);
  let filter = {
    mainUserId: ObjectId(req.user.userId),
    isDeleted: false,
  };

  let sortBy = { productName: 1 };
  let aggregateQuery = [
    { $match: filter },
    {
      $lookup: {
        from: "customers",
        let: { mainUserId: "$_id" },
        pipeline: [
          {
            $match: {
              isDeleted: false,
              _id: mainUserId,
            },
          },
          {
            $project: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              email: 1,
            },
          },
        ],
        as: "User",
      },
    },
    {
      $unwind: { path: "$User", preserveNullAndEmptyArrays: true },
    },
    {
      $facet: {
        data: [{ $sort: sortBy }, { $skip: noOfDocSkip }, { $limit: docLimit }],
        pageInfo: [
          {
            $group: { _id: null, count: { $sum: 1 } },
          },
        ],
      },
    },
    {
      $unwind: { path: "$pageInfo", preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        items: "$data",
        pageInfo: {
          page: page,
          limit: limit,
          count: "$pageInfo.count",
        },
      },
    },
  ];
  let result = await dbService.aggregateData("productModel", aggregateQuery);
  return {
    items: result[0].items,
    page: page,
    limit: limit,
    count: result[0].pageInfo.count,
  };
};

/*************************** listproductwithaggregation ***************************/
export const listProductWithAggregation = async (req) => {
  console.log("req.body; sdd=>", req.body);

  let { page = 1, limit = 0 } = req.body;
  const { docLimit, noOfDocSkip } = paginationFn({ page, limit });
  let mainUserId = ObjectId(req.user.userId);
  let filter = {
    mainUserId: ObjectId(req.user.userId),
    isDeleted: false,
  };

  let count = await dbService.recordsCount("productModel", {
    mainUserId: ObjectId(req.user.userId),
    isDeleted: false,
  });

  let sortBy = { productName: 1 };
  let aggregateQuery = [
    { $match: filter },
    { $sort: sortBy },
    { $skip: noOfDocSkip },
    { $limit: docLimit },

    {
      $lookup: {
        from: "customers",
        let: { mainUserId: "$_id" },
        pipeline: [
          {
            $match: {
              isDeleted: false,
              _id: mainUserId,
            },
          },

          {
            $project: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              email: 1,
            },
          },
        ],
        as: "User",
      },
    },
    {
      $unwind: { path: "$User", preserveNullAndEmptyArrays: true },
    },
  ];
  let result = await dbService.aggregateData("productModel", aggregateQuery);
  return {
    items: result,
    page: page,
    limit: limit,
    count: count,
  };
};

//********************* listProductWithPopulate ***********************//

export const listProductWithPopulate = async (req) => {
  let { page = 1, limit = 0 } = req.body;
  let filter = {
    mainUserId: ObjectId(req.user.userId),
    isDeleted: false
  };

  return await dbService.findManyRecordsWithPaginationAndPopulate(
    "productModel",
    filter,
    {sort: {productName:1},page,limit},
    {},
    [
      {
        path: "mainUserId",
        select: ["_id", "firstName", "lastName", "email"],
      },
    ]
  );
};