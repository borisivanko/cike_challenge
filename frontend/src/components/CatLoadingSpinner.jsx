import './CatLoadingSpinner.css'

function CatLoadingSpinner() {
    return (
        <div className="loading-cat">
            <div className="body"/>
            <div className="head">
                <div className="face"/>
            </div>
            <div className="foot">
                <div className="tummy-end"/>
                <div className="bottom"/>
                <div className="legs left"/>
                <div className="legs right"/>
            </div>
            <div className="hands left"/>
            <div className="hands right"/>
        </div>
    )
}

export default CatLoadingSpinner