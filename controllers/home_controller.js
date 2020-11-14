module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',50);
 res.render('home',{
        h1:"Rendering home"
    });
    
}