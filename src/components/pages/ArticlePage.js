import React from 'react';
import './ArticlePage.css'

class ArticlePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            bookmarked: props.bookmarked,
            dateTime: props.dateTime,
            title: props.title,
            headline: props.headline,
            details: props.details,
            media: props.media,
        }
    }
    onBookmarkClick = (e) => {
        const id = this.state.id;
        const item = window.localStorage.getItem('bookmarked');
        const bookmarked = (item == null ? [] : JSON.parse(item));
        const isBookmarked = bookmarked.includes(id);
        if (isBookmarked) {
            const removed = bookmarked.filter(item => item !== id);
            window.localStorage.setItem('bookmarked', JSON.stringify(removed));
            this.setState({ bookmarked: false });
        }
        else {
            bookmarked.push(this.state.id);
            window.localStorage.setItem('bookmarked', JSON.stringify(bookmarked));
            this.setState({ bookmarked: true });
        }
    }
    render() {
        window.scrollTo(0, 0);
        const dateTime = new Date(this.state.dateTime);
        const days = ['SUN', 'MON', 'TUE', 'WEB', 'THU', 'FRI', 'SAT'];
        const dayName = days[dateTime.getDay()];
        const localeDateTime = dayName + " " + dateTime.toLocaleString();
        return (
            <div style={{ display: "flex" }}>
                <div className='ArticleBody'>
                    <img src={this.state.bookmarked ? './remove-bookmark.svg' : './add-bookmark.svg'}
                        onClick={this.onBookmarkClick}
                        alt="add-bookmark" />
                    <p>{localeDateTime}</p>
                    <h1>{this.state.title}</h1>
                    <h2 dangerouslySetInnerHTML={{ __html: this.state.headline }} />
                    <hr />
                    <div dangerouslySetInnerHTML={{ __html: this.state.details }} />
                </div>
                <div className='ArticleMedia'>
                    <div style={{ marginTop: "75%" }} dangerouslySetInnerHTML={{ __html: this.state.media }} />
                </div>
            </div>
        );
    }
}

export default ArticlePage;