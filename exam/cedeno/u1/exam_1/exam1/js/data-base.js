const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const uri = 'mongodb+srv://cedeno:cedeno@cluster0.zfqak3j.mongodb.net/exam1?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

module.exports = mongoose;
