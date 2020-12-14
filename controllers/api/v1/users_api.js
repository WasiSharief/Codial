const User = require('../../../models/userschema');

const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');

module.exports.signin_createsession_control = async function(req,res)
{
    try{
        let user = await User.findOne({email:req.body.email});

        if(!user || user.password != req.body.password)
        {
            return res.json(422,{
                message:"Invalid User Name or Password"
            });
        }
        return res.json(200,{ 
            message:"Sign in successful and your token is",
            data:{
            token: jwt.sign(user.toJSON(),env.jwt_strat_secret_key,{expiresIn:'100000'})
        }
        });
    }
    catch(err){
        console.log('*******',err);
        return res.json(500,{
            message:"Internal server Issue"
        });
    }

} 