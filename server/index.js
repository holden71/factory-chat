const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/auth.js");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));