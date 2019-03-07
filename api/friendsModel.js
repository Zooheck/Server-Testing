const db = require("../dbConfig.js");

module.exports = {
  getAll,
  add,
  deleteFriend
};

function getAll() {
  return db("friends");
}

async function add(friend) {
  const [id] = await db("friends").insert(friend);

  return db("friends")
    .where({ id })
    .first();
}
async function deleteFriend(id) {
  return (count = await db("friends")
    .where({ id: id })
    .del());
}
