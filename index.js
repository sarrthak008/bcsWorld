
let express = require('express')
const app = express()
const PORT = 3000 || process.env.PORT
let users = require('./models/user')
let mongoose = require('mongoose')
const user = require('./models/user')
require('dotenv').config()

const cors = require('cors')

app.use(cors())

mongoose.connect(process.env.MONGO_URI).then(() => {
     console.log("connet to db")
}).catch((error) => {
     console.log(`conncecting error ${error}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/signup', async (req, res) => {

     let { name, mobilenumber, password, email } = req.query

     let createuser = await users.create({
          name: name,
          mobileNumber: mobilenumber,
          password: password,
          email: email
     })

     //  console.log(createuser)

     if (createuser) {
          res.send('successfully create acout').status(200)
     } else {
          res.send("account creatation error").status(404)
     }

})

app.get('/login', async (req, res) => {
     let { mobilenumber, password } = req.query

     let findedUser = await users.findOne({ $and: [{ mobileNumber: mobilenumber }, { password: password }] })

     // console.log(findedUser)

     if (findedUser) {
          res.json({ "message": "login success", "user": findedUser }).status(200)
     } else {
          res.send("not find").status(404)
     }
})

app.get('/all', async (req, res) => {

     let totalusers = await users.find()

     let totalusersLength = totalusers.length
     //console.log(totalusersLength)
     res.send(`${totalusersLength}`)
})

app.listen(PORT, () => {
     console.log(`app listen on ${PORT}`)
})