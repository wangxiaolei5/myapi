const express = require('express')
const router = express.Router()

const userModel = require('../db/model/user')

const jwt = require('../utils/jwt')

// 添加拦截器，拦截当前路由中以/t开头的接口
router.use('/t',(req,res,next) => {
    // 从请求参数中获取token
    const {token} = req.body

    // 校验token
    jwt.checkToken(token)
    .then((data) => {
        // 解析token得到里面的用户ID
        const {userId} = data

        // 将用户ID保存在请求对象中，供后面的接口使用
        req.userId = userId
        // 只有调用了next方法，才会继续后面的请求
        next()        
    })
    .catch((err) => {
        console.log(err)
        res.send({
            code: -2,
            msg: '用户未登录'
        })
    })
})

// 获取用户信息
router.post('/t/info',(req,res) => {
    const {userId} = req

    userModel.find({
        _id: userId
    })
    .then((data) => {
        const {username} = data[0]

        res.send({
            code: 1,
            msg: '获取用户信息成功',
            info: {
                username
            }
        })        
    })
    .catch((err) => {
        console.log(err)
        res.send({
            code: -1,
            msg: '获取用户信息失败'
        })
    })
})

module.exports = router