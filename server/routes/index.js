const router = require("express").Router();
const userRouter = require("./users");
const bugRouter = require("./bugs");
const roleRouter = require("./role");
const levelRouter = require("./level");


router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.use("/users", userRouter);
router.use("/bugs", bugRouter);
router.use("/roles", roleRouter);
router.use("/levels", levelRouter);


module.exports = router;