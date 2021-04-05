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