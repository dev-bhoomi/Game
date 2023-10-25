import './App.css';
import { useEffect, useState } from 'react'

import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/Game/img/helmet-1.png", matched: false },
  { "src": "/Game/img/potion-1.png", matched: false },
  { "src": "/Game/img/ring-1.png", matched: false },
  { "src": "/Game/img/scroll-1.png", matched: false },
  { "src": "/Game/img/shield-1.png", matched: false },
  { "src": "/Game/img/sword-1.png", matched: false }
];

const App = () => {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

// shuffle cards

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
 setChoiceOne(null)
 setChoiceTwo(null)
    setCards(shuffled)
    setTurns(0)
  }
  //Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            
            
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(()=>resetTurn(),1000)
      }
    }
  }, [choiceOne, choiceTwo])

  //reset choices & incrase turn

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(()=>{
shuffleCards()
  },[])

  return (
    <>
      <div className="App">
        <h1>Magic Match</h1>
        <button onClick={shuffleCards}>New Game</button>


        <div className="card-grid">
          {cards.map(card => (
            <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            />
          ))}
        </div>
        <p>Turns:{turns}</p>
      </div>
    </>

  );
}


export default App;
