const path=require('path');
//const formArray=[];
const ProductModel=require('../Model/product');

exports.getPageView=(req,res)=>{ //ekhane page ta just display hobe (get er kaj)
    res.render('Admin/add-product',
    {title:'Add Product',
  path:'/add-product'})
}
//--------------------------------------------------------------------------------------------------
exports.postPage=(req,res)=>{ 
    console.log("total body value",req.body);
//++++++++++++++++++++++++++++++++
   const product_image=req.file;
   console.log(product_image);
   const pImage_url=product_image.path;
//++++++++++++++++++++++++++++++++++++++++
    const productName  =req.body.productname;
    const productPrice =req.body.productprice;
    const productDescription =req.body.productdescription;
//productname,productprice,productdescription are the name of input box in ejs file.
    console.log("Coming from form:::::",product_image,productName,productPrice,productDescription);
    //formArray.push({
  //const Product = new ProductModel(productName,productPrice,productDescription,null);//arguments
  const Product=new ProductModel({
//----eta object format e likhte hobe karon model e object format e a6e.
    // model er key name:je value gulo receive kor6i sei gulo pass kor6i.
       productImage:pImage_url,
       productName:productName,
       productPrice:productPrice,
       productDescription:productDescription 
//productImage,productName,productPrice,productDescription are from model.model er key gulo.
  });
    
 Product.save().then(result=>{//save()is predefine function of mongoose to inseart
   console.log("Successfully Insterted Value",result);
 }).catch(err=>{
   console.log("error not Inserted value",err);
 });
    res.redirect('/product_detail');
}
//------------------------------------------------------------------------------------------------------------
//fetching  er jonno (admin page e fetch hobe)
exports.getDetailPage=(req,res)=>{
     ProductModel.find().sort({productName:1}).then(formArray=>{//find() predefined function of mongoose to collect entire(sompurnno) data from the database.
      console.log("formarray",formArray);
    // res.render('Admin/detailsProductView',{
    //     title:"AdminView",
    //     form_value:formArray,
    //     path:'/product_detail'
    // })
    return res.status(201).json({
      success:true,
      message:"Product Fetched successfully ",
      formArray:formArray
    })
  }).catch(err=>{
    console.log("error");
  });
}
//-----------------------------------------------------------------------------------------------------------
//Edit Page  er jonno
//etai get() method ke kaje lagiye id er rescpted e display kora6i
exports.getadminEdit=(req,res)=>{
const porduct_id = req.params.p_id; //parama er through diye value collect hobe.
ProductModel.findById(porduct_id).then(formArray=>{// findByid() predefine function of mongoose
  console.log("edit",formArray);
  res.render('Admin/editAdmin',{
    title:"product edit page",
    editValue:formArray,
    path:''
  })
}).catch(err=>{
  console.log(err);
})
}
//post ()method -- new form theke value gulo ke acpet kor6e
exports.postEditFormValuePage=(req,res)=>{
  const porduct_id=req.body.productid;
  const updatedpName=req.body.productName;
  const updatedpPrice=req.body.productPrice;
  const updatedpDescription=req.body.productdescription;

  //const newUpdateProduct=new ProductModel(pName,pPrice,pDescription,porduct_id);
  ProductModel.findById(porduct_id).then((value)=>{
    console.log("values",value);//ekhane database theke value gulo asbe.
    //er por new value gulo ke update kor6i. 
    value.productName=updatedpName
    value.productPrice=updatedpPrice
    value.productdescription=updatedpDescription
     
return value.save().then((updatedValue)=>{
console.log("updated-value",updatedValue);
res.redirect('/product_detail')
}).catch((err)=>{
  console.log("data not updated",err);
})
}).catch(err=>{
    console.log(err);
  })
}
//-----------------------------------------------------------------------
//delete er jonno get method
 exports.getadmindelete=(req,res)=>{
   const porduct_id = req.params.p_id;//match with router portion
 ProductModel.deleteOne({_id:porduct_id}).then(results=>{//ekhane deleteOne()function ta id take object format e acpet korbe._id ta key name er recpect e r body theke je valu ta ni6i seta ke valu hisabe pass korabo.
   console.log("Delete Value",results);
   res.redirect('/product_detail')
 }).catch(err=>{
   console.log(err);
 })
 }
//=================================================================//delete er jonno post method
// exports.postAdminDelete=(req,res)=>{
//   const porduct_id =req.body.productid; //match with name in form

//   ProductModel.deleteOne({_id:porduct_id}).then(result=>{
//     console.log("qqqq",result);
//     res.redirect('/product_detail')
// }).catch(err=>{
// console.log("errrr",err);
//   })
// }
