import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

// const cardImages = [
//   { src: "/img/91764895_p0_master1200.jpg", matched: false, revealed: false },
//   { src: "/img/91764895_p1_master1200.jpg", matched: false, revealed: false },
//   { src: "/img/94101307_p0_master1200.jpg", matched: false, revealed: false },
//   { src: "/img/94425331_p0_master1200.jpg", matched: false, revealed: false },
//   { src: "/img/101224291_p0_master1200.jpg", matched: false, revealed: false },
//   { src: "/img/112297418_p0_master1200.jpg", matched: false, revealed: false },
// ];
const cardImages = [
  { src: "/img/helmet-1.png", matched: false, revealed: false },
  { src: "/img/potion-1.png", matched: false, revealed: false },
  { src: "/img/ring-1.png", matched: false, revealed: false },
  { src: "/img/scroll-1.png", matched: false, revealed: false },
  { src: "/img/shield-1.png", matched: false, revealed: false },
  { src: "/img/sword-1.png", matched: false, revealed: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  // need states to store user choices
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [disabled, setDisabled] = useState(false);

  const [toggle, setToggle] = useState(false);

  // called in a new game
  // shuffle cards
  const shuffleCards = () => {
    const shuffledDeck = [...cardImages, ...cardImages]
      // suffle cards
      .sort(() => Math.random() - 0.5)
      // creates a new object where each card also has an id
      .map((card) => ({ ...card, id: Math.random() }));

    // update the state
    setCards(shuffledDeck);
    setTurns(0);
    setChoiceTwo(null);
    setChoiceOne(null);
    setToggle(false)
  };

  // handle choice
  const handleChoice = (card) => {
    if (choiceOne === null) {
      setChoiceOne(card);
    } else {
      setChoiceTwo(card);
    }
  };

  // compare cards, useEffect fires everytime choiceTwo is updated
  useEffect(() => {
    if (choiceTwo && choiceOne.id != choiceTwo.id) {
      // disables card while doing comparison
      setDisabled(true);

      // if match, change flag to matched
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return { ...card };
            }
          });
        });
      }
      // delay the reset
      setTimeout(() => resetTurn(), 1000);
    }
  }, [choiceTwo]);
  console.log(cards);

  // reset choices
  const resetTurn = () => {
    setChoiceTwo(null);
    setChoiceOne(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);

  };

  // automatically start a new game
  useEffect(() => {
    shuffleCards();
  }, []);

  // reveal all cards or hide all cards
  useEffect(() => {
    if (toggle) {
      setCards((prevCards) => {
        return prevCards.map((card) => {
          return { ...card, revealed: true };
        });
      });
    } else {
      setCards((prevCards) => {
        return prevCards.map((card) => {
          return { ...card, revealed: false };
        });
      });
    }
  }, [toggle]);


  const handleToggle = () => {
    setToggle(!toggle)
    setChoiceTwo(null);
    setChoiceOne(null);
  }



  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns: {turns}</p>
      <button onClick={handleToggle}>Reveal/Hide</button>
      <div className="card-grid">
        {cards.map((card) => (
          // pass down a prop

          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne ||
              card === choiceTwo ||
              card.matched ||
              card.revealed
            } // this card will be rendered as flipped if it is currently been selected
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
