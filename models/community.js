const mongoose = require('mongoose');

let CommunitySchema = mongoose.Schema({
    name: {type:String},
    owner: {type: mongoose.Schema.ObjectId, ref : 'User'},
    users: [ {user:{type : mongoose.Schema.ObjectId, ref : 'User'}, permissions:[{type:String}]} ],
}, {timestamps: true});

CommunitySchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;
    return json;
};

let community = module.exports = mongoose.model('Community', CommunitySchema);