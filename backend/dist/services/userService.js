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
exports.deleteAllUsersService = exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserByIdService = exports.getAllUsersService = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.find();
});
exports.getAllUsersService = getAllUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.findById(id);
});
exports.getUserByIdService = getUserByIdService;
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Como usamos o pre('save') no model, a senha será hashada automaticamente aqui
    const user = new userModel_1.default(userData);
    return yield user.save();
});
exports.createUserService = createUserService;
const updateUserService = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.findByIdAndUpdate(id, updateData, { new: true });
});
exports.updateUserService = updateUserService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.findByIdAndDelete(id);
});
exports.deleteUserService = deleteUserService;
const deleteAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.deleteMany();
});
exports.deleteAllUsersService = deleteAllUsersService;
// // src/services/userService.ts
// import { prisma } from '../config/db';
// import bcrypt from 'bcrypt';
// export const createUser = async (data: { name: string; email: string; password: string }) => {
//   const hashedPassword = await bcrypt.hash(data.password, 10);
//   return prisma.user.create({
//     data: {
//       name: data.name,
//       email: data.email,
//       password: hashedPassword,
//     },
//   });
// };
// export const findUserByEmail = async (email: string) => {
//   return prisma.user.findUnique({ where: { email } });
