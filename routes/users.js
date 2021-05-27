var express = require('express');
var router = express.Router();
var userOps = require('../utils/userOps');
const mongoose = require('mongoose');
const userModel = mongoose.model('users');


// @route = for getting all users
// @method = GET
router.get('/', async function(req, res, next) {
  var users = await userModel.find({});
  return res.send(users);
})


// @route = for getting friends of particaular level
// @method = GET
router.get('/:userId/level/:levelNo/', async function(req, res, next) {

  // url parameters
  var userId = req.params.userId;
  var levelNo = req.params.levelNo;
  levelNo = Number(levelNo)

  // validation for levelNo
  if(!levelNo) res.send({error: "Invalid levelNo"})
  if(!userOps.isValidObjectId(userId)) res.send({error: "Invalid userId"})
  else {

    // first level friends for given user    
    var friends = await userOps.getFirstLevelFriends(userId);
    var previousLevelFriends;
    kLevel = levelNo;
    kLevel--;

    if(friends == -1) res.send({message: 'something went wrong'})

    while(kLevel){
      
      var kLevelFriends = new Set()
      for(friend of friends){
        firstLevelFriends = await userOps.getFirstLevelFriends(friend);
        for(firstLevelFriend of firstLevelFriends){
          var flag = 0;
          for(friend of friends){
            if(friend == firstLevelFriend){
              flag = 1;
              break;
            }
          }
          if(flag == 0 && firstLevelFriend != userId) 
            kLevelFriends.add(firstLevelFriend)
        }
      }

      previousLevelFriends = friends
      friends = kLevelFriends;
      kLevel--;
    }

    var kLevelFriends = [];

    for(friend of friends){
      var docs;
      try{
        docs = await userModel.find({_id: friend});
        var flag = 0;
        if(previousLevelFriends)
          for(friend of friends){
            if(previousLevelFriends.includes(friend)){
              flag = 1;
              break;
            }
          }
        if(!flag)
        kLevelFriends = [...kLevelFriends, docs[0]];
      }catch(e){
        kLevelFriends = []
      }
    }

    res.send(kLevelFriends)
  }

})

module.exports = router;
