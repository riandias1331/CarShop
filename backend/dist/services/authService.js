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
exports.loginUserService = exports.registerUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const authModel_1 = require("../models/authModel");
const registerUserService = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield (0, authModel_1.findUserByEmailModel)(email);
    if (existingUser) {
        throw new Error("Email already in use");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    return yield (0, authModel_1.createUserModel)(name, email, hashedPassword);
});
exports.registerUserService = registerUserService;
const loginUserService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, authModel_1.findUserByEmailModel)(email);
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isValid) {
        throw new Error("Invalid credentials");
    }
    return user;
});
exports.loginUserService = loginUserService;
