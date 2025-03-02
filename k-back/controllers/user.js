const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

const users = []; // 模拟用户存储

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
  console.log(res)
  const user = res?.[0];
  const { password: pwd, ...rest } = user || {};
  if (!user || !(await bcrypt.compare(password, pwd))) {
    ctx.status = 401;
    ctx.body = { message: "Invalid credentials" };
    return;
  }
  const token = generateToken({ username }); // 生成 JWT 令牌
  ctx.body = {
    code: 0,
    message: "Login successfully",
    data: {
      ...rest,
      token,
    },
  };
};

module.exports = { register, login };
