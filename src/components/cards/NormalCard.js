import React from 'react';
import './NormalCard.css'

class NormalCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            type: props.type,
            thumbnail: props.thumbnail,
            webTitle: props.webTitle,
            headline: props.headline,
        }
    }
    onClick = (e) => this.props.gotoArticle(this.props.id);
    render() {
        const isResultCard = (this.props.type === "result-card");
        const unsetWidth = (isResultCard ? ({ width: "unset", margin: "3%" }) : ({}));
        const fixedFont = (isResultCard ? ({ fontSize: "1.25rem" }) : ({}));
        return (
            <div className="NormalCard" style={unsetWidth} onClick={this.onClick}>
                <div style={{ height: "60%" }}>
                    <img src={this.props.thumbnail || "./no-images.png"} alt='thumbnail' style={{ width: '100%', height: '100%' }} />
                </div>
                <div style={{ height: "40%", backgroundColor: "darkblue" }}>
                    <div className={"NormalCardTitle"} style={fixedFont}>
                        {this.props.webTitle}
                    </div></div>
            </div>
        );
    }
}

export default NormalCard;
