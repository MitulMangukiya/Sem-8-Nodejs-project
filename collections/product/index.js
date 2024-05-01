/**
 * This is the indexer for contractor model
 * @author Sandip Vaghasiya
 * @since Saturday, May 28, 2022
 */

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String },
  // productSKU: { type: String },
  productType: { type: String },
  companyName: { type: String },
  productPrice: { type: Number },
  mainUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' },
  stockstatus: { type: String, enum:["instock","outofstock"],default: "instock" },
  quantity: { type: String, default: 1 },
  isEnabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  isUpdated:  { type: Boolean, default: false },
  createdAt: { type: Date , default: Date()},
  updatedAt: { type: Date , default: Date()}
});

productSchema.index({productName:1,mainUserId:1})

export default mongoose.model("product", productSchema);
