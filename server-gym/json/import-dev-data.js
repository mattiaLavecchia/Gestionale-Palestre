const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Payment = require('./../models/paymentModel')
const Access = require('./../models/accessModel')
const Customer = require('./../models/customerModel')
const Subscription = require('./../models/subscriptionModel')

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const payments = JSON.parse(
    fs.readFileSync(`${__dirname}/paymentsData.json`, 'utf-8')
);
const accesses = JSON.parse(
    fs.readFileSync(`${__dirname}/accessData.json`, 'utf-8')
);
const subscriptions = JSON.parse(
    fs.readFileSync(`${__dirname}/subscriptionsData.json`, 'utf-8')
);
const customers = JSON.parse(
    fs.readFileSync(`${__dirname}/customerData.json`, 'utf-8')
)

const importData = async () => {
    try {
        await Payment.create(payments);
        await Access.create(accesses);
        await Subscription.create(subscriptions);
        await Customer.create(customers);
        console.log('Dati inviati correttamente');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

const deleteData = async () => {
    try {
        await Payment.deleteMany();
        await Access.deleteMany();
        await Subscription.deleteMany();
        await Customer.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

// Per chiamare queste righe si fa 
// node json/import-dev-DataTransfer.js --delete
// node json/import-dev-DataTransfer.js --import

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}