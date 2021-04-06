const express = require('express')
const crypto = require('crypto')
const session = require('express-session')
const methodOverride = require('method-override')

require('./lib/mongoos')
const User = require('./models/User')
const Port = require('./models/Port')

const app = express()
//middleware
app.use(express.json())
app.use(express.urlencoded())
app.use(methodOverride('_methon'))
app.use(express.static('./public'))
app.set('view engine', 'ejs')
app.use(session({
    secret: '($*YA)*@#12asd^%#',
    resave: false,
    saveUninitialized:true
}))

app.get('/', (req,res) => {
    const { message } =req.query
    res.render('main', {user: req.session.user,message})
})

app.get('/posts', async (req, res) => {
    const posts = await Post.find()
    res.render('posts', {posts, user:req.session.user})
})

app.get('/posts/create', (req,res) => {
    if (!req.session.user) return res.redirect('/?message=로그인을 한 후 글을 작성해주세요')
    res.render('createPost')
})

app.get('/posts/:postId', async (req,res) =>{
    const postId = req.params.postId
    const post = await Post.findOneAndUpdate({_id:postId}, {$inc: {hit:1}}, {new: true})
    res.render('postDetail', {post,user:req.session.user})
})
app.get('/registry', (req,res) => {
    res.render('registry')
})