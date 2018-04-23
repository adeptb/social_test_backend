const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/UserController');
const CommunityController = require('./../controllers/CommunityController');

const custom = require('./../middleware/custom');

const passport = require('passport');
const path = require('path');


require('./../middleware/passport')(passport)
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post('/users', UserController.create);                                                  
router.post('/users/login', UserController.login);

router.post('/communities', passport.authenticate('jwt', {session:false}), CommunityController.create);                  
router.get('/communities', passport.authenticate('jwt', {session:false}), CommunityController.getAll);                  

router.get('/communities/:company_id', passport.authenticate('jwt', {session:false}), custom.community, CommunityController.get);    
router.put('/communities/:company_id', passport.authenticate('jwt', {session:false}), custom.community, CommunityController.update);  
router.delete('/communities/:company_id', passport.authenticate('jwt', {session:false}), custom.community, CommunityController.remove);

module.exports = router;