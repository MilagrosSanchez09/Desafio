import { CartManager } from "../managers/cartManager.js";

const cartManager = new CartManager();

export const getAllCarts = async (req, res, next) => {
  try {
    const carts = await cartManager.getAll();
    res.json(carts);
  } catch (error){
    next(error)
  }
};

export const deleteProductFromCart = async (req, res, next) => {
  try {
    const { cid, pid} = req.params;
    const productDel = await cartManager.deleteProductFromCart(cid, pid);

    res.json(productDel);
  }catch (error) {
    next (error);
  };
};

export const createCart = async (req, res, next) =>{
  try {
      const newCart = await cartManager.createCart(req.body);
      if(!newCart){
          res.json({msg: 'No se pude crear el carrito'})
      } else {
          res.json(newCart);
      }
  }catch (error) {
      next(error)    
  }
};

export const updateCart = async (req, res, next) => {
  const { cid } = req.params;
  const body = req.body;
  const updatedCart = await cartManager.saveProductToCart(cid, body);

  if (updatedCart) {
    res.status(200).json(updatedCart);
  } else {
    res.status(404).json({ error: 'Carrito o producto no encontrado' });
  }
};


export const updateCartProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const body = req.body;
    const updatedCart = await cartManager.updCartProductsAmount (cid, pid, body);

    return res.json(updatedCart);
  } catch (error) {
    next (error)
  }
};

