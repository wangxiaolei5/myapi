const mongoose =require('mongoose')

const fenleisSchema =new mongoose.Schema({
    name:{type: String,required: true},
    categories:{type: Array,required: true}
})

const assortment= mongoose.model('fenlei',fenleisSchema)

module.exports =assortment