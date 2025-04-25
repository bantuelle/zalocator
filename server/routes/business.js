const express = require('express');
const router = express.Router();
const businesses = [];

router.get('/', (req, res) => res.json(businesses));

router.get('/city/:city', (req, res) => {
  const filtered = businesses.filter(b => b.city.toLowerCase() === req.params.city.toLowerCase());
  res.json(filtered);
});

router.post('/', (req, res) => {
  const requiredFields = ['name', 'category', 'city'];
  const missing = requiredFields.filter(field => !req.body[field]);

  if (missing.length > 0) {
    return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
  }

  const newBusiness = {
    id: businesses.length + 1,
    ...req.body,
    createdDate: new Date().toISOString(),
    modifiedDate: new Date().toISOString(),
  };

  businesses.push(newBusiness);
  res.status(201).json(newBusiness);
});


module.exports = router;