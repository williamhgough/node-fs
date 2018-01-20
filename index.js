const express = require('express');
const app = express();
require('./services/passport');

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

require('./routes/auth')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
