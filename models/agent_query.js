"use strict"
const db = require('../config/database')

class Agents {
  static findByName (username, cb) {
    db.query("SELECT * FROM agent_details WHERE user_name = ?;" ,[username],cb)
  }
  static fetchCarrier(state , cb){
    db.query("SELECT * FROM carries WHERE state = ?;" ,[state],cb)
  }
  static insertCredential(username,carrier,state,cb){
    db.query("INSERT INTO credential_storage (agent_username ,carrier,flag)VALUES(?,?,?);" ,[username,carrier,0],cb)
  }
  static fetchCredential (username, cb) {
    db.query("SELECT * FROM credential_storage WHERE agent_username  = ?;" ,[username],cb)
  }
  static updateFlag (username, cb) {
    db.query("UPDATE agent_details SET flag = ? WHERE user_name = ?;" ,[1,username],cb)
  }
  static addCredential (AgentUsername,password,carrier,username,cb) {
    db.query("UPDATE credential_storage SET username  = ?, password=? ,  flag =? WHERE carrier =? AND  agent_username= ? " ,[AgentUsername,password,1,carrier,username],cb)
  }

}

module.exports = Agents
