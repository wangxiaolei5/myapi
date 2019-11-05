const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/wangye',{ useNewUrlParser: true ,useUnifiedTopology: true} )

const db = mongoose.connection

// 是否连接成功
db.once('open',() => {
    console.log('db ok')
})

// 是否连接失败
db.on('close',() => {
    console.log('db not ok')
})
