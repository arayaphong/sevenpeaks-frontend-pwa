import React from 'react';
import './MediumCard.css'

class MediumCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            thumbnail: props.thumbnail,
            webTitle: props.webTitle,
            headline: props.headline,
        }
    }
    onClick = (e) => this.props.gotoArticle(this.state.id);
    render() {
        return (
            <div className="MediumCard" onClick={this.onClick}>
                <div style={{ height: "60%" }}>
                    <img src={this.state.thumbnail} alt='thumbnail' style={{ width: '100%', height: '100%' }} />
                </div>
                <div style={{ height: "40%", backgroundColor: "darkblue" }}>
                    <div className="MediumCardTitle">{this.state.webTitle}</div>
                    <div className="MediumCardHeadline" dangerouslySetInnerHTML={{ __html: this.state.headline }} />
                </div>
            </div>
        );
    }
}

export default MediumCard;