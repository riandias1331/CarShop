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
exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authService_1 = require("../services/authService");
const handleResponse = (res, status, message, data, token) => {
    res.status(status).json(Object.assign({ status,
        message,
        data }, (token && { token })));
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            handleResponse(res, 400, "Name, email and password are required");
            return;
        }
        const user = yield (0, authService_1.registerUserService)(name, email, password);
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        handleResponse(res, 201, "User registered successfully", { id: user.id, name: user.name, email: user.email }, token);
    }
    catch (error) {
        handleResponse(res, 400, error.message);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            handleResponse(res, 400, "Email and password are required");
            return;
        }
        const user = yield (0, authService_1.loginUserService)(email, password);
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        handleResponse(res, 200, "Login successful", { id: user.id, name: user.name, email: user.email }, token);
        console.log('User logged in:', user.email);
    }
    catch (error) {
        handleResponse(res, 400, error.message);
    }
});
exports.loginUser = loginUser;
