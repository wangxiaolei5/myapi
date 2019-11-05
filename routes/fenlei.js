const express =require('express')
const router =express.Router()

const assortment =require('../db/model/fenlei')

router.post('/list',(req,res) =>{
    
    assortment.find({
    })
    .then((data) => {
        res.send({
            code: 1,
            msg: '获取分类详情成功',
            info: data
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({
            code: -1,
            msg: '获取分类详情失败'
        })
    })
})


module.exports =router