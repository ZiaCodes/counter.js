import React from "react";
import "./Card.css";

export default function Card(props) {
    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">{props.title}</h5>
            </div>
            <div className="card-text">{props.body}</div>
            <div className="card-counter-box">{props.counter} times</div>

            <div className="card-image">
                <img height={props.image.h} width={props.image.w} src={props.image.l} alt="Logo" />
            </div>
        </div>
    );
}