const Community = require('./../models/community');

let community = async function (req, res, next) {
    let community_id, err, company;
    community_id = req.params.community_id;

    [err, community] = await to(Community.findOne({_id:community_id}));
    if(err) return ReE(res,"err finding community");

    if(!community) return ReE(res, "community not found with id: "+community_id);
    let user, users_array;
    user = req.user;
    users_array = community.users.map(obj=>String(obj.user));

    if(!users_array.includes(String(user._id))) return ReE(res, "User does not have permission to read app with id: "+app_id);

    req.community = community;
    next();
}
module.exports.community = community;