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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = __importDefault(require("../models/User"));
var authGuard = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decoded, _a, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(req.headers.authorization &&
                    req.headers.authorization.startsWith("Bearer"))) return [3 /*break*/, 5];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                token = req.headers.authorization.split(" ")[1];
                decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN);
                /* req.user: {
                    _id: new ObjectId("62fd9f3036e6fe1f5552de47"),
                    username: 'aa@aa.com',
                    email: 'aa@aa.com',
                    ...
                    __v: 1  }
                 */
                // select("-password"): 表示排除掉 password 字段，不放到 req.user 里。
                // req.user 是在下面的 next() 里传递给下一个中间件的。
                // 也就是说，下一个中间件可以直接使用 req.user 来获取用户信息。
                _a = req;
                return [4 /*yield*/, User_1.default.findById(decoded.id).select("-password")];
            case 2:
                /* req.user: {
                    _id: new ObjectId("62fd9f3036e6fe1f5552de47"),
                    username: 'aa@aa.com',
                    email: 'aa@aa.com',
                    ...
                    __v: 1  }
                 */
                // select("-password"): 表示排除掉 password 字段，不放到 req.user 里。
                // req.user 是在下面的 next() 里传递给下一个中间件的。
                // 也就是说，下一个中间件可以直接使用 req.user 来获取用户信息。
                _a.user = _b.sent();
                next();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                (error_1); // 401 Unauthorized Error
                res.status(401).json({ message: "Token failed ,you are not authorized" });
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(401).json({ message: "Token failed, no token provided" });
                _b.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.authGuard = authGuard;
