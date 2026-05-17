const express = require('express');
const employeeRouter = require('./routes/employeeRoutes');

const app = express();

app.use(express.json());

app.use('/employees', employeeRouter);

app.get('/', (req, res) => {
    res.send('Employee API Running');
});

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;

