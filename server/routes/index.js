const router = require("express").Router();
const userRouter = require("./users");
const bugRouter = require("./bugs");

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.use("/users", userRouter);
router.use("/bugs", bugRouter);


module.exports = router;