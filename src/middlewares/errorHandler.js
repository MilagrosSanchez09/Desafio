import { HttpResponse } from "./httpResponse.js";

const httpResponse = new HttpResponse();

export const errorHandler = (error, req, res, next) => {
    console.log('Error middleware:', error);

    if (error.code === 'NOT_FOUND') {
        return httpResponse.NotFound(res, error.message);
    } else if (error.code === 'UNAUTHORIZED') {
        return httpResponse.Unauthorized(res, error.message);
    } else if (error.code === 'FORBIDDEN'){
        return httpResponse.Forbidden(res, error.message);
    } else {
        return httpResponse.ServerError(res, error.message);
    }
};