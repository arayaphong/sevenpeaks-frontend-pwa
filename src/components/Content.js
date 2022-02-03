import React from 'react';
import BigCard from './cards/BigCard';
import MediumCard from './cards/MediumCard';
import NormalCard from './cards/NormalCard';
import SmallCard from './cards/SmallCard';

import './Content.css'

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topStories: props.topStories,
            sports: props.sports,
            cultures: props.cultures,
            lifestyles: props.lifestyles,
        }
    }
    gotoArticle = (id) => this.props.gotoArticle(id);
    onBookmarkClick = (e) => this.props.bookmark();
    onSortDir = (e) => this.props.sortDir(e.target.value);
    render() {
        // assume all stories must not be empty
        const topStories = this.state.topStories;
        const sports = this.state.sports;
        const cultures = this.state.cultures;
        const lifestyles = this.state.lifestyles;

        console.log(topStories[0].lastModified, topStories[0].thumbnail);
        return (
            <div>
                <div style={{ float: "right", marginRight: "40px", height: "37px" }}>
                    <img src='./view-bookmark.svg'
                        onClick={this.onBookmarkClick}
                        alt='view-bookmark' />
                    <select id="sortDir" name="sortDir" className='Dropdown' onChange={this.onSortDir}>
                        <option value="newest">&nbsp; Newest First</option>
                        <option value="oldest">&nbsp; Oldest First</option>
                    </select>
                </div>
                <div className='TopSection'>
                    <h1>Top Stories</h1>
                    <div className="TopSectionRow1">
                        <BigCard
                            id={topStories[0].id}
                            thumbnail={topStories[0].thumbnail}
                            webTitle={topStories[0].webTitle}
                            headline={topStories[0].headline}
                            gotoArticle={this.gotoArticle} />
                        <div className='TopSectionRow1Col2'>
                            <div className="TopSectionRow1Col2Upper">
                                <NormalCard
                                    id={topStories[4].id}
                                    thumbnail={topStories[4].thumbnail}
                                    webTitle={topStories[4].webTitle}
                                    gotoArticle={this.gotoArticle} />
                                <NormalCard
                                    id={topStories[5].id}
                                    thumbnail={topStories[5].thumbnail}
                                    webTitle={topStories[5].webTitle}
                                    gotoArticle={this.gotoArticle} />
                            </div>
                            <div className="TopSectionRow1Col2Lower">
                                <SmallCard
                                    id={topStories[6].id}
                                    webTitle={topStories[6].webTitle}
                                    gotoArticle={this.gotoArticle} />
                                <SmallCard
                                    id={topStories[7].id}
                                    webTitle={topStories[7].webTitle}
                                    gotoArticle={this.gotoArticle} />
                            </div>
                        </div>
                    </div>
                    <div className="TopSectionRow2">
                        <MediumCard
                            id={topStories[1].id}
                            thumbnail={topStories[1].thumbnail}
                            webTitle={topStories[1].webTitle}
                            headline={topStories[1].headline}
                            gotoArticle={this.gotoArticle} />
                        <MediumCard
                            id={topStories[2].id}
                            thumbnail={topStories[2].thumbnail}
                            webTitle={topStories[2].webTitle}
                            headline={topStories[2].headline}
                            gotoArticle={this.gotoArticle} />
                        <MediumCard
                            id={topStories[3].id}
                            thumbnail={topStories[3].thumbnail}
                            webTitle={topStories[3].webTitle}
                            headline={topStories[3].headline}
                            gotoArticle={this.gotoArticle} />
                    </div>
                </div>
                <div className='NextSection'>
                    <h1>Sports</h1>
                    <div className="NextSectionRow">
                        <NormalCard
                            id={sports[0].id}
                            thumbnail={sports[0].thumbnail}
                            webTitle={sports[0].webTitle}
                            gotoArticle={this.gotoArticle} />
                        <NormalCard
                            id={sports[1].id}
                            thumbnail={sports[1].thumbnail}
                            webTitle={sports[1].webTitle}
                            gotoArticle={this.gotoArticle} />
                        <NormalCard
                            id={sports[2].id}
                            thumbnail={sports[2].thumbnail}
                            webTitle={sports[2].webTitle}
                            gotoArticle={this.gotoArticle} />
                    </div>
                </div>
                <div className='NextSection'>
                    <h1>Cultures</h1>
                    <div className="NextSectionRow">
                        <NormalCard
                            id={cultures[0].id}
                            thumbnail={cultures[0].thumbnail}
                            webTitle={cultures[0].webTitle}
                            gotoArticle={this.gotoArticle} />
                        <NormalCard
                            id={cultures[1].id}
                            thumbnail={cultures[1].thumbnail}
                            webTitle={cultures[1].webTitle}
                            gotoArticle={this.gotoArticle} />
                        <NormalCard
                            id={cultures[2].id}
                            thumbnail={cultures[2].thumbnail}
                            webTitle={cultures[2].webTitle}
                            gotoArticle={this.gotoArticle} />
                    </div>
                </div>
                <div className='NextSection'>
                    <h1>Lifestyles</h1>
                    <div className="NextSectionRow">
                        <NormalCard
                            id={lifestyles[0].id}
                            thumbnail={lifestyles[0].thumbnail}
                            webTitle={lifestyles[0].webTitle}
                            gotoArticle={this.gotoArticle} />
                        <NormalCard
                            id={lifestyles[1].id}
                            thumbnail={lifestyles[1].thumbnail}
                            webTitle={lifestyles[1].webTitle}
                            gotoArticle={this.gotoArticle} />
                        <NormalCard
                            id={lifestyles[2].id}
                            thumbnail={lifestyles[2].thumbnail}
                            webTitle={lifestyles[2].webTitle}
                            gotoArticle={this.gotoArticle} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;