const express = require('express');
const path = require('path');
const app = express();

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/products', (req, res, next)=> {
  Product.findAll()
    .then( products => res.send(products))
    .catch(next);
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db');

const Product = conn.define('product', {
  name: Sequelize.STRING,
  isSpecial: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

conn.sync({ force: true })
  .then(()=> Promise.all([
    Product.create({ name: 'foo' }),
    Product.create({ name: 'bar', isSpecial: true }),
    Product.create({ name: 'bazz' }),
  ]))
