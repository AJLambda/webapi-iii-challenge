const db = require("../dbConfig.js");

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
};

function get() {
  return db("posts");
}

function getById(id) {
  return db("posts")
    .where({ id })
    .first();
}

function insert(post) {
  return db("posts")
    .insert(post)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db("posts")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("posts")
    .where("id", id)
    .del();
}

// function findHubMessages(hubId) {
//   return db('messages as m')
//     .join('hubs as h', 'm.hub_id', 'h.id')
//     .select('m.id', 'm.text', 'm.sender', 'h.id as hubId', 'h.name as hub')
//     .where({ hub_id: hubId });
// }

// async function addMessage(message) {
//   const [id] = await db('messages').insert(message);

//   return findMessageById(id);
// }
