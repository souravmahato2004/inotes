const connectToMongo=require('./db');
const express = require('express');
connectToMongo();
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

// available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

// app.get('/login', (req, res) => {
//   res.send('Hello bro I am sourav!');
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});