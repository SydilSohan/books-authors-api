"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv")); // For secure environment variable handling
const client_1 = require("@prisma/client");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const CustomError_1 = __importDefault(require("./Utils/CustomError"));
const errorHandler_1 = __importDefault(require("./controllers/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set("trust proxy", 1);
const port = process.env.PORT || 3000;
app.use(express_1.default.json({
    limit: "50mb",
    verify(req, res, buf, encoding) {
        req.rawBody = buf;
    },
}));
const prisma = new client_1.PrismaClient();
// Use type alias for clarity
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    validate: { xForwardedForHeader: false }, //disabled xforwaded headers for testing purpose, will have to remove in production
    // store: ... , // Use an external store for consistency across multiple server instances.
});
// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.get("/authors", (req, res) => {
    prisma.author.findMany().then((authors) => {
        res.json(authors);
    });
});
app.get("/authors/:id", (req, res) => {
    const id = parseInt(req.params.id);
    prisma.author
        .findUnique({
        where: {
            id: id,
        },
    })
        .then((author) => {
        res.json(author);
    });
});
app.post("/authors", (req, res) => {
    const { name, bio, birthdate } = req.body;
    prisma.author
        .create({
        data: {
            name,
            bio,
            birthdate,
        },
    })
        .then((author) => {
        res.status(201).json(author);
    })
        .catch((error) => {
        res.status(400).json({ error: error.message });
    });
});
app.put("/authors/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, bio } = req.body;
    prisma.author
        .update({
        where: {
            id: id,
        },
        data: {
            name,
            bio,
        },
    })
        .then((author) => {
        res.json(author);
    })
        .catch((error) => {
        res.status(400).json({ error: error.message });
    });
});
app.delete("/authors/:id", (req, res) => {
    const id = parseInt(req.params.id);
    prisma.author
        .delete({
        where: {
            id: id,
        },
    })
        .then(() => {
        res.status(204).send();
    })
        .catch((error) => {
        res.status(400).json({ error: error.message });
    });
});
//order creation route
//error handle all unauthorised routes
app.all("*", (req, res, next) => {
    const err = new CustomError_1.default(`can't find ${req.originalUrl} on the server`, 403);
    next(err);
});
//global error handling middleware
app.use(errorHandler_1.default);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
