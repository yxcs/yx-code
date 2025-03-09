const Koa = require("koa");
const views = require("koa-views");
const json = require("koa-json");
const jwt = require("koa-jwt");
const onerror = require("koa-onerror");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require('koa2-cors');
// 错误处理中间件
// const errorMiddleware = require('./middlewares/error');
const connectDatabase = require("./db/mysql");
// JWT 密钥
const { secret } = require("./utils/jwt");

const app = new Koa();

const index = require("./routes/index");
const users = require("./routes/users");

// error handler
onerror(app);

app.use(
  cors({
    origin: function (ctx) {
      // 允许的域名白名单（生产环境建议配置具体域名）
      const allowOrigins = [
        'http://localhost:8081',
        // 'https://your-production-domain.com'
      ];
      const requestOrigin = ctx.header.origin;
      
      if (allowOrigins.includes(requestOrigin)) {
        return requestOrigin; // 允许的域名返回自身
      }
      return ''; // 不允许的域名返回空字符串（浏览器会拒绝）
    },
    maxAge: 86400, // 预检请求缓存时间（秒）
    credentials: true, // 允许发送Cookie（需要前端配合withCredentials）
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的HTTP方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 允许的请求头
    exposeHeaders: ['Content-Disposition'] // 允许前端获取的响应头
  })
);

// JWT 鉴权中间件
app.use(
  jwt({ secret }).unless({
    path: [/^\/api\/user\/register/, /^\/api\/user\/login/],
  })
);

// 数据库
app.use(async (ctx, next) => {
  ctx.state.db = await connectDatabase();
  await next();
});

// middlewares
app.use(
  bodyParser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
