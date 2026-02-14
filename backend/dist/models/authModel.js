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
exports.findUserByEmailModel = exports.createUserModel = void 0;
const db_1 = __importDefault(require("../config/db"));
const createUserModel = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, password]);
    return result.rows[0];
});
exports.createUserModel = createUserModel;
const findUserByEmailModel = (email) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield db_1.default.query("SELECT * FROM users WHERE email = $1", [email]);
    return (_a = result.rows[0]) !== null && _a !== void 0 ? _a : null;
});
exports.findUserByEmailModel = findUserByEmailModel;
// import pool from "../config/db";
// import { QueryResult } from 'pg';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// // Interface para o modelo User
// interface User {
//     id: number;
//     name: string;
//     email: string;
//     password: string;
//     created_at?: Date;
// }
// export const createUserModel = async (name: string, email: string, password: string): Promise<User> => {
//     const result: QueryResult<User> = await pool.query(
//         "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
//         [name, email, password]
//     );
//     return result.rows[0];
// };
// export const registerUserModel = async (name: string, email: string, password: string): Promise<User> => {
//     const result: QueryResult<User> = await pool.query(
//         "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
//         [name, email, password]
//     );
//     return result.rows[0];
// };
// export const loginUserModel = async (
//     email: string,
//     password: string
// ): Promise<User | null> => {
//     // busca usuário pelo email (igual você já fez)
//     const result: QueryResult<User> = await pool.query(
//         "SELECT * FROM users WHERE email = $1",
//         [email]
//     );
//     const user = result.rows[0];
//     if (!user) {
//         return null;
//     }
//     // // valida senha AQUI porque você insistiu em manter no model
//     // const isPasswordValid = await bcrypt.compare(password, user.password);
//     // if (!isPasswordValid) {
//     //     return null;
//     // }
//     return user;
// };
// /*
// export const findUserByEmailModel = async (
//   email: string
// ): Promise<User | null> => {
//   const result: QueryResult<User> = await pool.query(
//     "SELECT * FROM users WHERE email = $1",
//     [email]
//   );
//   return result.rows[0] ?? null;
// };
//  */
