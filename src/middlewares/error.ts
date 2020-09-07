import {NextFunction, Request, Response} from 'express';
import {HttpException} from '../lib';

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Error in retrieving data!';
    response
        .status(status)
        .send({
            status,
            message,
        });
}

export default errorMiddleware;
