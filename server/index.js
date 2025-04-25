const express = require('express');
const cors = require('cors');
const businessRoutes = require('./routes/business');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/business', businessRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));