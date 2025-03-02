const Koa = require("koa");
const views = require("koa-views");
const json = require("koa-json");
const jwt = require("koa-jwt");
const onerror = require("koa-onerror");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
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

// JWT 鉴权中间件
app.use(
  jwt({ secret }).unless({
    path: [/^\/api\/auth/, /^\/users\/auth\/register/, /^\/users\/auth\/login/],
  })
); // 除了 /api/auth 路径外，其他路径都需要 JWT 鉴权

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
