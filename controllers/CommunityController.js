const Community = require('../models').Community;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, community;
    let user = req.user;

    let community_info = req.body;
    console.log(community_info);

    [err, community] = await to(Community.create(community_info));
    if(err) return ReE(res, err, 422);

    return ReS(res,{community:community.toWeb()}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, companies;
    [err, companies] = await to(user.Companies());

    let companies_json = []
    for (let i in companies){
        let community = companies[i];
        companies_json.push(community.toWeb())
    }
    return ReS(res, {companies: companies_json});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let community = req.community;
    return ReS(res, {community:community.toWeb()});
}
module.exports.get = get;

const update = async function(req, res){
    let err, community, data;
    community = req.user;
    data = req.body;
    community.set(data);

    [err, community] = await to(Community.save());
    if(err){
        return ReE(res, err);
    }
    return ReS(res, {community:community.toWeb()});
}
module.exports.update = update;

const remove = async function(req, res){
    let community, err;
    community = req.community;

    [err, community] = await to(community.remove());
    if(err) return ReE(res, 'error occured trying to delete the community');

    return ReS(res, {message:'Deleted community'}, 204);
}
module.exports.remove = remove;