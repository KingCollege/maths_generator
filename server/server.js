const express = require('express');
const maths = require('./routes/maths');
const path = require('path');
const cors = require('cors');
const app = express();
var pretty = require('express-prettify');

app.use(express.static(path.join(__dirname, '../build')));

app.use(cors());
app.use(pretty({ query: 'pretty' }));

app.use('/maths', maths);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../build/index.html'));
});

app.listen(process.env.PORT || 8080);
