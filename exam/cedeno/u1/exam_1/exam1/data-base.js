mongodb+srv://cedeno:cedeno1@cluster0.zfqak3j.mongodb.net/?retryWrites=true&w=majority
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://cedeno:<db_password>@cluster0.zfqak3j.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
module.exports = mongoose;
