const mongoose = require("mongoose");

const adminUserSchema= new mongoose.Schema({
    userName:{type:String, required:true},
    password:{type:String,required:true}
},{collection: "AdminUsers"}
)

const AdminUser= mongoose.model("AdminUser", adminUserSchema);
 module.exports.AdminUser=AdminUser;
const categorySchema= new mongoose.Schema({
    categoryName:{type:String, required:true},
    ImageURL:{type:String, required:true},
    Description:{type:String, required:true}
}, {collection:"categories"})

const Category = mongoose.model("Category", categorySchema);
module.exports.Category=Category;
const productSchema= new mongoose.Schema({
   productName:{type:String, required:true},
   imageURL:{type:String, required:true},
   description:{type:String, required:true},
   price:{type:Number, required:true},
   categoryId:{type: mongoose.Schema.Types.ObjectId, ref:'Category', required:true},
},{collection:"Product"});

const Product= mongoose.model("Product",productSchema);
module.exports.Product=Product;
const userSchema= new mongoose.Schema({
    userName:{type:String, required:true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true }
},{collection:"users"});

const User= mongoose.model("User",userSchema);
module.exports.User=User;

const CartItmemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
}, { collection: "CartItems" });

const CartItem = mongoose.model("CartItem", CartItmemSchema);
module.exports.CartItem = CartItem;

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalPrice: { type: Number, required: true },
    itemIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }]
},{collection: "Carts" });

const Cart = mongoose.model("Cart", CartSchema);
module.exports.Cart = Cart;
