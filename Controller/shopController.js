const path=require('path');
const { title } = require('process');

const ProductModel=require("../Model/product");
const CartModel=require("../Model/cart")

exports.getshoppage=(req,res)=>{
    ProductModel.find().then(formArray=>{
        console.log("shopppppppppp",formArray);//eta array return kor6e .
res.render('Shop/product_shop',{
    title:'shoppage',
    shop_value:formArray,
    path:'/shop'
})
}).catch(err=>{
    console.log("error",err);
})
}
//-----------------------------------------------------------------------------------------------------------------------------------
exports.getshopdetailspage=(req,res)=>{
    const porduct_id=req.params.prodid;//ekhane ami URL er modhyo diye patha6i bole params()method use hoi.jokjon params function er through diye accpte kor6e tokhon route section je variable ta likhe6i seta ekhane dite hobe.
    ProductModel.findById(porduct_id).then(formArray=>{
        console.log("fetch ID",formArray);//eta Object return kor6e.
res.render('Shop/shopProductView',{
    title:"ShopProductDetail",
    shop_value:formArray,
    path:'/shopProductView/:prodid'
})
}).catch(errr=>{
        console.log("detailError",errr);
    })
}
//----------------SEARCH ER JONNO--------------------------
exports.postsearchproduct=(req,res)=>{
    const product_search=req.body.Search;
    ProductModel.find({$or:[{productName:{$regex:product_search}},{productDescription:{$regex:product_search}}]}).then((result)=>{
        console.log("sarch result",result);
         res.render('Shop/product_shop',{
             title:'product search result',
             shop_value:result,
             path:'/postsearch'

         })
    }).catch((err)=>{
        console.log(err);
    })
}
// exports.postsearchproduct=(req,res)=>{
//     const product_name=req.body.Search;
//     ProductModel.find({productName:product_name}).then((result)=>{//1st model er name : je veriable ta diye6i seta
// console.log("search",result);
// res.render('Shop/product_shop',{
//     title:'product',
//     shop_value:result,
//     path:'/postsearch'
// })
//     }).catch((err)=>{
// console.log(err);
//     })
// }

exports.getcartdetailpage=(req,res)=>{
   const cartArray=[]
    const c_id=req.params.cid;
    const user_id=req.user._id
    const quantity=1
    CartModel.find({productId:c_id,userId:user_id}).then((formArray)=>{
        console.log("fetch detail id",formArray);
        if(formArray===''){

            ProductModel.findById(c_id).then((result)=>{
              cartArray.push(result)
           
            const Data=new CartModel({
                productId:c_id,
                quantity:quantity,
                userId:user_id,
                cart:cartArray
            })
            Data.save().then(result=>{
                console.log("Successfully added",result);
                res.redirect('/cartPage')
              }).catch(err=>{
                console.log("error",err);
              });
                
             
        }).catch((err)=>{
            console.log(err);
        })
    } else{
        ProductModel.findById(c_id).then((result)=>{
            cartArray.push(result)
         
          const Data=new CartModel({
              productId:c_id,
              quantity:quantity,
              userId:user_id,
              cart:cartArray
          })
          Data.save().then(result=>{
              console.log("Successfully added",result);
              res.redirect('/cartPage')
            }).catch(err=>{
              console.log("error",err);
            });
              
           
      }).catch((err)=>{
          console.log(err);
      })

    }
}).catch((err)=>{
    console.log(err)
})
}                   
    
    


