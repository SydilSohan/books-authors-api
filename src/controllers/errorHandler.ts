//global error handler controller 
import { Request, Response, NextFunction } from "express";
module.exports =  (error : any, req : Request, res : Response, next : NextFunction) => {
    error.statusCode  =  error.statusCode || 500;
    error.status = error.status || "error";
    error.message = error.message || "Internal server error"
    res.status(error.statusCode).json({
      status : error.status,
      message : error.message,
      statusCode : error.statusCode
    })
    }