import React from 'react';
import NormalCard from '../cards/NormalCard';

import './ResultsPage.css'

class ResultsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionName: props.sectionName,
            results: props.results,
        }
    }
    gotoArticle = (id) => this.props.gotoArticle(id);
    render() {
        window.scrollTo(0, 0);
        const length = this.state.results.length;
        const cards = this.state.results.map((result, i) => (
            <NormalCard key={"search-result-" + i}
                id={result.id}
                type="result-card"
                thumbnail={result.thumbnail}
                webTitle={result.webTitle}
                gotoArticle={this.gotoArticle} />
        ));
        const expandHeight = (length < 1 ? ({ height: "63vh" }) : ({}))
        return (
            <div className='ResultSection' style={expandHeight}>
                <h1>{this.state.sectionName}</h1>
                <div className="ResultSectionRow">
                    {cards}
                </div>
            </div>
        );
    }
}

export default ResultsPage;