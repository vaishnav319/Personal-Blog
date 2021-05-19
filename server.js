//run this by using npm run devStart
const express = require("express");
const mongoose= require("mongoose");
const Article= require('./models/article')
const methodOverride = require('method-override')
const app =express()
const articleRouter= require('./routes/articles')


app.set('view engine','ejs')


mongoose.connect("mongodb://localhost/ytBlog",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});

app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))


app.get("/",async(req,res)=>{
  const articles=await Article.find().sort({
    createdAt:'desc'
  })
  res.render("articles/index",{articles:articles});
})

app.listen(5000)


app.use('/articles',articleRouter)
