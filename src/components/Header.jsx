import { useState } from 'react'

// Show the score in terms of how fast the player clears the game (time based score)
function Scoreboard() {
    const [time, settime] = useState(0);
    const [bestTime, setbestTime] = useState(0);

    function handleBestTime() {
        if (time < bestTime) setbestTime(time);
    }

    return (
        <div>
            <h2>Time: {time}</h2>
            <h2>Best Time: {bestTime}</h2>
        </div>
    )
}

// Include the title of the game and score
function Header() {
    return (
        <div>
            <h1>Memory Card Game</h1>
            <Scoreboard></Scoreboard>
        </div>
    )
}

export {Header};