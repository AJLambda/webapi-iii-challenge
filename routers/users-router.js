const express = require("express");

const UserHubs = require("../data/helpers/userDb"); // import the db functions;

const router = express.Router();

// const errorHelper = (status, message, res) => {
//   res.status(status).json({ error: message });
// };

// ===================== CUSTOM MIDDLEWARE =====================

function upperCaseName(req, res, next) {
  console.log(req.body.name);
  if (req.body.name !== req.body.name.toUpperCase()) {
    req.body.name = req.body.name.toUpperCase();
    next();
  } else {
    next();
  }
}

// ===================== USER ENDPOINTS =====================

// this only runs if the url has /api/users in it
router.get("/", async (req, res) => {
  try {
    const users = await UserHubs.get(req.query);
    res.status(200).json(users);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the users"
    });
  }
});

// /api/hubs/:id
// router.get('/:id', (req, res) => {
//   Hubs.findById(req.params.id)
//     .then(hub => {
//       if (hub) {
//         res.status(200).json(hub);
//       } else {
//         res.status(404).json({ message: 'Hub not found' });
//       }
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: 'Error retrieving the hub',
//       });
//     });
// });

router.get("/:id", async (req, res) => {
  try {
    const user = await UserHubs.getById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the user"
    });
  }
});

router.post("/", upperCaseName, async (req, res) => {
  try {
    const user = await UserHubs.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error adding the user"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await UserHubs.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The user has been nuked" });
    } else {
      res.status(404).json({ message: "The user could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error removing the user"
    });
  }
});

router.put("/:id", upperCaseName, async (req, res) => {
  try {
    const user = await UserHubs.update(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "The user could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error updating the user"
    });
  }
});

// add an endpoint that returns all the posts for a user
// this is a sub-route or sub-resource
router.get("/:id/posts", async (req, res) => {
  console.log(req.params.id);
  try {
    const messages = await UserHubs.getUserPosts(req.params.id);
    res.status(200).json(messages);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error getting the messages for the user"
    });
  }
});

// // add an endpoint for adding new message to a user
// router.post("/:id/posts", async (req, res) => {
//   const messageInfo = { ...req.body, user_id: req.params.id };

//   try {
//     const message = await UserHubs.addMessage(messageInfo);
//     res.status(210).json(message);
//   } catch (error) {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       message: "Error getting the messages for the user"
//     });
//   }
// });

// export default router
module.exports = router;
