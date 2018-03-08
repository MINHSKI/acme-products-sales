import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Products, { MODES } from './Products';

class App extends Component{
  constructor(){
    super();
    this.state = {
      regularProducts: [],
      specialProducts: [],
      selectedNormalId: -1,
      selectedSpecialId: -1
    };
    this.onMove = this.onMove.bind(this);
  }
  onMove(mode, product){
    let { regularProducts, specialProducts } = this.state;
    product.isSpecial = !product.isSpecial;
    axios.put(`/api/products/${product.id}`, {
      isSpecial: product.isSpecial
    })
    .then( result => result.data)
    .then( product => {
      if(product.isSpecial){
        specialProducts = [...specialProducts, product];
        regularProducts = regularProducts.filter( _product => _product.id !== product.id);
      }
      else {
        regularProducts = [...regularProducts, product];
        specialProducts = specialProducts.filter( _product => _product.id !== product.id);
      }
      this.setState({
        regularProducts,
        specialProducts,
        selectedSpecialId: product.isSpecial ? product.id : -1,
        selectedNormalId: product.isSpecial ? -1 : product.id,
      });
    });
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
    const { onMove } = this;
    const { regularProducts, specialProducts, selectedSpecialId, selectedNormalId } = this.state;
    return (
      <Router>
      <div style={{ fontFamily: 'sans-serif' }}>
        <h1>Acme Product Specials</h1>
        <h2>We've got { specialProducts.length } special products.</h2>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Products
              products={ regularProducts }
              mode = { MODES.REGULAR }
              selectedId = { selectedNormalId }
              onMove = {(product)=> onMove(MODES.REGULAR, product)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Products
              products={ specialProducts }
              mode = { MODES.SPECIAL }
              selectedId = { selectedSpecialId }
              onMove = {(product)=> onMove(MODES.SPECIAL, product)}
            />
          </div>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
