const {updateBalance,getBestProfession,getBestClient} = require("../services/profileServices")

const setBalance =  (async (req,res)=>{
    if(await updateBalance(req.profile.id,req.body.amount))
        res.status(200).end()
    else
        res.status(400).end()
})

const bestContractor =(async(req,res)=>{
const start = req.query.start || new Date(-8640000000000000);
const end = req.query.end || new Date(8640000000000000);
res.status(200).json(await getBestProfession(start,end))

})

const bestClient =(async(req,res)=>{
    const start = req.query.start || new Date(-8640000000000000);
    const end = req.query.end || new Date(8640000000000000);
    const limit =  req.query.limit || 2;
    res.status(200).json(await getBestClient(start,end,limit))
})


module.exports = {setBalance,bestContractor,bestClient}