const User = require('./../models').User;
const validator = require('validator');

const getUniqueKeyFromBody = function(body){// this is so they can send in 3 options unique_key, email, or phone and it will work
    let unique_key = body.unique_key;
    if(typeof unique_key==='undefined'){
        if(typeof body.username != 'undefined'){
            unique_key = body.username
        }else{
            unique_key = null;
        }
    }

    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createUser = async function(userInfo){
    let unique_key, auth_info, err;

    auth_info={}
    auth_info.status='create';

    unique_key = getUniqueKeyFromBody(userInfo);
    if(!unique_key) TE('An username was not entered.');
    
    userInfo.username = unique_key;

    [err, user] = await to(User.create(userInfo));
    if(err) TE('user already exists with that username');

    return user;

}
module.exports.createUser = createUser;

const authUser = async function(userInfo){
    let unique_key;
    let auth_info = {};
    auth_info.status = 'login';
    unique_key = getUniqueKeyFromBody(userInfo);

    if(!unique_key) TE('Please enter an email or phone number to login');


    if(!userInfo.password) TE('Please enter a password to login');

    let user;
   
    auth_info.method='username';

    [err, user] = await to(User.findOne({username:unique_key }));
    if(err) TE(err.message);


    if(!user) TE('Not registered');

    [err, user] = await to(user.comparePassword(userInfo.password));

    if(err) TE(err.message);

    return user;

}
module.exports.authUser = authUser;