"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthor = exports.getAuthorById = exports.getAuthors = void 0;
const client_1 = require("@prisma/client");
const CustomError_1 = require("../Utils/CustomError");
const validation_1 = require("../Utils/validation");
const response_1 = require("../Utils/response");
const logger_1 = __importDefault(require("../Utils/logger"));
const prisma = new client_1.PrismaClient();
const getAuthors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield prisma.author.findMany();
        (0, response_1.successResponse)(res, authors);
    }
    catch (error) {
        const errorMessage = error.message || "Internal Server Error";
        logger_1.default.error(errorMessage);
        next(new CustomError_1.CustomError(errorMessage, 500));
    }
});
exports.getAuthors = getAuthors;
const getAuthorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    console.log(id), "here is id";
    try {
        const author = yield prisma.author.findUnique({
            where: { id },
        });
        console.log(author), "here is author";
        if (!author) {
            return next(new CustomError_1.CustomError("Author not found", 404));
        }
        (0, response_1.successResponse)(res, author);
    }
    catch (error) {
        const errorMessage = error.message || "Internal Server Error";
        logger_1.default.error(errorMessage);
        next(new CustomError_1.CustomError(errorMessage, 500));
    }
});
exports.getAuthorById = getAuthorById;
const createAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, validation_1.validateAuthor)(req.body);
    if (error) {
        return (0, response_1.errorResponse)(res, error.details[0].message, 400);
    }
    const { name, bio, birthdate } = req.body;
    try {
        const newAuthor = yield prisma.author.create({
            data: { name, bio, birthdate },
        });
        (0, response_1.successResponse)(res, newAuthor, "Author created successfully");
    }
    catch (error) {
        const errorMessage = error.message || "Internal Server Error";
        logger_1.default.error(errorMessage);
        next(new CustomError_1.CustomError(errorMessage, 500));
    }
});
exports.createAuthor = createAuthor;
