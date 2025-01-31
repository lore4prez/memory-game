import '../styles/Card.css';

function Card( {item} ) {
    return (
        <div className="card">
            <img className="front" src={item.src} alt="card front"/>
            {/*Add a back side image as well (later) */}
        </div>
    )
}

export default Card;