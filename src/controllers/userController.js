const router = require('express').Router()
const userService = require('../services/userService')


router.get('/singup', (req, res) => {
   res.render('singup')
})


router.post('/singup', async (req, res) => {
   console.log(req.body);
   const { username,email, password } = req.body;

   await userService.singup({ username,email, password })
     res.redirect('/users/login')
})


router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login",async (req, res) => {
  //find the user
    const {email,password} = req.body
    const token = await userService.login(email,password)

    res.cookie('auth',token,{httpOnly:true})
    res.redirect('/')
})

router.get('/logout', (req, res) => {
  res.clearCookie('auth')
  res.clearCookie('authDeliver')
    res.redirect('/')
})

module.exports = router