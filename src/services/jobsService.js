const Sequelize = require("sequelize");
const { Job, Profile, Contract, sequelize } = require('../model')
const { Mutex } = require('async-mutex');


const unpaidJobs = ((profile_id) => {
    try {
        return Job.findAll(
            {
                attributes: { exclude: ["Contract"] },
    
                include: [
                    {
                        model: Contract,
                        where: {
                            [Sequelize.Op.or]: [{ "ClientId": profile_id }, { "ContractorId": profile_id }],
                            status: "in_progress" 
                        }
                    }]
                , where:
                {
                    [Sequelize.Op.or]: [{ paid: false }, { paid: null }],
    
    
                }
            });    
    } catch (error) {
        console.log(error);
        return null;
    }
    
});

const unpaidJobsByClient = ((profile_id) => {
    
    try {
        return Job.findAll(
            {
                attributes: { exclude: ["Contract"] },
    
                include: [
                    {
                        model: Contract,
                        where: {
                            "ClientId": profile_id ,
                            status: "in_progress" 
                        }
                    }]
                , where:
                {
                    [Sequelize.Op.or]: [{ paid: false }, { paid: null }],
                }
            });   
    } catch (error) {
        console.log(error);
        return null
    }
});

const unpaidJobsById = ((profile_id, job_id) => {
    try {
        return Job.findOne(
            {
                attributes: { exclude: ["Contract"] },
    
                include: [
                    {
                        model: Contract,
                        where: {
                            [Sequelize.Op.or]: [{ "ClientId": profile_id}, { "ContractorId": profile_id }],
                            status: "in_progress" 
                        }
                    }]
                , where:
                {
                    [Sequelize.Op.or]: [{ paid: false }, { paid: null }],
                    id: job_id
                }
            });    
    } catch (error) {
        console.log(error);
        return null;
    }
    
});

const payJob = (async (profile_id, job_id) => {
    const mutex = new Mutex();
    const release = await mutex.acquire();
    try {
        
        const job = await unpaidJobsById(profile_id, job_id);
        if (job === null) {
            return false;
        }
        const profile = await Profile.findOne({where: {id: profile_id}})
        if (profile.balance < job.price) {
            return false;
        }
        await sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE }, async t => {
            await Job.update({ paid: true, paymentDate: Date.now }, { where: { id: job_id } }, { transaction: t });
            await Profile.update({ balance: Sequelize.literal(`balance - ${job.price}`) }, { where: { id: job.Contract.ClientId } }, { transaction: t });
            await Profile.update({ balance: Sequelize.literal(`balance + ${job.price}`) }, { where: { id: job.Contract.ContractorId } }, { transaction: t });
        })
        return true;

    } catch (error) {
        console.log(error);
        return error
    }finally{
        release()
    }

})


module.exports = { unpaidJobs, payJob,unpaidJobsByClient,unpaidJobsById }
