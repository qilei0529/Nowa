const Koa = require('koa');
const debug = require('debug')('Rou.http');
const koa_logger = require('koa-logger');

const config = require('./config');
const render = require('./system/render');
const router = require('./system/router');


const app = new Koa();

// 启动 添加日志 记录
app.use(koa_logger());

// 添加 静态 渲染引擎
app.use(render(app));

// 添加 动态路由
app.use(router());

// 端口监听
const port = config.server.port || 3000;
app.listen(port);

debug('App run at:', port);
module.exports = app;