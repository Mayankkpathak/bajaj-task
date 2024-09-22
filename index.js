const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

const user = {
    full_name: 'John_Doe',
    dob: '17091999',
    email: 'john@xyz.com',
    roll_number: 'ABCD123',
}

app.post('/bfhl', (req, res) => {
    const requestData = req.body.data
    const response = {
        is_success: true,
        user_id: `${user.full_name}_${user.dob}`,
        email: user.email,
        roll_number: user.roll_number,
        numbers: [],
        alphabets: [],
        highest_alphabet: [],
    }

    requestData.forEach((item) => {
        if (typeof item === 'string' && /^[A-Za-z]$/.test(item)) {
            response.alphabets.push(item)
        } else if (!isNaN(item)) {
            response.numbers.push(item)
        }
    })

    if (response.alphabets.length > 0) {
        response.highest_alphabet = [
            response.alphabets.reduce((a, b) =>
                a.toLowerCase() > b.toLowerCase() ? a : b,
            ),
        ]
    }

    res.json(response)
})

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 })
})

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to BFHL!' })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

module.exports = app
