import { useEffect, useState } from 'react'
import './App.css'

import { Header } from './components/Header'

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
  // To hold the 6 types of cards (12 total) 
  const [cards, setcards] = useState([]);

  // API calls to get the gif' image urls and storing it temporarily in gifImgList
  useEffect(() => {
    let gifImgList = [];
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

  // function handleClick() {

  // }

  return (
    <>
      <Header></Header>
      {cards.map((item, index) => (
        <img key={index} src={item.src}/>
      ))}
      {/* <button onClick={}>Reset</button> */}
    </>
  )
}

export default App
