const express = require("express"); // express를 사용함 code;
const mongoose = require("mongoose");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./Config/key');
const {auth} = require('./Middleware/auth');
const {User} = require('./Models/Users');


const app = express();// app이라는 상수로 express code를 작성함;
const port = 3001; // 포트번호는 3001;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

const URI = config.mongoURI;
const server = async ()=>{
    try{
        let mongoDBconnection = await mongoose.connect(URI);
         
        app.use(express.json());
          app.post('/api/users/register',async (req,res)=>{
            try{
                 //회원가입 시 필요한 정보들을 client에서 가져오면
                  //그것들을 데이터베이스에 넣어준다.  
                  const user = new User(req.body);
                 await user.save();
                //  return res.status(200).json({success:true});
                return res.send({user});
            }catch(err){
                return res.status(500).json({success:false, err});
            }
          });
          app.get('/api/users/register', async (req,res)=>{
            try{
                let user = await User.find({});
                return res.send({user});
            }catch(err){
                console.log(err);
                return res.status(400).send({err:err.message});
            }
            
          });
          app.post('/api/users/login',async (req,res)=>{
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
                                return res.cookie('x_auth',user.token)
                                  .status(200)
                                  .json({
                                    loginSuccess:true, 
                                    userId:user._id, 
                                    token:user.token, 
                                    name:user.name
                                });
                              });
                      } )
                      res.send({user});
                  }
              });
          });
          app.get('/api/users/login', async (req,res)=>{
            res.send(req.body);
          });
  
          app.get('/api/users/auth',auth,(req,res)=>{
              res.status(200).json({
                  _id:req.user._id,
                  isAdmin: req.user.role === 0 ? false : true,
                  isAuth:true,
                  name:req.name,
                  email:req.email,
                  role:req.user.role
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
          });
          app.get('/',(req,res)=>{
             return res.send('hello world')
          });
          app.listen(port, (req,res)=>{
              console.log(port+"번으로 서버가 켜졌습니다")
          });
    }catch(err){
        console.log(err)
    }

};

server();

// const mongoose = require('mongoose');
// {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false}

// const user = [];