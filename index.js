const express = require('express')
const prdRouter = require('./routes/productsRouter')
const userRouter = require('./routes/userRouter')
const connectDatabase = require('./connection')
const path = require('path')
const logs = require('./middlewares/logs')
const restrictLoginUser = require('./middlewares/auth')
const cookieParser = require('cookie-parser')

const port = 8000
const app = express()

// database connection
connectDatabase('mongodb://127.0.0.1:27017/inventory-dashboard')
.then(() => console.log('database connection successful'))
.catch((err) => {
    if(err) {
        console.log('error in database connection')
    }
})

// utility middlewares
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cookieParser())
app.use(logs)

// setting templating engines.
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

// router configuration
app.use('/inv',restrictLoginUser, prdRouter)
app.use('/users', userRouter)

// server listening
app.listen(port, () => console.log(`server is listening at port ${port}` ))