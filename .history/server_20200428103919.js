const express = require('express')
const connectDB = require('./config/db')

const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

// Connect Database
connectDB()

// Init Middleware
// app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.json('API running'))

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/post', require('./routes/api/post'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
