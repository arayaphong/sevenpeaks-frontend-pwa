import React from 'react';
import './BigCard.css'

class BigCard extends React.Component {
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

            <div className="BigCard" onClick={this.onClick}>
                <div style={{ height: "75%" }}>
                    <img src={this.props.thumbnail} alt='thumbnail' style={{ width: '100%', height: '100%' }} />
                </div>
                <div style={{ height: "25%", backgroundColor: "darkblue" }}>
                    <div className="BigCardTitle">{this.props.webTitle}</div>
                    <div className="BigCardHeadline" dangerouslySetInnerHTML={{ __html: this.props.headline }} />
                </div>
            </div>
        );
    }
}

export default BigCard;