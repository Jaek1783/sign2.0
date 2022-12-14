const {User} = require('../Models/Users');
let auth = (req,res,next)=>{
//인증처리
    //클라이언트 쿠키에서 토큰을 가져온다.
let token = req.cookies.x_auth;
    // User.findByToken()
    //토큰을 복호화 한 후 user를 찾는다.
    User.findByToken(token,(err,user)=>{
    //유저가 있으면 인증O
    //유저가 없으면 인증X
        if(err) throw err;
        if(!user) return res.json({isAuth:false, error: true})
        req.token = token;
        req.user = user;
        next();
    })

}

module.exports = {auth};