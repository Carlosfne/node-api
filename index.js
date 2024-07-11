require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const Product = require('./models/Product/Product');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('API funcionando!');
});
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.log('Erro ao sincronizar o banco de dados:', err);
});

const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

module.exports = app;
