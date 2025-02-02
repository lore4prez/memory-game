import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'
// import { Header } from './components/Header'

// List of giphy gif IDs to get the image urls through api calls
const gifIdList = 
  [
    { "id" : "auvPdJqCpMA4E"},
    { "id" : "3PDkm2oPbIukzc00vv"},
    { "id" : "BBkF0eR41FsoU"},
    { "id" : "13vSD7ajIJwgb6"},
    { "id" : "IOjBHQRLHOjC0"},
    { "id" : "sJaZBVqhPnQk0"},
  ];

function App() {
  const [cards, setcards] = useState([]); // To hold the 6 types of cards (12 total)
  const [turns, setturns] = useState(0); // Scoreboard scoring

  const [choiceOne, setchoiceOne] = useState(null) // To hold the first card that the user clicks
  const [choiceTwo, setchoiceTwo] = useState(null) // To hold the second card that the user clicks

  const [disabled, setdisabled] = useState(false) // To stop the user from clicking other cards while two cards are being compared


  // API calls to get the gif' image urls and storing it temporarily in gifImgList
  useEffect(() => {
    let gifImgList = []; // To hold the url of 6 cards
    let doubleList = []; // A temporary var to hold the set of 6 cards twice

    // Gets the original url of the gifs through the gif IDs stored in gifIdList
    async function fetchUrl(gifID) {
      const response = await fetch(`https://api.giphy.com/v1/gifs/${gifID}?api_key=q2ij4V3ZvWXIItzN5JQE5toZ8SbEbHAP`);
      const textData = await response.json();
      return textData.data.images.original.url;
    }

    const len = gifIdList.length;

    // Put the gif urls as objects with a format { "src" : url } into gifImgList
    const getGifImg = async () => {
      for (let i = 0; i < len; i++) {
        let url = await fetchUrl(gifIdList[i].id)
        gifImgList.push({"src" : url});
      }
      /* 
      After all the urls are fetched, copy the contents of gifImgList twice to 
      have a set of 6 cards (two of the same kind) 
      */
      doubleList = [...gifImgList, ...gifImgList].map( (card) => ({ ...card, id : Math.random(), matched : false}));
      setcards(doubleList);

    }
    // Call the getGifImg to store the urls as objects
    getGifImg();

  }, []);

  // useEffect( () => {
  //   console.log("updated cards:", JSON.stringify(cards, null, 2));
  // }, [cards])

  // When user clicks new game, shuffle cards' location and reset the choices
  function shuffleCards() {
    // Randomize the location of each card and add key id to each card
    const shuffledCards = [...cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id : Math.random() }));

    setcards(shuffledCards);
    setchoiceOne(null);
    setchoiceTwo(null);
    setturns(0);
  }

  // Handle a choice (choice one or choice two)
  const handleChoice = (card) => {
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card);
    // console.log(card.src);
  }

  // Reset the state variables once two cards have been chosen
  const resetTurns = () => {
    setchoiceOne(null);
    setchoiceTwo(null);
    setturns((currTurn) => (currTurn + 1));
    // Allow other cards to be clicked again after the two cards have been compared
    setdisabled(false);
  }

  // Compare the choice one and choice two to see if the cards match through their src property
  useEffect( () => {
    // Check if they are not null (because useEffect is called when it first mounts and when dependency changes)
    if (choiceOne && choiceTwo) {
      // Disable other cards while the two chosen cards are being compared
      setdisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        // console.log("the cards match!");
        setcards(currCards => {
          return currCards.map((card) => {
            if (card.src === choiceOne.src) 
              return { ...card, matched: true};
            else 
              return card;
          })
        })
      }

      // Before the choices are reset, give the player enough time to see the cards (0.8 sec)
      setTimeout(() => resetTurns(), 800);
    }
  }, [choiceOne, choiceTwo])

  // console.log(cards);
  // console.log("updated cards:", JSON.stringify(cards, null, 2))

  return (
    <>
      <h1>Match the Pusheens</h1>
      <h2>Turns: {turns}</h2>
      <button onClick={shuffleCards}>New Game</button>

      <h1>Cards</h1>
      <div className="card-grid">
        {cards.map((item) => (
          <Card 
            key={item.id} 
            item={item} 
            handleChoice={handleChoice}
            flipped={item === choiceOne || item === choiceTwo || item.matched}
            disabled={disabled}
          />
        ))}
      </div>
      
    </>
  )
}

export default App
