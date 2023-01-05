const { Op } = require("sequelize");
const {Contract} = require('../model')

const contractsById =  (async (contractId,profile_id)=>{
    try {
        return await Contract.findOne({where: {id:contractId,[Op.or]:[{ClientId:profile_id}, {ContractorId:profile_id}]}})    
    } catch (error) {
        console.log(error);
        return null;
    }
    
});



const contracts =  (async (profile_id)=>{
    try {
        return await Contract.findAll({where: {[Op.or]:{ClientId:profile_id, ContractorId:profile_id}}})    
    } catch (error) {
        console.log(error);
        return null;
    }
    
});

module.exports = {contractsById,contracts}