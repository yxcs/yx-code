const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

const users = []; // 模拟用户存储

// 获取用户信息
const getUser = async (ctx) => {
  const user = ctx.state.user;
  const id = user?.id;
  if (!id) {
    ctx.status = 401;
    ctx.body = {
      code: 401,
      message: "User not authenticated",
    };
    return;
  }
  const sql = "SELECT * FROM admin where id = ? limit 1";
  const [res] = await ctx.state.db.query(sql, [id]);
  if (!res?.length) {
    ctx.status = 401;
    ctx.body = {
      code: 401,
      message: "User not authenticated",
    };
    return;
  }
  const { password: _, ...rest } = res[0];
  ctx.body = {
    code: 0,
    message: 'success',
    data: rest,
  }
};

// 用户注册
const register = async (ctx) => {
  const { username, password, phone, mail } = ctx.request.body;
  const hashedPassword = await bcrypt.hash(password, 10); // 加密密码
  const sql =
    "INSERT INTO admin (user_name, password, user_phone, user_mail) VALUES (?,?,?,?)";
  const res = await ctx.state.db.query(sql, [
    username,
    hashedPassword,
    phone,
    mail,
  ]);
  ctx.body = {
    code: 0,
    message: "User registered successfully",
    data: {
      id: res.insertId,
    },
  };
};

// 用户登录
const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  const sql = "SELECT * FROM admin where user_name = ?";
  const [res] = await ctx.state.db.query(sql, [username]);
  const user = res?.[0];
  const { password: pwd, id, ...rest } = user || {};
  if (!user || !(await bcrypt.compare(password, pwd))) {
    ctx.body = {
      message: "Invalid credentials",
      code: 1,
      data:  null,
    };
    return;
  }
  const token = generateToken({ username, id }); // 生成 JWT 令牌
  ctx.body = {
    code: 0,
    message: "Login successfully",
    data: {
      ...rest,
      id,
      token,
    },
  };
};

module.exports = { getUser, register, login };
