const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://subhashphuke23:wIYjpRVB2JmiofGK@cluster0.qxxcfdu.mongodb.net/")
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((e) => console.log(e));
app.use(postRoutes, userRoutes, commentRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);

app.listen(5000, () => {
    console.log('Server listening on 5000');
});
