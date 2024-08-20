const Recipe = (props) => {
    return(
        <div className="recipe">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    )
}

export default Recipe