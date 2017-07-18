

const Detail = async ( ctx ) => {
    await ctx.render('detail2' ,{ title: 'detail'});
}

module.exports = Detail;