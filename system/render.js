/**
 * Created by feiyuzi@2dfire.com
 * 配置 渲染 Render
 */

'use strict';

const path = require('path');

const config = require('../config');
const debug  = require('debug')('Rou.render');

const render = require('koa-art-template');

const renderMan = ( app ) => {
    let settings = {
        debug: true,
        writeResp: true,
        extname: '.html',
        cache: true,
        root: path.join(__dirname, '../views'),
    }
    render(app, settings);
    return async (ctx, next) => {
        await next();
    }

}




module.exports = renderMan;