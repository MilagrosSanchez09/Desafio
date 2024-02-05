import path from 'path';
import ProductService from "../services/product.services.js";
import CartService from "../services/cart.services.js";
import { errorsDictionary } from '../middlewares/httpResponse.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const { page, limit, sort, query } = req.query;
    const user = req.user;
    const products = await ProductService.getAllProducts(page, limit, sort, query)

    console.log(products);
    
    let srtOptions = "";
    if  (limit){
      srtOptions += "&limit=" + limit;
    };
    if(sort) {
      srtOptions += "&sort=" + sort;
    };

    products.prevLink = products.hasPrevPage ? urlBase + "?page=" + products.prevPage + srtOptions : null;
    products.nextLink = products.hasNextPage ? urlBase + "?page=" + products.nextPage + srtOptions : null;

    res.render('products', { user, products });
  } catch (error) {
    next(error);
  };
};

export const getProductById= async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await ProductService.getProductById(productId);

    if (!product) {
      res.json({ msg: errorsDictionary.ERROR_PRODUCT_NOT_FOUND });
    } else {
      res.json(product);
    };
  } catch (error) {
    next(error);
  };
};

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = await ProductService.createProduct(req.body);

    if (!newProduct) {
      res.json({ msg: errorsDictionary.ERROR_CREATE_PRODUCT });
    } else {
      res.json(newProduct);
    };
  } catch (error) {
    next (error);
  };
};

export const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const productUpdt = await ProductService.updateProduct(productId, req.body);

    if (!productUpdt) {
      res.json({msg: errorsDictionary.ERROR_PRODUCT_NOT_FOUND });
    } else {
      res.json (productUpdt);
    };
  } catch(error){
    next(error);
  ;}
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await ProductService.getProductById(productId);

    if (!product) {
      return res.json({ msg: errorsDictionary.ERROR_PRODUCT_NOT_FOUND });
    }

    const stock = product.stock || 0;

    const cartsWithProduct = await await CartService.getCartsWithProduct(productId);

    if (cartsWithProduct.length > 0) {
      return res.json({
        msg: errorsDictionary.ERROR_INVALID_CART,
        cartsWithProduct,
      });
    }

    const productDel = await ProductService.deleteProduct(productId);

    if (!productDel) {
      res.json({ msg: errorsDictionary.ERROR_PRODUCT_NOT_FOUND });
    } else {
      res.json(productDel);
    }
  } catch (error) {
    next (error);
  };
};

  export const generateMockedProducts = async (req, res, next) => {
    try {
      const mockedProducts = await ProductService.generateMockedProducts();
      res.json(mockedProducts);
    } catch (error) {
      next (error);
    }
  };