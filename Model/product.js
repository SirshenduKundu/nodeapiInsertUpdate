const mongoose=require('mongoose');//mongoose ke import kor6i
const schemaVariable=mongoose.Schema; //after that mongoose amake Schema() name ekta function di6e sei
//Schema()function er dara ami schemaVariable varible toiri kor6i and schemaVariable er modye store kor6i.

const ProductSchema=new schemaVariable({//schema stracture
    productImage:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    }
})
// ekhane export kor6i and colliction toiri kore ni6i
module.exports=mongoose.model('Products',ProductSchema);//1st collection name AND 2nd Schema name