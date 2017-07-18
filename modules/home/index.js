

const Home = async (ctx , next ) => {
    await ctx.render('home' ,{ title: 'home'});
}


module.exports = Home;