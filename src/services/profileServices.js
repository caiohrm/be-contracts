const Sequelize = require("sequelize");
const { Job,Profile,Contract } = require('../model')
const {unpaidJobsByClient} = require("./jobsService");

const updateBalance = (async (profile_id, amount ) => {
    //the question here should I validate the profile if its the same as the id? 
    //I have two solutions here: I can just ignore the the userId in the route and use the profile in the header
    //Or I will use the userId in the route ignoring the profile in the header
    //in this case I'll use the profile in the header
    try {
        const jobs = await unpaidJobsByClient(profile_id)
        const valueToPay =  jobs.reduce((value,job)=> {return value + job.price},0);
        if(amount < (0.25 * valueToPay)){
           await Profile.update({ balance: Sequelize.literal(`balance + ${amount}`) }, { where: { id: profile_id } }); 
           return true;
        }
        return false;   
    } catch (error) {
        return false;
    }
     
})

const getBestProfession = (async(start,end)=>{
    try {
        const job = await Job.findOne(
            {
                attributes: [[Sequelize.fn('sum', Sequelize.col('price')), 'total_amount']] ,
    
                include: [
                    {
                        model: Contract,
                        attributes:["ContractorId"],
                        include:{
                            model: Profile,
                            as:"Contractor",
                            attributes:["profession"]
                        },
                    },
                    
                ]
                , where:
                {
                    paid: true ,
                    paymentDate:{[Sequelize.Op.between]:[start,end]}
                },
                group:["Contract.Contractor.profession"],
                order:[["total_amount","desc"]],
            });

            return {total_amount: job?.dataValues.total_amount,profession:job?.Contract.Contractor.profession}
    } catch (error) {
        console.log(error);
        return null;
    }
    
})


const getBestClient = (async(start,end,limit)=>{

    try {
        const job = await Job.findAll(
            {
                attributes: [[Sequelize.fn('sum', Sequelize.col('price')), 'total_amount']] ,
    
                include: [
                    {
                        model: Contract,
                        attributes:["ClientId"],
                        include:{
                            model: Profile,
                            as:"Client"
                        },
                    },
                    
                ]
                , where:
                {
                    paid: true ,
                    paymentDate:{[Sequelize.Op.between]:[start,end]}
                },
                group:["Contract.ClientId"],
                order:[["total_amount","desc"]],
                
                limit:limit
            });
    
            return job.map(x=> ({id:x?.Contract.Client.id,fullName: `${x?.Contract.Client.firstName} ${x?.Contract.Client.lastName}`, paid: x?.dataValues.total_amount})) 
    } catch (error) {
        console.log(error);
        return null;
    }
    
})



module.exports = { updateBalance,getBestProfession,getBestClient }  