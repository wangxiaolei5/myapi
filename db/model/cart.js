const mongoose = require('mongoose')

// 定义集合的结构，相当于是一个表头
const cartSchema =new mongoose.Schema({
    userId: {type: String,required: true},
    goodsId: {type: String,required: true},

    title: {type: String,required: true},
    images: {type: String,required: true},
    price: {type: Number,required: true},
    content: String,
    
    goodsSkus: {type: String,required: true},
    yuanjia: {type: Number,default: 0},
    publisher: String,
    publishDate: String,

    buySku: String,
    buyNum: Number
})

/*
    "title" : "空王冠",
    "rawAuthor" : "丹琼斯",
    "images" : "/images/lol/kongwang.jpg",
    "doubanRating" : 8.7,
    "price" : 39.5,
    "zhe" : 5.9,
    "yuanjia" : 6.0,
    "publisher" : "社会科学文献出版社",
    "publishDate" : "2018-07",
    "content" : "《空。"

*/



const cartModel = mongoose.model('cart',cartSchema)

module.exports = cartModel