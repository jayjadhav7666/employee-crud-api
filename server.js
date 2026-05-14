const express = require('express');
const studentRouter = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/employees', studentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 