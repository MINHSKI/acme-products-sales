import React, { Component } from 'react';

class Products extends Component{
  constructor(){
    super();
    this.state = {
      id: '-1'
    };
    this.onChange = this.onChange.bind(this);
    this.onMove = this.onMove.bind(this);
  }
  onMove(ev){
    ev.preventDefault();
    const product = this.props.products.find(product=> product.id === this.state.id*1);
    this.props.onMove(product);
  }
  componentWillReceiveProps(nextProps){
    this.setState({ id: nextProps.selectedId });
  }
  onChange(ev){
    this.setState({ id: ev.target.value });
  }
  render(){
    const { id } = this.state;
    const { products, mode } = this.props;
    const { onChange, onMove } = this;
    return (
      <form onSubmit={ onMove }>
        <h2>{ mode.text } Products</h2>
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
        <button
          disabled={ id*1 === -1}
        >
            { mode.moveText }
        </button>
      </form>
    );
  }
} 

const MODES = {
  REGULAR : {
    text: 'Regular',
    moveText: 'Make Special'
  },
  SPECIAL : {
    text: 'Special',
    moveText: 'Make Regular'
  }
};

export default Products;

export { MODES };
