const jwt = require('jsonwebtoken');

const secret = 'your_jwt_secret'; // JWT 密钥

// 生成 JWT 令牌
const generateToken = (user) => {
    return jwt.sign(user, secret, { expiresIn: '1h' }); // 令牌有效期为 1 小时
};

module.exports = { secret, generateToken };
