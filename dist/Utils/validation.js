"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuthor = void 0;
// src/utils/validation.ts
const joi_1 = __importDefault(require("joi"));
const validateAuthor = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).required(),
        bio: joi_1.default.string().min(10).required(),
        birthdate: joi_1.default.date().required(),
    });
    return schema.validate(data);
};
exports.validateAuthor = validateAuthor;
