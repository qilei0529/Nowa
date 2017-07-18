

const config = {
    env: 'dev',

    server : {
        port : 3000,
    },

    router : {
        '/'         : 'home',
        '/detail'   : 'home/detail',
        '/detail2'   : 'home/detail2'
    },

    router_views : {
    }

}


module.exports = config;