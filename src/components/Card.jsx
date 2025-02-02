import '../styles/Card.css';

function Card( {item, handleChoice, flipped, disabled} ) {
    const handleClick = () => {
        if (!disabled)
            handleChoice(item);
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={item.src} alt="card front"/>
                <img
                    className="back"
                    src="../../rand-pusheen.png"
                    alt="card back"
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}

export default Card;