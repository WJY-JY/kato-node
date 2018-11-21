import Context from "./context";
import invoke from "./middleware/invoke";
import parse from "./middleware/parse";
import end from "./middleware/end";
import stub from "./middleware/stub";
import trycatch from "./middleware/trycatch";
import parameter from "./middleware/parameter";

const debug = require('debug')('kato:core:middle');

//定义中间件的类型
export type Middleware = (ctx?: Context, next?: Middleware) => Promise<void>;

//中间件容器
export class MiddlewareContainer {
  //存储所有的中间件
  private readonly middlewares: Middleware[];
  //存储第一个中间件
  private readonly firstMiddleware: Middleware;

  constructor() {
    //初始化内建的中间件
    this.middlewares = [
      trycatch,
      stub,
      parse,
      parameter,
      invoke,
      end
    ];
    debug(`加载了${this.middlewares.length}个中间件 => [${this.middlewares.map(it => it.name || '匿名').join(',')}]`);
    this.firstMiddleware = this.middlewares[0];
  }

  async do(ctx: Context) {
    debug(`管道处理开始: ${ctx.req.url.split('?')[0]}`);
    const start = new Date();
    let currentMiddlewareIndex = 0;

    const next = async (newCtx?: Context, newNext?: Middleware) => {
      const nextMiddleware = this.middlewares[currentMiddlewareIndex++];
      if (typeof nextMiddleware === 'function') {
        debug(`进入${nextMiddleware.name || '匿名'}中间件`);
        await nextMiddleware.call(null, newCtx || ctx, newNext || next);
        debug(`离开${nextMiddleware.name || '匿名'}中间件`);
      }
    };

    await next(ctx);
    debug(`管道处理完毕: ${ctx.req.url.split('?')[0]}, 耗时 ${new Date().getTime() - start.getTime()}ms`);
  }

  use(middleware: Middleware, locateMiddleware?: Middleware) {
    debug(`添加${middleware.name}中间件在${locateMiddleware ? locateMiddleware.name : '预制'}中间件之前`);
    let index = this.middlewares.findIndex(it => it === (locateMiddleware || this.firstMiddleware));
    if (index < 0)
      index = 0;
    this.middlewares.splice(index, 0, middleware);
  }

  useAfter(middleware: Middleware, locateMiddleware: Middleware) {
    debug(`添加${middleware.name}中间件在${locateMiddleware ? locateMiddleware.name : '所有'}中间件之后`);
    let index = this.middlewares.findIndex(it => it === locateMiddleware);
    if (index < 0)
      index = this.middlewares.length;
    this.middlewares.splice(index + 1, 0, middleware);
  }
}
