"use strict"
const db = require('../config/database')

class Agents {
  static findByName (username, cb) {
    db.query("SELECT * FROM agent_details WHERE user_name = ?;" ,[username],cb)
  }
}

module.exports = Agents
