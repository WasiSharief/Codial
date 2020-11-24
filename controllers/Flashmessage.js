module.exports.flashsuccess = function(req,res)
{
  return  req.flash('success','You Commented on post');
}


