"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validator_1 = __importDefault(require("../utils/validator"));
const route = (0, express_1.Router)();
route.post('/register', validator_1.default, authController_1.registerUser);
route.post('/login', validator_1.default, authController_1.loginUser);
exports.default = route;
