const { expect } = require('chai');
const { contractsById, contracts } = require("../src/services/contractService")

describe('ContractService tests', () => {
  describe('Contracts by Id', () => {
    const byId = contractsById(1, 5)
    const byIdError = contractsById(1, 6)
    it('should not be null', () => {
      return byId.then(result => {
        expect(result).to.not.empty
      })

    });

    it('should not be empty', () => {
      return byId.then(result => {
        expect(result).to.not.be.empty
      })
    });

    it('should be null because profile_id 6 its not in this contract', () => {
      byIdError.then(result => {
        expect(result).to.be.null
      })
    });
  });

  describe('All Contracts',()=>{
    const contractsAll = contracts(1);
    const contractsAllError = contracts(9);
    it('it should return 3 contracts',()=>{
      return contractsAll.then(result=>{
        // assert.isArray(result);
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(2);
      })
    })
    it('it should return 0 contracts',()=>{
      return contractsAllError.then(result=>{
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(0);
      })
    })
  })

});

