const {contractsById,contracts} = require('../services/contractService')


const getContractsById =  (async (req,res)=>{
    const {id} = req.params
    const profile_id = req.profile.id
    const contract =  await contractsById(id,profile_id);
    if(!contract) return res.status(404).end()
    res.status(200).json(contract)
});


const getAllContracts =  (async (req,res)=>{
    const profile_id = req.profile.id
    const contract =  await contracts(profile_id);
    if(!contract) return res.status(404).end()
    res.status(200).json(contract)
});

module.exports = {getContractsById,getAllContracts}