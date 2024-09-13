"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = __importDefault(require("@src/Utils/logger"));
const errorHandler = (err, req, res, next) => {
    logger_1.default.error(err.message, { stack: err.stack });
    res.status(err.statusCode || 500).json({
        status: "error",
        message: err.message || "Internal Server Error",
    });
};
exports.errorHandler = errorHandler;
