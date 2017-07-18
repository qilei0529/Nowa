

const Detail = async ( ctx ) => {
    await ctx.render('detail' ,{ title: 'detail'});
}

module.exports = Detail;