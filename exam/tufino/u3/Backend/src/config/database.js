const mongoose = require('mongoose');
const Product = require('../models/Product');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://eatufino1:eatufino1@cluster0.o2uzj25.mongodb.net/ExamU3?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');

        const count = await Product.countDocuments();
        if (count === 0) {
            console.log('No products found, creating sample data...');
            await Product.insertMany([
                { product_id: '1', product_name: 'Laptop', product_price: 500, product_quantity: 2, total: 1000 },
                { product_id: '2', product_name: 'Mouse', product_price: 25, product_quantity: 4, total: 100 },
                { product_id: '3', product_name: 'Keyboard', product_price: 75, product_quantity: 3, total: 225 },
                { product_id: '4', product_name: 'Monitor', product_price: 300, product_quantity: 1, total: 300 },
                { product_id: '5', product_name: 'Headphones', product_price: 50, product_quantity: 2, total: 100 }
            ]);
            console.log('Sample products created successfully');
        } else {
            console.log(`Found ${count} products in database`);
        }

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;