const router = require("express").Router();
const userService = require("../services/userService");
const { extractErrorMsgs } = require("./../utils/errorHandler");

router.get("/singup", (req, res) => {
  res.render("singup");
});

router.post("/singup", async (req, res) => {
  
  const { username, email, password } = req.body;
  try {
    await userService.singup({ username, email, password });
  res.redirect("/users/login");
  } catch (error) {
     const errorMessages = extractErrorMsgs(error);
    res.status(404).render("singUp", { errorMessages });
  }

  
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  //find the user
  const { email, password } = req.body;
  try {
    const token = await userService.login(email, password);

    res.cookie("auth", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
 const errorMessages = extractErrorMsgs(error);
    res.status(404).render("login", { errorMessages });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.clearCookie("authDeliver");
  res.redirect("/");
});

module.exports = router;
