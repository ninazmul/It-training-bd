import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPaymentInfo {
  transaction_id?: string; 
}

export interface IOrder extends Document {
  courseId: string;
  userId: string;
  payment_info?: IPaymentInfo;
}

export const OrderSchema = new Schema<IOrder>(
  {
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    payment_info: {
      type: Map,
      of: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

const OrderModel: Model<IOrder> = mongoose.model("Order", OrderSchema);

export default OrderModel;
