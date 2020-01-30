const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();


router.get("/", async (req,res) => {
    // SELECT * FROM accounts
    try {
        const accounts = await db('accounts');
        res.json(accounts);  
    }catch(err) {
        res.status(500).json({errorMessage: 'there was a problem retrieving data from database'})
    }
    

});

router.get("/:id", async (req,res) => {
    //SELCET * FROM acounts WHERE id = ?
    const {id} = req.params;
    try{
        const accounts = await db('accounts').where('id', id);
        res.json(accounts); 
    } catch(err){
        res.status(500).json({errorMessage: 'there was a problem retrieving data from database'})
    }
});

router.post('/', async (req,res) => {
    const accountData = req.body;
    try {
        const account = await db('accounts').insert(accountData);
        res.status(201).json(account);
    } catch(err){
        res.status(500).json({errorMessage: 'there was a problem posting to database'});
    }
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const updateAccount = req.body;
    try {
        const account = await db('accounts').where({id}).update(updateAccount);
        res.status(201).json({updated: account});
    } catch(err) {
        res.status(500).json({errorMessage: 'there was a problem updating post'});
    }
});

router.delete('/:id', async (req,res) => {
    const {id} = req.params;
    try {
        const accountDeleted =await db('accounts').where({id}).delete();
        res.status(200).json({accountsDeleted: accountDeleted});
    } catch(err){
        res.status(500).json({errorMessage: 'there was a problem deleting'});
    }
})

module.exports = router;