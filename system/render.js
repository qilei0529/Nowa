/**
 * Created by feiyuzi@2dfire.com
 * 配置 渲染 Render
 */

'use strict';

const path = require('path');

const config = require('../config');
const debug  = require('debug')('Rou.render');

const template = require('art-template');


const renderMan = () => {

    let settings = {
        debug: true,
        writeResp: true,
        extname: '.html',
        root: path.join(__dirname, '../views'),
    }

    return async (ctx, next) => {
        // 根据 不同路由 配置对应的render
        
        if ( ctx.render ) {
            await next();
            return;          
        }

        function render(filename, data) {
            debug(`render: ${filename}`);
            settings.filename = filename;
            const render = template.compile(settings);
            return render(data);
        }

        ctx.render = function (view, _context) {
            const ctx = this;
            const context = Object.assign({}, ctx.state, _context);
            const html = render(view, context);
            const writeResp = context.writeResp === false ? false : (context.writeResp || settings.writeResp);

            if (writeResp) {
                ctx.type = 'html';
                ctx.body = html;
            } else {
                return html;
            }
        };


        await next();

    }

}




module.exports = renderMan;