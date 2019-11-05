const mongoose = require('mongoose')

// 定义集合的结构，相当于是一个表头
const goodsSchema =new mongoose.Schema({
    title: {type: String,required: true},
    rawAuthor: {type: String,required: true},
    images: {type: String,required: true},
    doubanRating: {type: Number,required: true},
    price: {type: Number,required: true},
    zhe: {type: Number,required: true},
    yuanjia: {type: Number,required: true},
    goodsSkus: {type: String,required: true},
    publisher: {type: String,required: true},
    publishDate: {type: Number,default: true},
    content: String
})

// 基于这个结构，生成一个指定集合的操作对象 

const goodsModel = mongoose.model('goods',goodsSchema)

module.exports = goodsModel