const HttpStatus = {
    OK: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
  };
  
  export const errorsDictionary = {
    ERROR_CREATE_PRODUCT: 'Error creating product',
    ERROR_ADD_TO_CART: 'Error adding product to cart',
    ERROR_CREATE_USER: 'Error creating user',
    ERROR_CREATE_CART: 'Error creating cart',
    ERROR_PRODUCT_NOT_FOUND: 'Product not found',
    ERROR_INVALID_USER: 'Invalid user',
    ERROR_INVALID_CART: 'Invalid cart',
    ERROR_UPDATE_PRODUCT: 'Error updating product',
    ERROR_DELETE_PRODUCT: 'Error deleting product',
    ERROR_CART_NOT_FOUND: 'Cart not found',
    ERROR_PRODUCT_NOT_AVAILABLE: 'Product not available',
    ERROR_CART_OR_PRODUCT_NOT_FOUND: 'Cart or product not found',
    ERROR_UNAUTHORIZED: 'User not authorized',
    ERROR_TICKET_NOT_FOUND: 'Ticket not found',
    ERROR_MOCKED_PRODUCTS: 'Error creating mocked products',
  }
  
  export class HttpResponse {
    Ok(res, data) {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "Success",
        data: data,
      });
    }
  
    NotFound(res, data) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: "Not Found",
        error: data,
      });
    }
  
    Unauthorized(res, data) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: HttpStatus.UNAUTHORIZED,
        message: "Unauthorized",
        error: data,
      });
    }
  
    Forbidden(res, data) {
      return res.status(HttpStatus.FORBIDDEN).json({
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden",
        error: data,
      });
    }
  
    ServerError(res, data) {
      const errorMessage = data instanceof Error ? data.message: data;
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error",
        error: errorMessage,
      });
    }
  }