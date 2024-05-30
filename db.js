const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/bookstore';

// const dbURI = 'mongodb+srv://herickfr223:JLQqZ26xWysi0LH4@cluster0.1ip671l.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

module.exports = mongoose;
