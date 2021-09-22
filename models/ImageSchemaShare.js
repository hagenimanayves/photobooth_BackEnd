const mongoose =  require('mongoose');
const Schema = mongoose.Schema;


const ImageSchemaShare = new Schema({
    image: {
        type: String,
    },
    date: {
        type: Date, default: Date.now
    }
})

module.exports = mongoose.model('imageshare', ImageSchemaShare)

 