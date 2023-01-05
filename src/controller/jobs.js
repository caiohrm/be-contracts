const {unpaidJobs,payJob} = require('../services/jobsService')


const getUnpaidJobs =  (async (req,res)=>{
    const profile_id = req.profile.id
    const jobs = await unpaidJobs(profile_id);
    if(!jobs) return res.status(404).end()
    res.status(200).json(jobs)
});

const postPayForJob = (async(req,res)=>{
    const {job_id} = req.params
    if(await payJob(req.profile.id,job_id)) return res.status(200).end();
    return res.status(400).end();
})

module.exports = {getUnpaidJobs,postPayForJob}