import React from 'react';
import './SmallCard.css'

class SmallCard extends React.Component {
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
            <div className="SmallCard" onClick={this.onClick}>
                <div className="SmallCardTitle">
                    {this.props.webTitle}
                </div>
            </div>
        );
    }
}

export default SmallCard;