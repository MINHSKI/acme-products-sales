import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Products, { MODES } from './Products';

class App extends Component{
  constructor(){
    super();
    this.state = {
      regularProducts: [],
      specialProducts: []
    };
  }
  componentDidMount(){
    axios.get('/api/products')
      .then( result => result.data)
      .then( products => {
        const specialProducts = products.filter( product => product.isSpecial );
        const regularProducts = products.filter( product => !product.isSpecial );
        return {
          specialProducts,
          regularProducts
        };
      })
      .then( state => this.setState( state ));
  }
  render(){
    console.log(this.state);
    const { regularProducts, specialProducts } = this.state;
    return (
      <Router>
      <div>
        <h1>Acme Product Specials</h1>
        <Products products={ regularProducts } mode = { MODES.REGULAR }/>
        <Products products={ specialProducts } mode = { MODES.SPECIAL }/>
      </div>
      </Router>
    );
  }
}

export default App;
