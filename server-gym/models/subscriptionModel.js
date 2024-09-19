const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    subscriptionDuration: {
        type: Number,
        required: [true, "La subscription deve contenere la durata"],
    },
    weeklyWorkouts: {
        type: Number,
        required: [true, "Bisogna inserire gli allenamenti settimanali"],
    },
    price: {
        type: Number,
        required: [true, "Bisogna inserire il prezzo dell'abbonamento"]
    },

})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;