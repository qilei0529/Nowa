

const Home = async (ctx ) => {
    await ctx.render('home' ,{ title: 'home'});
}


module.exports = Home;