const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile')
const {getContractsById,getAllContracts} = require('./controller/contracts');
const {setBalance,bestContractor,bestClient} = require('./controller/profiles');
const {getUnpaidJobs,postPayForJob} = require('./controller/jobs')
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)


app.get('/contracts/:id',getProfile ,getContractsById);
app.get('/contracts',getProfile ,getAllContracts);
app.get('/jobs/unpaid',getProfile ,getUnpaidJobs);
app.post('/jobs/:job_id/pay',getProfile ,postPayForJob);
app.post('/balances/deposit/:userId',getProfile ,setBalance);
app.get('/admin/best-profession',getProfile ,bestContractor);
app.get('/admin/best-clients',getProfile ,bestClient);
module.exports = app;
