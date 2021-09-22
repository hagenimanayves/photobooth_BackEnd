const mongoose =  require('mongoose');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    image: {
        type: String,
    },
    date: {
        type: Date, default: Date.now
    }
})

module.exports = mongoose.model('image', ImageSchema)

 