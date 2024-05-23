const mongoose = require('mongoose');


const propertySchema = new mongoose.Schema({
    propertyType:{
        type:'String',
        required:true
    },
    propertyName:{
        type:'String',
        required: true
    },
    address:{
        type:'String',
        required:true
    },
    city:{
        type:'String',
        required:true
    },
    state:{
        type:'String',
        required:true
    },
    country:{
        type:'String',
        required:true
    },
    zipCode:{
        type:'String',
        required:true
    },
    description:{
        type:'String',
        required:true
    },
    images:{
        type:[String]
    },
    labels:{
        type:[String],
    },
    amenities:{
        type:[String],
        required:true
    },
})

// const Property =mongoose.model('Property',propertySchema);

// module.exports=Property;
const Property = mongoose.model('Property', propertySchema);
module.exports = Property;