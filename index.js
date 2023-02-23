
const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const app = express();

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/blog');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); // to use delete with form as we can only use get/post by default

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles });
})

app.use('/articles', articleRouter); // everthing in articles.js is relative to the route '/articles'

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});