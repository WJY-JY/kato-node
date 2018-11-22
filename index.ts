//导出各种东东
//中间件模块中的
export {default as ParseMiddleware} from './core/middleware/parse'
export {default as ParameterMiddleware} from './core/middleware/parameter'
export {default as TryCatchMiddleware} from './core/middleware/trycatch'
export {default as StubMiddleware} from './core/middleware/stub'
export {default as InvokeMiddleware} from './core/middleware/invoke'
export {default as EndMiddleware} from './core/middleware/end'

//core模块中的
export {default as Kato} from './core/kato'
export {default as Context} from './core/context'
export * from './core/error'
export {alias} from './core/module'

//express适配器
export {adapter as ExpressAdapter} from './express'
