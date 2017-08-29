/**
 * Created by feiyuzi@2dfire.com
 * 配置 动态路由
 */

'use strict';

const path   = require('path');
const fs     = require('fs');
const router = require('koa-router')();
const _      = require('lodash');
const debug  = require('debug')('Rou.router');

const config = require('../config');

const MODULES_PATH = path.join( __dirname, '../' , config.modules_dir || 'modules');
const ROUTERS = config.router || {};

// 获取 data 
// 注入 render 
// 渲染 view

// load 
function loadModel( dir ){
    const p = path.join( MODULES_PATH , dir + '.js')
    if ( fs.existsSync(p) ) {
        return require(p)
    }else{
        return null
    }
}

function routerBox(){
  _.forEach( ROUTERS , function(value , key) {

    if ( value.indexOf('/') < 0 ) {
        value = path.join(value , 'index')
    }
    
    let method = 'get';

    let METHOD_MAP = {
      post: 'post',
      get: 'get'
    };

    if ( key.indexOf(':') > 0 ) {
      let m = key.split(':');
      method = METHOD_MAP[m[0]] || 'get';
      key = m[1];
    }

    let model = loadModel( value );
    if ( model ) {
      debug('Create router:' , method, key, value );
      method == 'get' ? router.get( key , model) : router.post( key , model);
    }else{
      debug('Error  router:' , key, value );
    }

  });

  return router.routes();
}

module.exports = routerBox;