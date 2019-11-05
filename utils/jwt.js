const jwt =require('jsonwebtoken');

// 定义一个加密字符串
const secret = 'whatareyoudoingfinethanksandyou'

// 定义一个用户隐私数据
// const data = {
//     userId: '123456789'
// }

// 封装一个函数，生成一个token
const createToken = (data) => {
    return jwt.sign(data,secret,{
        expiresIn: 60*60 // 有效期，单位秒
    })
}

// 封装一个函数，校验这个token
const checkToken = (token) => {
    return new Promise((resolve,reject) => {
        jwt.verify(token,secret,(err,data) => {
            if(!err){
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
}

module.exports = {
    createToken,
    checkToken
}
