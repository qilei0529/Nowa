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
// 注入 model 

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

    let model = loadModel( value );
    if ( model ) {
      debug('Create router:' , key, value );
      router.get( key , model);
    }else{
      debug('Error  router:' , key, value );
    }

  });

  return router.routes();
}

module.exports = routerBox;