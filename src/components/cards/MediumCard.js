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
    onClick = (e) => this.props.gotoArticle(this.props.id);
    render() {
        return (
            <div className="MediumCard" onClick={this.onClick}>
                <div style={{ height: "60%" }}>
                    <img src={this.props.thumbnail} alt='thumbnail' style={{ width: '100%', height: '100%' }} />
                </div>
                <div style={{ height: "40%", backgroundColor: "darkblue" }}>
                    <div className="MediumCardTitle">{this.props.webTitle}</div>
                    <div className="MediumCardHeadline" dangerouslySetInnerHTML={{ __html: this.props.headline }} />
                </div>
            </div>
        );
    }
}

export default MediumCard;