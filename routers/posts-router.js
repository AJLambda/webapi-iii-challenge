const express = require("express");

const PostHubs = require("../data/helpers/postDb"); // import the db functions;

const router = express.Router();

// this only runs if the url has /api/posts in it
router.get("/", async (req, res) => {
  try {
    const posts = await PostHubs.get(req.query);
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the posts"
    });
  }
});

const error = {
  title: "Wrong Credentials",
  description: "The credentials are incorrect",
  recoveryInstructions: "Please verify your information and try again."
};

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
    const post = await PostHubs.getById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the post"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = await PostHubs.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error adding the post"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await PostHubs.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The post has been nuked" });
    } else {
      res.status(404).json({ message: "The post could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error removing the post"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const hub = await PostHubs.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "The post could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error updating the post"
    });
  }
});

// add an endpoint that returns all the posts for a hub
// this is a sub-route or sub-resource
// router.get("/:id/messages", async (req, res) => {
//   try {
//     const messages = await PostHubs.findHubMessages(req.params.id);

//     res.status(200).json(messages);
//   } catch (error) {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       message: "Error getting the messages for the hub"
//     });
//   }
// });

// add an endpoint for adding new message to a hub
// router.post("/:id/messages", async (req, res) => {
//   const messageInfo = { ...req.body, hub_id: req.params.id };

//   try {
//     const message = await PostHubs.addMessage(messageInfo);
//     res.status(210).json(message);
//   } catch (error) {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       message: "Error getting the messages for the hub"
//     });
//   }
// });

module.exports = router;
