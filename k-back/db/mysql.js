const mysql = require('mysql2/promise');
async function connectDatabase() {
    const connection = await mysql.createConnection({
        host: '47.94.202.75', // 数据库服务器地址
        user: 'poem', // 数据库用户名
        password: 'fzpM8he4npWZZspx', // 数据库密码
        database: 'poem', // 数据库名
        waitForConnections: true, // 如果连接池已满，则等待可用连接而不是立即报错。
        connectionLimit: 10, // 池中最大连接数。默认值是10。根据你的需求调整。
        queueLimit: 0 // 如果设置为0，则排队操作将在达到连接限制时立即失败。默认值是0。
    });
    return connection;
}

module.exports = connectDatabase;