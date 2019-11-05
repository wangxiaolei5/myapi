const exporess =require('express');
const router =exporess.Router();

const userModel =require('../db/model/user');

const jwt = require('../utils/jwt')


//登录,使用token
router.post('/t',(req,res) =>{
    const {username,tel,password} = req.body

    if((username || tel) && password){
        userModel.find({
            // username,
            // 查询用户名或者手机号
            $or: [
                {username},
                {tel},
            ],
            password
        })
        .then((data) => {
            if(data.length){
                // 根据这个用户的ID生成一个token，并将其传回给前端
                const token = jwt.createToken({
                    userId: data[0]._id
                })

                res.send({
                    code: 1,
                    msg: '登录成功',
                    token
                })                
            }else{
                res.send({
                    code: -1,
                    msg: '登录失败'
                })   
            }
        })
        .catch((err) => {
            console.log(err)
            res.send({
                code: -1,
                msg: '登录失败'
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
