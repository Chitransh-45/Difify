require('dotenv').config();
const express = require('express');
const userRouters = require('./routers/userRouter');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(cors({ origin : '*' }));
app.use(express.json());
app.use('/user', userRouters);

// endpoint or route
app.get('/', (req, res) => {
    res.send('response from express');
});

app.get('/add', (req, res) => {
    res.send('response from add');
});

// getall
// delete

app.listen(port, () => {
    console.log('server started');  
}); 