const propertyService = require('../services/propertyService');

const createPropertyController=(req,res)=>{
    propertyService.createPropertyService(req,res);
}
const propertyDetails =(req,res)=>{
    propertyService.propertyDetailsService(req,res);
}
const deleteProperty =(req,res)=>{
    propertyService.propertyDeleteService(req,res);
}
const editPropertyController=(req,res)=>{
    propertyService.editPropertyService(req,res);
}
const propertyUpdateController=(req,res)=>{
    propertyService.propertyUpdateService(req,res);
}

module.exports={createPropertyController,propertyDetails,deleteProperty,editPropertyController,propertyUpdateController};