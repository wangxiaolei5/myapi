const express = require('express')
const router = express.Router()

const goodsModel = require('../db/model/goods')

/**
 * @api {post} /goods/add 商品新增接口
 * @apiName GoodsAdd
 * @apiGroup Goods
 *
 * @apiParam {String} title 商品名称
 * @apiParam {String} rawAuthor 商品作者
 * @apiParam {String} images 商品图片
 * @apiParam {Number} doubanRating 豆瓣评分
 * @apiParam {Number} price 商品价格
 * @apiParam {Number} zhe 商品折扣
 * @apiParam {Number} yuanjia 商品原价
 * @apiParam {String} goodsSkus 商品规格
 * @apiParam {String} publisher 出版单位
 * @apiParam {Number} publishDate 出版时间
 * @apiParam {String} content 商品描述
 *
 * @apiSuccess {Number} code 接口状态码
 * @apiSuccess {String} msg  接口返回信息
 */

 // 新增
 router.post('/add',(req,res) =>{
    const {
        title,rawAuthor,images,doubanRating,price,
        zhe,yuanjia,publisher,publishDate,content,goodsSkus
            } = req.body
    goodsModel.insertMany({
        title,rawAuthor,images,doubanRating,price,
        zhe,yuanjia,publisher,publishDate,content,goodsSkus
    })
    .then(() => {
        res.send({
            code: 1,
            msg: '商品新增成功'
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({
            code: -1,
            msg: '商品新增失败'
        })
    })
 })

/**
 * @api {post} /goods/list 商品分页接口
 * @apiName GoodsList
 * @apiGroup Goods
 *
 * @apiParam {Number} pageNum 页数
 * @apiParam {Number} pageSize 每页的条数

 *
 * @apiSuccess {Number} code 接口状态码
 * @apiSuccess {String} msg  接口返回信息
 */
 
 // 分页
 router.post('/list',(req,res) =>{
    let {pageNum,pageSize,keyword} = req.body

    pageNum = pageNum || 1
    pageSize = pageSize || 10

    const regex = new RegExp(keyword, 'ig')
    goodsModel.find({
        $or: [
            {
                title: {$regex: regex}
            },
            {
                rawAuthor:{$regex: regex}
            }
        ]
    })



    .skip((pageNum - 1)*pageSize) // 跳过当前页之前的所有商品
    .limit(pageSize-0) // 再取指定数量的商品
    .then((data) => {
        res.send({
            code: 1,
            msg: '获取商品列表成功',
            list: data
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({
            code: -1,
            msg: '获取商品列表失败'
        })
    })
 })


 router.post('/list2',(req,res) =>{
    
    goodsModel.find({
    })
    .then((data) => {
        res.send({
            code: 1,
            msg: '获取图片成功',
            info: data
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({
            code: -1,
            msg: '获取图片失败'
        })
    })
})

// 模糊
router.post('/fuzzy',(req,res) => {
    const {keyword} = req.body

    // 创建一个动态正则表达式
    const regex = new RegExp(keyword,'ig')

    goodsModel.find({
        // 只要商品的名称、标题和描述中出现这个关键字，就说明查到了
        $or: [
            {
                title: {$regex: regex}
            },
            {
                rawAuthor: {$regex: regex}
            },
            {
                content: {$regex: regex}
            }                        
        ]
    })
    .then((data) => {
        res.send({
            code: 1,
            msg: '模糊查询成功',
            list: data
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({
            code: -1,
            msg: '模糊查询失败'
        })
    })
})


// 详情
router.post('/detail',(req,res) => {
    console.log('detail',req.session)
    const {goodsId} = req.body

    goodsModel.find({
        _id: goodsId
    })
    .then((data) => {
        res.send({
            code: 1,
            msg: '获取商品详情成功',
            info: data[0]
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({
            code: -1,
            msg: '获取商品详情失败'
        })
    })     
})


module.exports = router