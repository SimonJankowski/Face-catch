import React from "react"

const FaceRecon = ({ imageUrl }) => {
    return (
        <div className="center na">
            <div className="absolute mt2">
                <img alt="image" src={imageUrl} width="500px" height="auto" />
            </div>
        </div>
    )
}

export default FaceRecon;