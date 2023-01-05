const { expect } = require('chai');
// const {seed} = require('../scripts/seedDb')
const { unpaidJobs, unpaidJobsByClient, unpaidJobsById, payJob } = require("../src/services/jobsService")

describe('JobService tests', () => {
    // before(async (done)=>{
        
    //     // await .seed();
    // })
    describe('unpaidJobs', () => {
        const unpaidJobsValid = unpaidJobs(1);
        const unpaidJobsErro = unpaidJobs(9);
        it('should return one array with 1 element', () => {
            return unpaidJobsValid.then((result => {
                expect(result).to.be.an('array');
                expect(result).to.have.lengthOf(1);
            }))
        })
        it('should return one array with 0 element', () => {
            return unpaidJobsErro.then((result => {
                expect(result).to.be.an('array');
                expect(result).to.have.lengthOf(0);
            }))
        })
    })
    describe('unpaidJobsByClient', () => {
        const unpaidJobsByClientValid = unpaidJobsByClient(1)
        const unpaidJobsByClientError = unpaidJobsByClient(9)
        it('should return one array with 1 element', () => {
            return unpaidJobsByClientValid.then((result => {
                expect(result).to.be.an('array');
                expect(result).to.have.lengthOf(1);
            }))
        })
        it('should return one array with 0 element', () => {
            return unpaidJobsByClientError.then((result => {
                expect(result).to.be.an('array');
                expect(result).to.have.lengthOf(0);
            }))
        })
    })
    describe('unpaidJobsById', () => {
        const unpaidJobsByIdValid = unpaidJobsById(1, 2)
        const unpaidJobsByIdError = unpaidJobsById(5, 7)

        it('should return one object', () => {
            return unpaidJobsByIdValid.then((result => {
                expect(result).to.not.empty
            }))
        })
        it('should return null', () => {
            return unpaidJobsByIdError.then((result => {
                console.log(result);
                expect(result).to.be.null
            }))
        })
    })

    describe('payJob',  () => {
        const payJobValid = payJob(1, 2)
        const payJobError = payJob(5, 7)
        const payJobRetry = payJob(3, 2)//unpaydJob
        it('should return true', async () => {
            
            return payJobValid.then((result => {
                expect(result).to.be.true
            }))
        })
        it('should return false trying to pay twice', async () => {
            
            return payJobRetry.then((result => {
                expect(result).to.be.false
            }))
        })
        it('should return false', async () => {
            
            return payJobError.then((result=>{
                expect(result).to.be.false
            }))
        })
    })

})