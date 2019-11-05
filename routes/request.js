const express = require('express')
const request = require('request')

const router = express.Router()

// 写一个接口，请求百度
router.get('/baidu',(req,res) => {
    request({
        method: 'get',
        url: 'http://www.baidu.com'
    },(error, response, body) => {
        if(!error && response.statusCode == 200){
           res.send(body)
        }
    })
})

module.exports = router