import '../styles/Card.css';

function Card( {item} ) {
    return (
        <div className="card">
            <img className="front" src={item.src} alt="card front"/>
            <img className="back" src="../../public/rand-pusheen.png" alt="card back"/>
        </div>
    )
}

export default Card;