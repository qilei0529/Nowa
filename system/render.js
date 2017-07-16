/**
 * Created by feiyuzi@2dfire.com
 * 配置 渲染 Render
 */

'use strict';

const swig = require('koa-swig');
const path = require('path');

const config = require('../config');
const debug  = require('debug')('Rou.render');

// render 缓存，for 多路由
const renderCache = new Map();

// 清理 缓存
function clearRenderCache() {
    debug('clear render cache')
    swig.swig.invalidateCache();
}

function renderBox(){

    let setting = {
        root: path.join(__dirname, '../views'),
        autoescape: true,
        cache: 'memory', // disable, set to false 
        ext: 'html'
    }

    //设置 默认 render
    let render = swig(setting);
    debug('create:', 'default')
    renderCache.set('default', render);

    return async (ctx, next) => {
        // 根据 不同路由 配置对应的render
        debug('hello')
        let router = ctx.path;
        let key = config.router_views[router] || null ;
        // debug(key);
        if ( key ) {
            ctx.router = router;
        }else{
            key = 'default';
        }
        let cache = renderCache.get(key) || null;
        if ( cache ){
            render = cache;
        }else{
            debug('create:', key)
            let opts = Object.assign({}, setting, { root: key });
            render = swig(opts);
            renderCache.set(key, render);
        }
        ctx.clearRenderCache = clearRenderCache;
        ctx.render = render;

        await next();
    }
}



module.exports = renderBox;