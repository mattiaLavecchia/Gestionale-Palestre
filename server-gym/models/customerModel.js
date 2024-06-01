const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Bisogna inserire un nome"],
        maxlength: [20, 'A name must have less or equal then 30 characters'],
        minlength: [3, 'A name must have more or equal then 10 characters']
    },
    surname: {
        type: String,
        required: [true, "Bisogna inserire le informazioni di accesso"],
        maxlength: [20, 'A surname must have less or equal then 30 characters'],
        minlength: [3, 'A surname must have more or equal then 10 characters']
    },
    birth: {
        type: Date,
        required: [true, "Bisogna inserire le informazioni di accesso"],
    },
    gender: {
        type: String,
        required: [true, "Bisogna inserire le informazioni di accesso"],
    },
    subscriptionDuration: {
        type: Number,
        required: [true, "Bisogna inserire la durata dell'iscrizione"],
    },
    weeklyWorkouts: {
        type: Number,
        require: [true, "Bisogna inserire il numero di allenamenti settimanali"]
    },
    accesses: {
        type: Number,
        require: [true, "Bisogna inserire il numero di accessi rimasti"]
    },
    subscriptionExpires: {
        type: Date,
        required: [true, "Bisogna inserire il giorno di scadenza dell'abbonamento"],
    },
    statusSubscription: {
        type: String,
        required: [true, 'A customer must have a status subscription'],
        default: 'in corso',
        enum: {
            values: ['in corso', 'in scadenza', 'scaduto'],
            message: 'Difficulty is either: in corso, in scadenza, scaduta'
        }
    }
});


const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
