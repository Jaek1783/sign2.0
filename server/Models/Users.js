const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
//스키마를 생성한다.
//스키마에 생성 키, 벨류, 입력형식 등을 입력해준다.
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:Number,
    email:{
        type:String,
        trim:true, //email의 빈칸을 없애줌
        unique: 1
    },
    password:{
        type:String,
        required:true
    },
    role:{ // role :1 => 관리자, role :0 => user
        type:Number,
        default:0
    },
    token: {
        type:String,
    },
    tokenExp:{
        type:Number
    }
});

UserSchema.pre('save', function(next){
    let user = this;
    //비밀번호 암호화
    if(user.isModified('password')){
    //   let  password = user.password.toString();
        bcrypt.hash(user.password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            if(err){
                console.log(err);
            }
            else{
                user.password = hash;
            }
            next();
        });
    } else{
        next();
    }
}); 

UserSchema.methods.comparePassword = function(plainPassword, callback){
    //plainPassword 1234567 = 암호화된 비밀번호 ?
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err){
            return callback(err)
        }else{
            callback(null,isMatch)
        }
    });
};

UserSchema.methods.generateToken = function(cb){
    let user = this;
    //jsonwebtoken을 이용해 token 생성하기
   let token =  jwt.sign(user._id.toHexString(), 'secretToken');
   user.token = token;
   user.save(function(err,user){
    if(err) return cb(err)
    cb(null,user);
   });
};

UserSchema.statics.findByToken = function(token,cb) {
    let user = this;
    //token 복호화
    jwt.verify(token,'secretToken', function(err, decoded){
        user.findOne({"_id":decoded,"token":token}, function(err, user){
            if(err) return cb(err);
            cb(null,user);
        });
    });
}
const User = mongoose.model('User',UserSchema);
module.exports = {User};