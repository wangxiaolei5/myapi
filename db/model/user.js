const mongoose = require('mongoose')

// 定义集合的结构，相当于是一个表头
const userSchema =new mongoose.Schema({
    username: {type: String,required: true},
    password: {type: String,required: true},
    tel: {type: String,required: true}
})

// 基于这个结构，生成一个指定集合的操作对象 
/*
    model的第一个参数是操作对象的名称
    如果不加s，实际对应的集合名称会自动加上一个s
    如果加了s，实际对应的集合名称与这里的名称一致
*/
const userModel = mongoose.model('user',userSchema)

module.exports = userModel