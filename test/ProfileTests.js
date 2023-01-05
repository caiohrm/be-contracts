const { expect } = require('chai');
const { updateBalance,getBestProfession,getBestClient } = require("../src/services/profileServices")
describe('ProfileService tests', () => {

    describe('updateBalance', () => {
        const updateBalanceTrue = updateBalance(1,1)
        const updateBalanceFalse = updateBalance(1,1000)
        it('should be true', () => {
            return updateBalanceTrue.then(result=>{
                expect(result).to.be.true;
            })
        })
        it('should be false', () => {
            return updateBalanceFalse.then(result=>{
                expect(result).to.be.false;
            })
        })
    })

    describe('getBestProfession', () => {
        const start = new Date(2020,07,10);
        const end =  new Date(2020,07,11)
        const getBestProfessionTrue = getBestProfession(start,end)
        it('should not be empty and profession should be Musician', () => {
            return getBestProfessionTrue.then(result=>{
                console.log(result);
                expect(result).to.not.be.empty;
                expect(result).to.be.deep.equal({
                    "total_amount": 21,
                    "profession": "Musician"
                });
            })
        })
    })

    describe('getBestClient', () => {
        const start =  new Date(-8640000000000000);
        const end =  new Date(8640000000000000);
        const getBestClientTrue = getBestClient(start,end,1)
        it('should not be empty and have length equals 4', () => {
            return getBestClientTrue.then(result=>{
                expect(result).to.not.be.empty;
                expect(result).to.an.an('array');
                expect(result.length).to.be.equals(1);
                expect(result).to.be.deep.equal( [{
                    "id": 4,
                    "fullName": "Ash Kethcum",
                    "paid": 2020
                }])
            })
        })
    })
})