const exporess =require('express');
const router =exporess.Router();

const userModel =require('../db/model/user')

//引入短信模块
const msg =require('../utils/msg')

//定义一个全局变量
const codes ={}

//获取验证码
router.post('/getCode',(req,res) => {
    const {tel} = req.body

    if(tel){
        // 随机生成一个4位数的验证码
        let code = ''
        for(let i=0;i<4;i++){
            code += Math.floor(Math.random()*10)
        }

        // 将验证码发送到该手机号的短信中
        msg.send(tel,code)
        
        .then((data) => {
            // console.log(data)

            // 把验证码存到全局，并且手机号与验证码是一对一的关系 
            codes[tel] = code
            console.log(tel,code)
            //console.log(codes)
            res.send({
                code: 1,
                msg: '发送成功'
            })            
        })
        .catch((err) => {
            console.log(err)
            res.send({
                code: -1,
                msg: '发送失败'
            })
        })
    }else{
        res.send({
            code: -1,
            msg: '缺少参数'
        })
    }
})

//注册使用验证码
router.post('/useCode',(req,res) => {
	const {username,password,tel,code} = req.body

    if(username && password && tel && code){
        // 先查询用户名
        userModel.find({
            username
        })
        .then((data) => {
            // 判断数据库是否存在该用户名
            if(data.length){
                res.send({
                    code: -1,
                    msg: '该用户名已被注册'
                })
            }else{
                // 再查询手机号
                return userModel.find({
                    tel
                })
            }
        })
        .then((data) => {
            if(!data){

            }
            // 判断数据库是否存在该手机号
            else if(data.length){
                res.send({
                    code: -1,
                    msg: '该手机号已被占用'
                })
            }else{
                // 如果没有将验证码发送到该手机号
                if(!codes[tel]){
                    res.send({
                        code: -1,
                        msg: '手机号错误'
                    })                     
                }
                // 如果该手机号接收的验证号和注册时传上来的验证码不一致
                else if(codes[tel] != code){
                    res.send({
                        code: -1,
                        msg: '验证码错误'
                    }) 
                }else{
                    // 最后插入
                    return userModel.insertMany({
                        username,
                        password,
                        tel
                    })
                }
            }
        })
        .then((data) => {
            if(!data){

            }else if(data){
                res.send({
                    code: 1,
                    msg: '注册成功'
                })   
            }
        })         
        .catch((err) => {
            console.log(err)
            res.send({
                code: -1,
                msg: '注册失败'
            })
        })
    }else{
        res.send({
            code: -1,
            msg: '缺少参数'
        })
    }
})

module.exports=router;