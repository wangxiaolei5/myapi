const express = require('express')

const router = express.Router()

// 写一个jsonp接口
router.get('/',(req,res) => {
    // 获取前端传上来的函数名
    const {callback} = req.query

    // 定义一个需要返回给前端的数据
    const obj = {
        code: 1,
        msg: '请求成功'
    }

    // 将这个数据格式化成字符串
    const str = JSON.stringify(obj)

    // 向前端返回一个字符串
    res.send(`${callback}(${str})`)
})

module.exports = router