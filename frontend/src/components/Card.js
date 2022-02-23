import React from "react";
import "./Card.css";

export default function Card(props) {
    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Welcome to Counter.js</h5>
            </div>
            <div className="card-text">This page has been viewed</div>
            <div className="card-counter-box">{props.counter} times</div>

            <div className="card-image">
                {!props.content ? null :
                    <iframe
                        width="300"
                        height="200"
                        src={props.content}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded Media"
                        scrolling="no"
                    />
                }
            </div>
        </div>
    );
}