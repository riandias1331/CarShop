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
exports.deleteUserAll = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUserAll = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const userService_1 = require("../services/userService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getAllUsersService)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserAll = getUserAll;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }
        const user = yield userModel_1.default.create({ name, email, password });
        // Gera o token JWT
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('token:', token, user);
        res.status(201).json({ message: 'User created successfully', token, user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const userUpdated = req.body;
        const user = yield userModel_1.default.findByIdAndUpdate(userId, userUpdated, { new: true });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield userModel_1.default.findByIdAndDelete(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUser = deleteUser;
const deleteUserAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.deleteMany();
        if (!user) {
            return res.status(400).json({ message: "Users not found" });
        }
        res.status(200).json({ message: "Users  deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUserAll = deleteUserAll;
//
