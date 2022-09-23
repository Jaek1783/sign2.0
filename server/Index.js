const express = require("express"); // express를 사용함 code;
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {auth} = require('./Middleware/auth');
const {User} = require('./Models/Users');
const app = express();// app이라는 상수로 express code를 작성함;
const port = 3001; // 포트번호는 3001;
const config = require('./Config/key')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongodbURI = config.mongoURI;
const server = ()=>{
         mongoose.connect(mongodbURI);
      app.use(express.json());

        app.get('/',(req,res)=>{
            res.send('hello world');
        });

        app.post('/api/users/register',(req,res)=>{
                //회원가입 시 필요한 정보들을 client에서 가져오면
                //그것들을 데이터베이스에 넣어준다.  
                const user = new User(req.body);
                user.save((err,user) =>{
                    if(err){
                        return res.json({success:false, err});
                    }else{
                        return res.status(200).json({success:true});
                    } 
                    
                }); 
                // return res.send({user});
        });
        app.post('/api/users/login',(req,res)=>{
            //요청된 이메일이 DB에 있는 지 확인
            User.findOne({email:req.body.email}, (err,user)=>{
                if(!user){
                    return res.json({
                        loginSuccess:false,
                        message:"이메일을 확인하세요" 
                    });
                }
            //요청된 비밀번호가 DB에 있다면 비밀번호가 맞는 지 확인
                else{
                    user.comparePassword(req.body.password , (err, isMatch) =>{
                        if(!isMatch){
                            return res.json({loginSuccess:false, 
                                                message:"비밀번호가 틀렸습니다."
                            });
                        }
            //Token 생성                
                    user.generateToken((err, user) => {
                            if(err) return res.status(400).send(err);
                                res.cookie('x_auth',user.token)
                                .status(200)
                                .json({loginSuccess:true, userId:user._id});
                            });
                    } )
                }
            });
        });
        app.get('/api/users/login',(req,res)=>{
            res.send(req.body);
        });

        app.get('/api/users/auth',auth,(req,res)=>{
            res.status(200).json({
                _id:req.user._id,
                isAdmin: req.user.role === 0 ? false : true,
                email:req.email
            })
        });

        app.get('/api/users/logout', auth, (req,res)=>{
            User.findOneAndUpdate({_id:req.user._id},
              {token: ""},
              (err,user)=>{
                if(err) return res.json({success:false, err});
                return res.status(200).send({
                    success:true
                });
              });
        })

        app.listen(port, (req,res)=>{
            console.log(port+"번으로 서버가 켜졌습니다")
        });
};

server();

// const mongoose = require('mongoose');
// {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false}

// const user = [];