import React from "react"
import "./FaceRecon.css"

const FaceRecon = ({ imageUrl, box }) => {
    return (
        <div className="center na">
            <div className="absolute mt2">
                <img id="imputimage" alt="" src={imageUrl} width="500px" height="auto" />
                <div className="bounding-box"
                    style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}
                ></div>
            </div>
        </div>
    )
}

export default FaceRecon;