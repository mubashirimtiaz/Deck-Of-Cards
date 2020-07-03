import React, { Component } from "react";
import "./Card.css";

export default class Card extends Component {
  constructor(props) {
    super(props);
    console.log(`in Constructor of Card`);
    const angle = Math.random() * 90 - 45;
    const xPos = Math.random() * 40 - 20;
    const yPos = Math.random() * 40 - 20;
    this._transform = `translate(${xPos}px ,${yPos}px) rotate(${angle}deg)`;
  }
  render() {
    return (
      <div className="Card">
        <img
          style={{ transform: this._transform }}
          className="Card-image"
          src={this.props.image}
          alt={this.props.name}
        />
      </div>
    );
  }
}
