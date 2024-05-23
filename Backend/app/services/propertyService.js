const Property = require('../models/property');
const { uploadOncloudnary } = require('../utils/cloudinary');


// 
const createPropertyService = async (req, res) => {

    const { propertyType, propertyName, address, city, state, country, zipCode, description, amenities } = req.body;
    //const images = req.files ? req.files.map(file => file.path) : [];
    const files = req.files ? req.files : [];



    const labels = req.body.labels ? (Array.isArray(req.body.labels) ? req.body.labels : [req.body.labels]) : [];


    try {
        // Check if required fields are provided
        if (!propertyType || !propertyName || !address || !city || !state || !country || !zipCode || !description) {
            return res.status(400).send({ message: "Please fill all the fields" });
        }

        // upload on cloudanary
        const uploadedImages = await Promise.all(files.map(async (file) => {
            const uploadResponse = await uploadOncloudnary(file.path);
            return uploadResponse.url;
        }));

        // Create a new Property object with the provided data
        const newProperty = new Property({
            propertyType,
            propertyName,
            address,
            city,
            state,
            country,
            zipCode,
            description,
            images: uploadedImages,
            labels,
            amenities
        });

        // Save the new property to the database
        await newProperty.save();
        return res.status(201).send({
            success: true,
            message: "Property created successfully",
            property: newProperty // Optionally, you can send back the created property
        });
    } catch (error) {
        console.log("---", error);
        return res.status(400).json({ success: false, message: error.message });
    }
};


// PropertList service
const propertyDetailsService = async (req, res) => {
    try {
        const data = await Property.find({});
        return res.status(200).send({ success: true, message: "list get successfully", data: data })
    }
    catch (error) {
        return res.status(400).send({ success: true, message: error.message });
    }
}

// Property Delete Service
const propertyDeleteService = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteProperty = await Property.findByIdAndDelete(id);
        console.log(deleteProperty);
        return res.status(201).send({ success: true, meassage: "Deleted succcesfuly" });

    } catch (error) {
        return res.status(404).sned({ success: false, message: error.meassage })
    }
}

// Edit propertyService

const editPropertyService = async (req, res) => {
    const id = req.params.id;

    try {
        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).send({ success: false, message: "Property not found" })
        } else {
            res.status(201).send({ success: true, message: " property found successfully", data: property });
        }
    } catch (error) {
        res.status(404).send({ success: false, message: "error in fetching property" })
    }

}
// propertyUpdate service
const propertyUpdateService = async (req, res) => {
    const id = req.params.id;
    const files = req.files ? req.files : [];


    const { propertyType, propertyName, address, city, state, country, zipCode, description, images, labels, amenities } = req.body;
    try {

        const uploadedImages = await Promise.all(files.map(async (file) => {
            const uploadResponse = await uploadOncloudnary(file.path);
            return uploadResponse.url;
        }));

        updateProperty = await Property.findByIdAndUpdate(id, {
            propertyType, propertyName, address, city, state, country, zipCode, description, images: uploadedImages, labels, amenities
        })

        res.status(201).send({ success: true, message: "Property updated successfully" })
        console.log(updateProperty);
    }
    catch (error) {
        console.log("----", error);
        res.status(500).send({ success: false, message: error })
    }


}




module.exports = { createPropertyService, propertyDetailsService, propertyDeleteService, editPropertyService, propertyUpdateService };