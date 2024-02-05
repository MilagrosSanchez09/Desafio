import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

export const cartSchema = new Schema({
    name: {
        type: String, 
        required: true,
        index: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "products",
            default: []
        }
    ]
});

cartSchema.plugin(mongooseAggregatePaginate);
cartSchema.pre("find", function(){
    this.populate("products")
})

export const CartModel = model("carts", cartSchema);