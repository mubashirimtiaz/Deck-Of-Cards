import React, { Component } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";
const BaseUrl = `https://deckofcardsapi.com/api/deck`;

export default class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: null,
      drawn: [],
      isRemaining: true,
    };
    console.log("In Contructor");
  }

  async componentDidMount() {
    console.log("In ComponentDicMount");

    try {
      const deck = await axios.get(`${BaseUrl}/new/shuffle/`);
      if (!deck.data.success) {
        throw new Error("Request Failed!");
      }
      this.setState({
        deck: deck.data,
      });
    } catch (err) {
      alert(err);
    }
  }
  getCard = async () => {
    let id = this.state.deck.deck_id;
    let cardApi = `${BaseUrl}/${id}/draw/`;
    try {
      const cardRes = await axios.get(cardApi);
      if (!cardRes.data.success) {
        this.setState({
          isRemaining: false,
        });
        throw new Error("No Card Remaining");
      }
      let card = cardRes.data.cards[0];
      // console.log(cardRes.data.remaining);
      // console.log(card);
      this.setState((currState) => ({
        drawn: [
          ...currState.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} ${card.suit}`,
          },
        ],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log("In render");

    // console.log(this.state.drawn.length);
    const cards = this.state.drawn.map((c) => (
      <Card key={c.id} name={c.name} image={c.image} />
    ));
    return (
      <div className="Deck">
        {!this.state.isRemaining ? (
          <div>
            <h1 className="Deck-title">
              Get Dealer{" "}
              <span role="img" aria-label="img">
                😏😏
              </span>
            </h1>
            <br />
            <br />
            <h1 className="Deck-sub-title">No Card is Remaining </h1>
          </div>
        ) : (
          <div>
            <h1 className="Deck-title">
              Get Dealer{" "}
              <span role="img" aria-label="img">
                😎😎
              </span>
            </h1>

            <button className="Deck-button" onClick={this.getCard}>
              Get a new card!
            </button>
            <div className="Deck-cardarea"></div>
            {cards}
          </div>
        )}
      </div>
    );
  }
}
