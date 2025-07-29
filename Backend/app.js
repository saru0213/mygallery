const express = require('express');
const cors = require('cors');
require('dotenv').config();




const bodyParser = require('body-parser');


const imageRoutes = require('./routes/imageRoutes');
const errorHandler = require('./middleware/errorHandler');






const app = express();

// Allowed Origins
const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:5173',
  'http://192.168.31.24:5173',
  'https://qjv19kc1-5000.inc1.devtunnels.ms',
  'https://getyourprojectdone.onrender.com',
  'https://getyourprojectdone-frontend.onrender.com',
  'https://getyourprojectdone.up.railway.app',
  'https://getyourprojectdone-backend.up.railway.app',
];

// Middleware
app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS not allowed from this origin: ' + origin), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));




app.use('/uploads', express.static('uploads'));


app.use(bodyParser.json());
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/images', imageRoutes);
// Use the error-handling middleware
app.use(errorHandler);


// Root Route
app.get('/', (req, res) => res.send('Server is running 🚀'));



// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});














