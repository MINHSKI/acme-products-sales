import React, { Component } from 'react';

class Products extends Component{
  constructor(){
    super();
    this.state = {
      id: '-1'
    };
    this.onChange = this.onChange.bind(this);
    this.makeSpecial = this.makeSpecial.bind(this);
  }
  makeSpecial(ev){
    ev.preventDefault();
  }
  onChange(ev){
    this.setState({ id: ev.target.value });
  }
  render(){
    const { id } = this.state;
    const { products, mode } = this.props;
    const { onChange, makeSpecial } = this;
    return (
      <form onSubmit={ makeSpecial }>
        <h2>{ mode } Products</h2>
        <select value={id} onChange = { onChange }>
        <option value='-1'>-- choose --</option>
        {
          products.map( product => {
            return (
              <option key={ product.id } value={ product.id }>
                { product.name }
              </option>
            );
          })
          
        }
        </select>
        <button disabled={ id*1 === -1}>Make Special</button>
      </form>
    );
  }
} 

const MODES = {
  REGULAR : 'Regular',
  SPECIAL : 'Special'
};

export default Products;

export { MODES };
