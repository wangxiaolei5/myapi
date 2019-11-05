const express = require('express')
const router = express.Router()

const jwt = require('../utils/jwt')
const cartModel = require('../db/model/cart')
const goodsModel = require('../db/model/goods')


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


// 添加到购物车，使用token
router.post('/t/add',(req,res) => {
    // 获取用户ID
    const userId = req.userId
    // console.log(userId)

    const {goodsId,buySku,buyNum} = req.body

    // 先查询购物车列表中是否有这个用户的指定规格的这个商品
    cartModel.find({
        userId,
        goodsId,
        buySku
    })
    .then((data) => {
        // 存在 
        if(data.length){
            const cartItem = data[0]
            cartModel.updateOne(
                cartItem,
                {
                    $set: {buyNum: cartItem.buyNum + buyNum*1}
                }
            )
            .then(() => {
                res.send({
                    code: 1,
                    msg: '添加购物车成功'
                })
            })
            .catch((err) => {
                console.log(err)
                res.send({
                    code: -1,
                    msg: '添加购物车失败'
                })                
            })            
        }
        // 不存在 
        else{
            // 查询这个商品
            goodsModel.find({
                _id: goodsId
            })
            .then((data) => {
                const goodsItem = data[0]

                // 在商品集合的基础上，添加多个字段，形成购物车集合
                const cartItem = {
                    userId,
                    goodsId: goodsItem._id,
                
                    title: goodsItem.title,
                    images: goodsItem.images,
                    price: goodsItem.price,
                    goodsSkus: goodsItem.goodsSkus,
                    goodsNum: goodsItem.goodsNum,
                    rawAuthor: goodsItem.rawAuthor,
                    zhe: goodsItem.zhe,
                
                    buySku,
                    buyNum                   
                }

                cartModel.insertMany(cartItem)
                .then(() => {
                    res.send({
                        code: 1,
                        msg: '添加购物车成功'
                    })
                })
                .catch((err) => {
                    console.log(err)
                    res.send({
                        code: -1,
                        msg: '添加购物车失败'
                    })                
                })               
            })
            .catch((err) => {
                console.log(err)
                res.send({
                    code: -1,
                    msg: '查询商品失败'
                })                
            })
        }
    })
    .catch((err) => {
        console.log(err)
        res.send({
            code: -1,
            msg: '内部错误'
        })
    })
})

// 查询
router.post('/t/list',(req,res) => {
    const userId = req.userId

    cartModel.find({
        userId
    })
    .then((data) => {
        res.send({
            code: 1,
            msg: '获取购物车列表成功',
            list: data
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({
            code: -1,
            msg: '获取购物车列表失败'
        })                
    }) 
})

// 更新
router.post('/t/update',(req,res) => {
    const {cartId,buyNum} = req.body

    cartModel.updateOne(
        {_id: cartId},
        {
            $set: {buyNum}
        }
    )
    .then(() => {
        res.send({
            code: 1,
            msg: '更新购物车商品成功'
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({
            code: -1,
            msg: '更新购物车商品失败'
        })                
    })     
})

// 删除
router.post('/t/del',(req,res) => {
    const {cartIds} = req.body

    // 将字符串转成数组
    cartIds_arr = cartIds.split(',')
    console.log('cartIds_arr',cartIds_arr)
    cartModel.deleteMany({
        _id: {
            $in: cartIds_arr
        }
    })
    .then(() => {
        res.send({
            code: 1,
            msg: '删除购物车商品成功'
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({
            code: -1,
            msg: '删除购物车商品失败'
        })                
    })      
})

module.exports = router