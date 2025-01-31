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

  // API calls to get the gif' image urls and storing it temporarily in gifImgList
  useEffect(() => {
    let gifImgList = []; // To hold the url of 6 cards
    let doubleList = []; // A temporary var to hold the set of 6 cards twice

    // Gets the original url of the gifs through the gif IDs stored in gifIdList
    async function fetchUrl(gifID) {
      const response = await fetch(`https://api.giphy.com/v1/gifs/${gifID}?api_key=FEcNku8OuTdra1gngJXzmwn8H6vNxdz7`);
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
      doubleList = [...gifImgList, ...gifImgList];
      setcards(doubleList);

    }
    // Call the getGifImg to store the urls as objects
    getGifImg();

  }, []);

  // Log the cards state when it changes
  useEffect(() => {
    console.log("Updated cards:", cards);
  }, [cards]); // This useEffect will run every time `cards` updates

  function shuffleCards() {
    // Randomize the location of each card and add key id to each card
    const shuffledCards = [...cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id : Math.random() }));

    setcards(shuffledCards);
    setturns(0);
  }

  return (
    <>
      <h1>Match the Pusheens</h1>
      <h2>Turns: {turns}</h2>
      <button onClick={shuffleCards}>Reset</button>

      <h1>Cards</h1>
      <div className="card-grid">
        {cards.map((item) => (
          <Card key={item.id} item={item}/>
        ))}
      </div>
      
    </>
  )
}

export default App
