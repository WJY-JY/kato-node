(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//kato 错误基类
class KatoError extends Error {
    constructor(message = "未知错误", code) {
        super(message);
        this.code = code;
        this.name = "KatoError";
    }
}
exports.KatoError = KatoError;
//kato 通用错误,错误码为0,这类错误可以直接显示给人类查看
class KatoCommonError extends KatoError {
    constructor(message) {
        if (typeof message !== 'string') {
            console.error(`KatoCommonError用于通用错误的表示,请保证message参数的可阅读性`);
        }
        super(message, 0);
        this.name = 'KatoCommonError';
    }
}
exports.KatoCommonError = KatoCommonError;
//kato 逻辑错误,错误码>0,这类错误是需要客户端根据code来做不同处理的
class KatoLogicError extends KatoError {
    constructor(message, code) {
        if (code <= 0) {
            console.error(`KatoLogicError仅仅使用于特殊的错误处理逻辑,根据规范,请保证错误编码>0`);
        }
        super(message, code);
    }
}
exports.KatoLogicError = KatoLogicError;
//kato 运行时错误,错误码为-1,这类错误属于框架错误,必须及时处理
class KatoRuntimeError extends KatoError {
    constructor(message = "未知运行时错误") {
        super(message, -1);
        this.name = 'KatoRuntimeError';
    }
}
exports.KatoRuntimeError = KatoRuntimeError;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dayjs = __webpack_require__(23);
const ISO8601Regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]?\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]?\d:[0-5]\d|Z))/;
function reviver(key, value) {
    if (typeof value === 'string')
        if (ISO8601Regex.exec(value))
            return dayjs(value).toDate();
    return value;
}
exports.reviver = reviver;
function replacer(key, value) {
    if (typeof value === 'string')
        if (ISO8601Regex.exec(value))
            return dayjs(value).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    return value;
}
exports.replacer = replacer;
function jsonParse(text) {
    return JSON.parse(text, reviver);
}
exports.jsonParse = jsonParse;
function jsonStringify(value) {
    return JSON.stringify(value, replacer);
}
exports.jsonStringify = jsonStringify;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function middlewareWrapper(nativeMiddleware) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                nativeMiddleware(req, res, function (err) {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
            });
        });
    };
}
exports.middlewareWrapper = middlewareWrapper;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug = __webpack_require__(0)('kato:middle:stub');
//缓存
let stubCache;
//清除stub缓存
function cleanStubCache() {
    stubCache = null;
}
exports.cleanStubCache = cleanStubCache;
//存根信息中间件,用于相应客户端的存根信息
function stub(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.req.url === "/stub.json") {
            if (!stubCache) {
                //构建缓存
                const stub = {
                    modules: []
                };
                for (const [moduleName, module] of ctx.kato.modules) {
                    const moduleStub = {
                        name: moduleName,
                        methods: []
                    };
                    for (const [methodName, method] of module.methods) {
                        moduleStub.methods.push({
                            name: methodName,
                            parameters: method.parameters.map(it => ({ name: it.name, type: it.type }))
                        });
                    }
                    stub.modules.push(moduleStub);
                }
                stubCache = JSON.stringify(stub);
                debug('生成stub');
            }
            ctx.res.setHeader("Content-Type", "application/json");
            ctx.res.body = stubCache;
            //跳过正常的返回转换
            ctx.bypassing = true;
        }
        else
            yield next();
    });
}
exports.default = stub;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi = __webpack_require__(25);
const error_1 = __webpack_require__(1);
const debug = __webpack_require__(0)('kato:middle:validate');
//参数验证中间件
function paramValidate(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //拿到所有的参数,并且挨个验证
        const validate = ctx.method.method.__validate;
        if (validate instanceof Array) {
            ctx.method.parameters
                .map((p, index) => ({
                name: p.name,
                value: ctx.parameters[p.name],
                schema: validate[index]
            }))
                .filter(it => it.schema)
                .forEach(it => {
                const result = joi.validate(it.value, it.schema.label(it.name), { convert: false });
                if (result.error) {
                    throw new error_1.KatoRuntimeError(`${ctx.module.name}.${ctx.method.name} => ${result.error.message}`);
                }
            });
        }
        yield next();
    });
}
exports.default = paramValidate;
//validate注解
function validate(...schemas) {
    return function (target, key) {
        if (key && typeof target[key] === 'function') {
            target[key].__validate = schemas.map(it => {
                if (it !== null && it !== undefined && !it['isJoi']) {
                    return joi.compile(it);
                }
                return it;
            });
        }
        else {
            throw new Error('kato:validate只能作用于方法上');
        }
    };
}
exports.validate = validate;
exports.should = joi;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __webpack_require__(1);
const debug = __webpack_require__(0)('kato:middle:auth');
const authFuncsSymbol = Symbol('kato-auth-functions');
//验证中间件,用于验证是否有调用权限
function authenticate(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authFuncs = ctx.method.method[authFuncsSymbol];
        if (authFuncs instanceof Array) {
            //将验证函数变成为or组合
            const combinedAuth = or(...authFuncs);
            if (!(yield combinedAuth(ctx)))
                throw new error_1.KatoRuntimeError(`不具备调用${ctx.module.name}.${ctx.method.name}的权限`);
        }
        yield next();
    });
}
exports.default = authenticate;
//auth注解
function auth(...authFuncs) {
    return function (target, key) {
        if (key && typeof target[key] === 'function') {
            target[key][authFuncsSymbol] = authFuncs;
        }
        else {
            throw new Error('kato:auth只能作用于方法上');
        }
    };
}
exports.auth = auth;
//产生一个新的验证函数,新验证函数的返回值与原验证函数相反
function not(authFunc) {
    return function (ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof authFunc === 'function')
                return !(yield authFunc(ctx));
            else
                return true;
        });
    };
}
exports.not = not;
//产生一个新的验证函数,将原验证函数返回值做or运算
function or(...authFuncs) {
    return function (ctx) {
        if (authFuncs.length < 1)
            return true;
        return new Promise((resolve, reject) => {
            //并行地执行验证函数,并拿到结果
            const results = authFuncs.map(func => {
                const result = func(ctx) || false;
                //将返回值promise化
                return result.then ? result : Promise.resolve(result);
            });
            //已经完成的promise计数
            let completed = 0;
            //轮番判断所有的结果
            for (const result of results) {
                result.then(r => {
                    completed++;
                    if (r)
                        //如果返回结果是true,因为这是or组合,所以也无需等待其他的返回结果,直接resolve大的Promise
                        resolve(true);
                    else if (completed === results.length)
                        //如果返回结果是false,且自己是最后一个了,直接返回false
                        resolve(false);
                }).catch(err => {
                    completed++;
                    //如果有错误,无需等待其他,直接可以reject大的Promise
                    reject(err);
                });
            }
        });
    };
}
exports.or = or;
//产生一个新的验证函数,将原验证函数返回值做and运算
function and(...authFuncs) {
    return function (ctx) {
        if (authFuncs.length < 1)
            return true;
        return new Promise((resolve, reject) => {
            //并行地执行验证函数,并拿到结果
            const results = authFuncs.map(func => {
                const result = func(ctx) || false;
                //将返回值promise化
                return result.then ? result : Promise.resolve(result);
            });
            //已经完成的promise计数
            let completed = 0;
            //轮番判断所有的结果
            for (const result of results) {
                result.then(r => {
                    completed++;
                    //如果返回结果是false,因为这是and组合,所以也无需等待其他的返回结果,直接resolve大的Promise
                    if (!r)
                        resolve(false);
                    else if (completed === results.length)
                        //如果返回结果是true,且自己是最后一个了,直接返回true
                        resolve(true);
                }).catch(err => {
                    completed++;
                    //如果有错误,无需等待其他,直接可以reject大的Promise
                    reject(err);
                });
            }
        });
    };
}
exports.and = and;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __webpack_require__(1);
const debug = __webpack_require__(0)('kato:middle:parse');
const regex = /^\/(?:([^\/]+?))\/(?:([^\/]+?))\.ac$/;
//解析url中的模块名和方法名
function parse(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = ctx.req.url.split('?')[0];
        const match = regex.exec(path);
        //如果路由不匹配
        if (!match) {
            throw new error_1.KatoRuntimeError("请求url不符合规范");
        }
        //查找对应的模块和方法
        let moduleName = match[1];
        let methodName = match[2];
        let module = ctx.kato.modules.get(moduleName);
        if (module) {
            let method = module.methods.get(methodName);
            if (method) {
                ctx.module = module;
                ctx.method = method;
                debug(`模块: ${module.name} 方法: ${method.name}`);
                yield next();
            }
            else {
                throw new error_1.KatoRuntimeError(`模块${moduleName}中找不到对应的方法${methodName}`);
            }
        }
        else {
            throw new error_1.KatoRuntimeError(`找不到对应的模块${moduleName}`);
        }
    });
}
exports.default = parse;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url = __webpack_require__(21);
const qs = __webpack_require__(22);
const json_1 = __webpack_require__(2);
const error_1 = __webpack_require__(1);
//解析来自query的参数
function queryString(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //解析query string
        const query = qs.parse(url.parse(ctx.req.url).query);
        //注入到parameters中
        if (query)
            Object.getOwnPropertyNames(query).forEach(name => {
                if (ctx.method.parameters.findIndex(p => p.name === name) !== -1) {
                    try {
                        ctx.parameters[name] = json_1.jsonParse(query[name]);
                    }
                    catch (e) {
                        //如果是loose模式,则当出现无法解析的情况的时候,把它转换为字符串再解析
                        if (ctx.kato.options.loose)
                            ctx.parameters[name] = json_1.jsonParse(JSON.stringify(query[name]));
                        else
                            throw new error_1.KatoRuntimeError(e.message);
                    }
                }
            });
        yield next();
    });
}
exports.default = queryString;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_utils_1 = __webpack_require__(3);
const bodyParser = __webpack_require__(10);
const json_1 = __webpack_require__(2);
//解析post中application/json编码的参数
function jsonBody(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const req = ctx.req;
        const res = ctx.res;
        //解析json类型的数据
        const jsonParser = middleware_utils_1.middlewareWrapper(bodyParser.json({ reviver: json_1.reviver, limit: '10240kb' }));
        yield jsonParser(req, res);
        const body = req.body;
        //注入到parameters中,application/json类型的post不需要做json的反序列化了
        if (body)
            Object.getOwnPropertyNames(body).forEach(name => {
                if (ctx.method.parameters.findIndex(p => p.name === name) !== -1) {
                    ctx.parameters[name] = body[name];
                }
            });
        //删掉中间产生的req.body
        req.body = null;
        yield next();
    });
}
exports.default = jsonBody;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_utils_1 = __webpack_require__(3);
const bodyParser = __webpack_require__(10);
const json_1 = __webpack_require__(2);
const error_1 = __webpack_require__(1);
//解析post中url-encoded编码的参数
function urlEncoded(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const req = ctx.req;
        const res = ctx.res;
        //解析json类型的数据
        const jsonParser = middleware_utils_1.middlewareWrapper(bodyParser.urlencoded({ extended: false }));
        yield jsonParser(req, res);
        const body = req.body;
        //注入到parameters中
        if (req.body)
            Object.getOwnPropertyNames(body).forEach(name => {
                if (ctx.method.parameters.findIndex(p => p.name === name) !== -1) {
                    try {
                        ctx.parameters[name] = json_1.jsonParse(req.body[name]);
                    }
                    catch (e) {
                        //如果是loose模式,则当出现无法解析的情况的时候,把它转换为字符串再解析
                        if (ctx.kato.options.loose)
                            ctx.parameters[name] = json_1.jsonParse(JSON.stringify(body[name]));
                        else
                            throw new error_1.KatoRuntimeError(e.message);
                    }
                }
            });
        //删掉中间产生的req.body
        req.body = null;
        yield next();
    });
}
exports.default = urlEncoded;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_utils_1 = __webpack_require__(3);
const multer = __webpack_require__(24);
const json_1 = __webpack_require__(2);
const error_1 = __webpack_require__(1);
//解析post中multipart参数
function multipart(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const req = ctx.req;
        const res = ctx.res;
        //解析multipart数据
        const multipartParser = middleware_utils_1.middlewareWrapper(multer({
            storage: ctx.kato.options.files.storage || multer.memoryStorage(),
            limits: {
                files: ctx.kato.options.files.maxCount,
                fileSize: ctx.kato.options.files.maxSize
            },
        }).any());
        yield multipartParser(req, res);
        //文件解析
        req.files && req.files.forEach(file => {
            if (ctx.method.parameters.findIndex(p => p.name === file.fieldname) !== -1) {
                ctx.parameters[file.fieldname] = file;
            }
        });
        //multipart模式下,文件以外的字段在req.body中,所以同样也需要解析
        if (req.body)
            Object.getOwnPropertyNames(req.body).forEach(name => {
                if (ctx.method.parameters.findIndex(p => p.name === name) !== -1) {
                    try {
                        ctx.parameters[name] = json_1.jsonParse(req.body[name]);
                    }
                    catch (e) {
                        //如果是loose模式,则当出现无法解析的情况的时候,把它转换为字符串再解析
                        if (ctx.kato.options.loose)
                            ctx.parameters[name] = json_1.jsonParse(JSON.stringify(req.body[name]));
                        else
                            throw new error_1.KatoRuntimeError(e.message);
                    }
                }
            });
        //删掉中间产生的req.body和req.files
        req.body = null;
        req.files = null;
        yield next();
    });
}
exports.default = multipart;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = __webpack_require__(2);
const error_1 = __webpack_require__(1);
const debug = __webpack_require__(0)('kato:middle:respond');
function respond(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = ctx.res;
        try {
            //直接传递到下一个中间件
            yield next();
            //如果跳过正常响应,或者res处于不可写的状态,则直接返回
            if (ctx.bypassing || !res.writable)
                return;
            //处理正常的返回
            res.setHeader("Content-Type", "application/json");
            res.body = json_1.jsonStringify(ctx.result);
        }
        catch (e) {
            //抓住中间件中的错误
            let err = e;
            if (!(e instanceof error_1.KatoError)) {
                //如果不是一个KatoError,可以将它转化为KatoError
                err = new error_1.KatoRuntimeError(e.message);
                err.stack = e.stack || '';
            }
            //准备输出错误信息到http连接
            res.setHeader("Content-Type", "application/json");
            res.body = json_1.jsonStringify({
                _KatoErrorCode_: err.code,
                _KatoErrorMessage_: err.message,
                _KatoErrorStack_: ctx.kato.options.dev ? err.stack : ''
            });
            if (ctx.kato.options.outputRuntimeError) {
                //输出到http的同时,针对运行时错误,还需要输出到控制台,以便记录
                if (err instanceof error_1.KatoRuntimeError) {
                    console.error(err);
                }
            }
        }
    });
}
exports.default = respond;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//调用中间件,用于调用真实的方法
function invoke(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //初始化参数
        const args = ctx.method.parameters.map(p => ctx.parameters[p.name]);
        //实例化module
        const module = new ctx.module.module();
        //代理context
        const moduleProxy = new Proxy(module, {
            get(target, key) {
                if (key === 'context') {
                    console.warn('kato: 通过this.context来获取上下文的方式已经过时,请使用Context.current来获取当前执行的上下文');
                    return ctx;
                }
                else {
                    return target[key];
                }
            }
        });
        //调用方法,同时也处理好异步
        ctx.result = yield ctx.method.method.apply(moduleProxy, args);
        //继续下一个中间件,如果有需要的话
        yield next();
    });
}
exports.default = invoke;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function cors(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.kato.options.cors) {
            const options = ctx.kato.options.cors;
            let headers;
            if (options.headers instanceof Array) {
                headers = options.headers.join(',');
            }
            else {
                //如果配置中没有指定headers,默认从请求中获取
                headers = ctx.req.headers['access-control-request-headers'] || ['Content-Type', 'Content-Length'].join(',');
            }
            // 跨域配置
            ctx.res.setHeader("Access-Control-Allow-Origin", options.origin);
            ctx.res.setHeader('Access-Control-Allow-Methods', options.methods.join(","));
            ctx.res.setHeader('Access-Control-Allow-Headers', headers);
            // OPTIONS 请求快速返回
            if (ctx.req.method === 'OPTIONS') {
                ctx.res.statusCode = options.optionsStatusCode;
                ctx.res.setHeader('Content-Length', 0);
                //跳过正常的返回值转换
                ctx.bypassing = true;
                return;
            }
        }
        yield next();
    });
}
exports.default = cors;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __webpack_require__(26);
const cls_hooked_1 = __webpack_require__(27);
const context_1 = __webpack_require__(17);
const middleware_1 = __webpack_require__(32);
const module_1 = __webpack_require__(19);
const options_1 = __webpack_require__(34);
const transformer_1 = __webpack_require__(37);
const debug = __webpack_require__(0)('kato:core');
//CLS存储空间
exports.katoCLS = cls_hooked_1.createNamespace('kato');
class Kato {
    constructor(options = {}) {
        //中间件容器
        this.middlewares = new middleware_1.MiddlewareContainer();
        //模块容器
        this.modules = new module_1.ModuleContainer();
        //添加中间件
        this.use = this.middlewares.use.bind(this.middlewares);
        //添加中间件
        this.useAfter = this.middlewares.useAfter.bind(this.middlewares);
        //加载api模块
        this.load = this.modules.load.bind(this.modules);
        this.options = options_1.getOptions(options);
    }
    //执行来自适配器过来的实例
    do(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield exports.katoCLS.runAndReturn(() => __awaiter(this, void 0, void 0, function* () {
                //新建一个kato的context
                const ctx = new context_1.default(req, res);
                ctx.kato = this;
                //交给中间件去处理
                yield this.middlewares.do(ctx);
                //中间件处理完毕,开始把res的结果输出到http
                transformer_1.transformer(ctx.res);
            }));
        });
    }
    //启动原生服务器
    listen(port, hostname = "localhost") {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(((resolve, reject) => {
                this.server = http.createServer(this.do.bind(this));
                this.server.listen.call(this.server, port, hostname, err => {
                    err ? reject(err) : resolve();
                });
            }));
        });
    }
    ;
    //关闭node原生服务器
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.server.close.call(this.server, () => {
                    resolve();
                });
            });
        });
    }
    ;
}
exports.default = Kato;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const kato_1 = __webpack_require__(16);
const request_1 = __webpack_require__(28);
const response_1 = __webpack_require__(29);
//上下文在存储中的key
const contextSymbol = Symbol('kato-context');
class Context {
    /**
     * 初始化一个kato上下文
     * @param req 原生的http请求
     * @param res 原生的http响应
     */
    constructor(req, res) {
        this.parameters = {};
        //是否由respond中间件来把result或者异常转换为KatoResponse的输出
        this.bypassing = false;
        this.req = request_1.createRequest(req);
        this.res = response_1.createResponse(res);
        //把当前上下文,注入到存储中去
        kato_1.katoCLS.set(contextSymbol, this);
    }
    //获取当前的异步路径的上下文
    static get current() {
        return kato_1.katoCLS.get(contextSymbol);
    }
}
exports.default = Context;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const getParameterNames = __webpack_require__(33);
const stub_1 = __webpack_require__(4);
const debug = __webpack_require__(0)('kato:core:module');
const aliasSymbol = Symbol('kato-alias');
class ModuleDescriptor {
    constructor(module) {
        this.module = module;
        this.name = module[aliasSymbol] || module.name;
        if (!this.name)
            throw new Error("kato:模块类不能是匿名类");
        //开始填充函数
        this.methods = new Map();
        //获取类中的所有属性
        let props = [];
        let instance = new module();
        let tempInstance = instance;
        do {
            //遍历获取所有的属性名
            if (tempInstance.isPrototypeOf(Object))
                continue;
            props = props.concat(Object.getOwnPropertyNames(tempInstance));
        } while (tempInstance = Object.getPrototypeOf(tempInstance));
        //获取到所有的成员函数包括继承来的,并解析成为MethodDescriptor
        props
            .filter(it => typeof instance[it] === 'function') //必须是函数
            .filter(it => ![
            'constructor',
            // '__defineGetter__',
            // '__defineSetter__',
            // '__lookupGetter__',
            // '__lookupSetter__',
            'isPrototypeOf',
            'hasOwnProperty',
            'propertyIsEnumerable',
        ].includes(it)) //过滤掉Object或者Function上的内置函数
            .filter(it => !it.startsWith('_')) //过滤掉_开头的函数
            .filter((it, index, arr) => arr.indexOf(it) === index) //去重
            .forEach(it => {
            let method = new MethodDescriptor(instance[it], module);
            this.methods.set(method.name, method);
        });
    }
}
exports.ModuleDescriptor = ModuleDescriptor;
class MethodDescriptor {
    constructor(method, parent) {
        this.method = method;
        this.parent = parent;
        this.name = method[aliasSymbol] || method.name;
        if (!this.name)
            throw new Error("kato:不允许有匿名方法");
        //获取所有的参数
        this.parameters = getParameterNames(method)
            .map(name => new ParameterDescriptor(name, "any"));
    }
    toString() {
        return `${this.name}(${this.parameters.join(', ')})`;
    }
}
exports.MethodDescriptor = MethodDescriptor;
class ParameterDescriptor {
    //目前暂时支持5种类型
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    toString() {
        return `${this.name}: ${this.type}`;
    }
}
exports.ParameterDescriptor = ParameterDescriptor;
//模块容器
class ModuleContainer extends Map {
    constructor() {
        super();
    }
    load(moduleClass) {
        if (typeof moduleClass !== 'function') {
            debug(`企图加载一个${typeof moduleClass}被阻止`);
            throw new Error('kato:只有类才能被加载');
        }
        //解析模块为模块描述,并添加到容器中
        let module = new ModuleDescriptor(moduleClass);
        this.set(module.name, module);
        //清除stub缓存
        stub_1.cleanStubCache();
        //输出模块概要信息
        let methodNames = [];
        for (let methodName of module.methods.keys()) {
            methodNames.push(methodName);
        }
        debug(`模块${module.name}加载完成,函数${module.methods.size}个`);
        for (let method of module.methods.values()) {
            debug(`-> ${method}`);
        }
    }
}
exports.ModuleContainer = ModuleContainer;
//别名注解
function alias(name) {
    if (name) {
        return function (object, key) {
            let target = object;
            if (key)
                target = object[key];
            if (typeof target !== 'function') {
                throw new Error('kato:alias只能作用于类及其方法上');
            }
            target[aliasSymbol] = name;
        };
    }
    else
        throw new Error("kato:名称不能为空");
}
exports.alias = alias;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
//导出各种东东
//中间件模块中的
var parse_1 = __webpack_require__(7);
exports.ParseMiddleware = parse_1.default;
var query_string_1 = __webpack_require__(8);
exports.QueryStringMiddleware = query_string_1.default;
var json_body_1 = __webpack_require__(9);
exports.JsonBodyMiddleware = json_body_1.default;
var url_encoded_1 = __webpack_require__(11);
exports.UrlEncodedMiddleware = url_encoded_1.default;
var multipart_1 = __webpack_require__(12);
exports.MultipartMiddleware = multipart_1.default;
var respond_1 = __webpack_require__(13);
exports.RespondMiddleware = respond_1.default;
var stub_1 = __webpack_require__(4);
exports.StubMiddleware = stub_1.default;
var invoke_1 = __webpack_require__(14);
exports.InvokeMiddleware = invoke_1.default;
var validate_1 = __webpack_require__(5);
exports.ValidateMiddleware = validate_1.default;
var auth_1 = __webpack_require__(6);
exports.AuthenticateMiddleware = auth_1.default;
var cors_1 = __webpack_require__(15);
exports.CorsMiddleware = cors_1.default;
//validate
var validate_2 = __webpack_require__(5);
exports.validate = validate_2.validate;
exports.should = validate_2.should;
//auth
var auth_2 = __webpack_require__(6);
exports.auth = auth_2.auth;
exports.and = auth_2.and;
exports.or = auth_2.or;
exports.not = auth_2.not;
//core模块中的
var kato_1 = __webpack_require__(16);
exports.Kato = kato_1.default;
var context_1 = __webpack_require__(17);
exports.Context = context_1.default;
__export(__webpack_require__(1));
var module_1 = __webpack_require__(19);
exports.alias = module_1.alias;
//express适配器
var express_1 = __webpack_require__(38);
exports.ExpressAdapter = express_1.adapter;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("dayjs");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("cls-hooked");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function createRequest(req) {
    return Object.assign(req, {});
}
exports.createRequest = createRequest;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = __webpack_require__(18);
const on_finished_1 = __webpack_require__(30);
const destroy_1 = __webpack_require__(31);
const bodySymbol = Symbol('res-body');
function createResponse(res) {
    return Object.assign(res, {
        set body(val) {
            this[bodySymbol] = val;
            //如果是一个stream
            if (val instanceof stream_1.Stream) {
                on_finished_1.default(res, destroy_1.default.bind(null, val));
            }
        },
        get body() {
            return this[bodySymbol];
        },
        get writable() {
            if (this.finished)
                return false;
            if (!this.socket)
                return true;
            return this.socket.writable;
        }
    });
}
exports.createResponse = createResponse;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("on-finished");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("destroy");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const invoke_1 = __webpack_require__(14);
const parse_1 = __webpack_require__(7);
const stub_1 = __webpack_require__(4);
const respond_1 = __webpack_require__(13);
const query_string_1 = __webpack_require__(8);
const json_body_1 = __webpack_require__(9);
const url_encoded_1 = __webpack_require__(11);
const multipart_1 = __webpack_require__(12);
const validate_1 = __webpack_require__(5);
const auth_1 = __webpack_require__(6);
const cors_1 = __webpack_require__(15);
const debug = __webpack_require__(0)('kato:core:middle');
//中间件容器
class MiddlewareContainer {
    constructor() {
        //初始化内建的中间件
        this.middlewares = [
            respond_1.default,
            cors_1.default,
            stub_1.default,
            parse_1.default,
            query_string_1.default,
            json_body_1.default,
            url_encoded_1.default,
            multipart_1.default,
            auth_1.default,
            validate_1.default,
            invoke_1.default
        ];
        debug(`加载了${this.middlewares.length}个中间件 => [${this.middlewares.map(it => it.name || '匿名').join(',')}]`);
        this.firstMiddleware = this.middlewares[0];
    }
    do(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            debug(`管道处理开始: ${ctx.req.url.split('?')[0]}`);
            const start = new Date();
            let currentMiddlewareIndex = 0;
            const next = (newCtx, newNext) => __awaiter(this, void 0, void 0, function* () {
                const nextMiddleware = this.middlewares[currentMiddlewareIndex++];
                if (typeof nextMiddleware === 'function') {
                    debug(`进入${nextMiddleware.name || '匿名'}中间件`);
                    yield nextMiddleware.call(null, newCtx || ctx, newNext || next);
                    debug(`离开${nextMiddleware.name || '匿名'}中间件`);
                }
            });
            yield next(ctx);
            debug(`管道处理完毕: ${ctx.req.url.split('?')[0]}, 耗时 ${new Date().getTime() - start.getTime()}ms`);
        });
    }
    use(middleware, locateMiddleware) {
        debug(`添加${middleware.name}中间件在${locateMiddleware ? locateMiddleware.name : '预制'}中间件之前`);
        let index = this.middlewares.findIndex(it => it === (locateMiddleware || this.firstMiddleware));
        if (index < 0)
            index = 0;
        this.middlewares.splice(index, 0, middleware);
    }
    useAfter(middleware, locateMiddleware) {
        debug(`添加${middleware.name}中间件在${locateMiddleware ? locateMiddleware.name : '所有'}中间件之后`);
        let index = this.middlewares.findIndex(it => it === locateMiddleware);
        if (index < 0)
            index = this.middlewares.length;
        this.middlewares.splice(index + 1, 0, middleware);
    }
}
exports.MiddlewareContainer = MiddlewareContainer;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("get-parameter-names");

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mergeOptions = __webpack_require__(35);
const prettyJson = __webpack_require__(36);
const debug = __webpack_require__(0)('kato:options');
//默认配置
const defaultOptions = {
    dev: false,
    loose: false,
    outputRuntimeError: true,
    files: {
        storage: null,
        maxCount: 5,
        maxSize: 50000000
    },
    cors: {
        origin: '*',
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        // some legacy browsers (IE11, various SmartTVs) choke on 204
        optionsStatusCode: 204
    }
};
function getOptions(options) {
    const result = mergeOptions(defaultOptions, options);
    //针对cors options的特殊处理
    if (options.cors === true)
        throw new Error("kato:cors选项只能为false或者{}(KatoCorsOptions)");
    else if (options.cors === false)
        result.cors = false;
    else
        result.cors = mergeOptions(defaultOptions.cors, options.cors);
    debug(`Kato Options:\n${prettyJson.render(result, { noColor: true })}\n`);
    return result;
}
exports.getOptions = getOptions;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("merge-options");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("prettyjson");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = __webpack_require__(18);
/**
 * 把KatoResponse转换成为node标准的res,并写入http流中
 * @param res
 */
function transformer(res) {
    //如果不可写,res已经被end了
    if (!res.writable)
        return;
    const body = res.body;
    //如果是一个字符串
    if (Buffer.isBuffer(body))
        return res.end(body);
    //如果是buffer
    if (typeof body === 'string')
        return res.end(body);
    //如果是一个stream
    if (body instanceof stream_1.Stream)
        return body.pipe(res);
    //否则,关闭res
    return res.end();
}
exports.transformer = transformer;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//express框架适配器
function adapter(kato) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield kato.do(req, res);
        });
    };
}
exports.adapter = adapter;


/***/ })
/******/ ])));
//# sourceMappingURL=index.js.map