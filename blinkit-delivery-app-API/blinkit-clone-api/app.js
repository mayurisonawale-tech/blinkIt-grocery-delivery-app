const express = require('express');
const mongoose = require("mongoose");
const { AdminUser, Category, Product, User,CartItem,Cart } = require('./models');

require("dotenv").config();

const server = express();

server.use(express.json());

// Comma-separated list of allowed origins, or '*' for any.
// e.g. CORS_ORIGIN=https://blinkit-clone.netlify.app
const allowedOrigins = (process.env.CORS_ORIGIN || '*').split(',').map(o => o.trim());

server.use((req, res, next) => {
    const requestOrigin = req.headers.origin;
    if (allowedOrigins.includes('*')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    } else if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
        res.setHeader('Access-Control-Allow-Origin', requestOrigin);
        res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Browsers send a preflight OPTIONS request before a PUT/POST with a JSON body.
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
})

// Health check - used by hosting platforms to verify the service is up.
server.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

server.post('/admin/login',(req,res,next)=>{
  const userName = req.body?.userName;
  const password = req.body?.password;
    if (!userName || !password) {
    return res.status(400).json({ message: 'userName and password are required' });
  }

  console.log('Login attempt:', { userName, password });
  
  AdminUser.findOne({ userName: userName, password: password }).then((user) => {
    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  }).catch((err) => {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

server.post('/add-category',(req,res,next)=>{
  const categoryName = req.body?.categoryName;
  const ImageURL = req.body?.categoryImage;
  const Description = req.body?.categoryDescription;

  if (!categoryName || !ImageURL || !Description){
    return res.status(400).json({message:'categoryName, ImageURL, and Description are required'})
  }

const newCategory = new Category({categoryName: categoryName, ImageURL: ImageURL, Description: Description}); 
newCategory.save().then((category)=>{
  res.status(201).json({ message: 'Category created successfully', category: category });
}).catch ((err) => {
    console.error('Error creating category:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
})

server.get('/categories', (req, res, next) => {
  Category.find().then((categories) => {
    res.status(200).json({ categories: categories }); 
  }).catch((err) => {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Internal server error' });
  });

});

server.put('/edit-category/:id', (req, res, next) => {
  const categoryId = req.params.id;
  const updatedData = {
    categoryName: req.body?.categoryName,
    ImageURL: req.body?.categoryImage,
    Description: req.body?.categoryDescription
  };
  Category.findByIdAndUpdate(categoryId, updatedData).then((updatedCategory) => {
    if (updatedCategory) {
      res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  }).catch((err) => {
    console.error('Error updating category:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

server.post('/add-product', (req,res,next)=>{
  const productName= req.body?.productName; 
  const imageURL = req.body?.productImage;
  const description = req.body?.productDescription;
  const price = req.body?.productPrice;
  const categoryId = req.body?.categoryId;

  if(!productName || !imageURL || !description || !price || !categoryId){
    return res.status(400).json({message:'All fields are required'})
  }

  const newProduct= new Product({productName,imageURL,description,price, categoryId})
  newProduct.save().then((product)=>{
    res.status(201).json({message:'product created Successfully',product})
  }).catch((err)=>{
    console.error('Error creating product:',err);
    res.status(500).json({message:'Internal server error'})
  })
})
server.get('/products/:categoryId', (req, res, next) => {
  const categoryId = req.params.categoryId;

  Product.find({ categoryId: categoryId }).then((products) => {
    res.status(200).json({ products: products });
  }).catch((err) => {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Internal server error' });
  });

});

server.put('/edit-product/:id', (req, res, next) => {
  const productId = req.params.id;
  const updatedProductData = {
    productName: req.body?.productName,
    imageURL: req.body?.productImage,
    description: req.body?.productDescription,
    price: req.body?.productPrice,
    categoryId: req.body?.categoryId,
  };
  Product.findByIdAndUpdate(productId, updatedProductData).then((updatedProduct) => {
    if (updatedProduct) {
      res.status(200).json({ message: 'product updated successfully', product: updatedProduct });
    } else {
      res.status(404).json({ message: 'product not found' });
    }
  }).catch((err) => {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

server.post('/auth/user/register', (req, res, next) => {
  const { userName, email, password, mobile, address } = req.body;
  
  if (!userName || !email || !password || !mobile || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newUser = new User({ userName, email, password, mobile, address });
  
  newUser.save().then((user) => {
    res.status(201).json({ message: 'User registered successfully', user });
  }).catch((err) => {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

server.post('/auth/user/login',(req,res,next)=>{
  const {userName,password}= req.body
  if (!userName || !password){
    res.status(400).json({message:'username and password are required'})  
  }
  
  User.findOne({userName,password}).then((user)=>{
    if (user){
      return res.status(200).json({message:'login successful',user})
    }else{
      return res.status(401).json({message:'invalid username or password'})
    }
  }).catch((err)=>{
    console.error('error during user login:',err);
    res.status(500).json({message:'internal server error'})
  })
})

server.post('/add-to-cart',async(req,res,next)=>{
  const{userId,productId}=req.body;

  if(!userId || !productId){
    return res.status(400).json({message:'all fields are required'})
  }

  try{
    let cart= await Cart.findOne({userId:userId}).populate('itemIds');
    if (cart){
      const cartItem=cart.itemIds.find(cartItem=>cartItem.productId.toString()=== productId)
      if (cartItem) {
        cartItem.quantity += 1;
        await cartItem.save();
        let totalPrice= 0
       for(const cartItem of cart.itemIds){
       const product = await Product.findById(cartItem.productId);
       totalPrice += product.price * cartItem.quantity;
         }
         cart.totalPrice = totalPrice;
         await cart.save();
        return res.status(200).json({ message: 'Product quantity updated in cart' });
      }else{
        const newCartItem= new CartItem({productId, quantity:1});
        const savedCartItem= await newCartItem.save();
        cart.itemIds.push(savedCartItem._id);
        const updatedCart= await cart.save();
        let totalPrice= 0
        for(const cartItem of cart.itemIds){
        const product = await Product.findById(cartItem.productId);
         totalPrice += product.price * cartItem.quantity;
        }
        cart.totalPrice = totalPrice;
        await cart.save();
        return res.status(200).json({ message: 'Product added to cart', cart: updatedCart });
      }
    } else{
      const newCartItem= new CartItem({productId, quantity:1});
      const savedCartItem= await newCartItem.save();
      const populatedCartItem= await savedCartItem.populate('productId');
      const newCart= new Cart({
        userId,
        totalPrice: populatedCartItem.productId.price,
        itemIds:[populatedCartItem._id]
      });
      const createdCart= await newCart.save();
      return res.status(201).json({message:'Cart created and product added to cart',cart:createdCart})
    }
  } catch(err){
    console.error('Error adding product to cart:',err);
    res.status(500).json({message:'internal server error'})
  }
})

server.get('/cart-items/:userId', (req, res, next) => {
  const userId = req.params.userId;
  
  Cart.findOne({ userId: userId }).populate('itemIds').then((cart) => {
    res.status(200).json({ cart: cart || null });
    
  }).catch((err) => {
    console.error('Error fetching cart items:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

server.put('/remove-from-cart', async (req,res,next)=>{
const{userId,productId}= req.body;

if(!userId || !productId){
  return res.status(400).json({message:'all fields are required'})
}

try{
  const cart= await Cart.findOne({userId: userId}).populate('itemIds');
if(!cart){
  return res.status(404).json({message:'Cart not found for the user'})
}
const cartItemsIndex= cart.itemIds.findIndex(item=> item.productId.toString()=== productId);
if(cartItemsIndex=== -1){
  return res.status(404).json({message:'product not found in cart'})
}
const cartItem= cart.itemIds[cartItemsIndex];
if(cartItem.quantity=== 1){
  await CartItem.findByIdAndDelete(cartItem._id);
  cart.itemIds.splice(cartItemsIndex,1)
  await cart.save()
} else{
  cartItem.quantity= cartItem.quantity -1
  await cartItem.save()
}
let totalPrice= 0
for(const cartItem of cart.itemIds){
  const product = await Product.findById(cartItem.productId);
      totalPrice += product.price * cartItem.quantity;
}
 cart.totalPrice = totalPrice;
    await cart.save();

     return res.status(200).json({ message: 'Product removed from cart', cart: await Cart.findById(cart._id).populate('itemIds') });
}
catch (err) {
    console.error('Error in remove-from-cart:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }

 })

server.get('/populated-cart-items/:userId',async (req,res,next)=>{
  const userId= req.params.userId;
  try{
    const cart= await Cart.findOne({userId:userId}).populate('itemIds')
    if(!cart){
      return res.status(404).json({message:'cart is not found'})
    }
  response={}
  response.totalPrice= cart.totalPrice;
  response.items=[]
  for(const cartItem of cart.itemIds){
    const productId= cartItem.productId;
    const product= await Product.findById(productId);
    const item={...cartItem.toObject(),product};
    response.items.push(item); 
  }
  return res.status(200).json({cart:response})
  } catch(error){
   return res.status(500).json({message:'internal server error'})
  }

})

const PORT = process.env.PORT || 3000;

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not set. Copy .env.example to .env and fill it in.');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});
