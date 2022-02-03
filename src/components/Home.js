import React from 'react';
import './Home.css';

import Header from './Header'
import Content from './Content';
import ArticlePage from './pages/ArticlePage';
import ResultsPage from './pages/ResultsPage';

const API_KEY = '8f4b7d9b-1ca2-4807-81e0-e1fb91474ae8';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            clearSearch: false,
            article: null,
            topStories: null,
            sports: null,
            cultures: null,
            lifestyles: null,
            searchResults: null,
            bookmarkResults: null,
        }
    }
    componentDidMount() {
        this.showLoadingThen(_ => {
            this.fetchAllCards(results => {
                this.setState({
                    loading: false,
                    topStories: results.topStories,
                    sports: results.sports,
                    cultures: results.cultures,
                    lifestyles: results.lifestyles,
                });
            });
        });
    }
    fetchSearch(keyword, pageSize, done) {
        caches.open('search-cache').then(cache => {
            const url = "https://content.guardianapis.com/search?api-key=";
            const query = "&q=" + keyword + "&show-fields=thumbnail,trailText&tag=tone/news&page-size=" + pageSize;

            const fullUrl = (url + API_KEY + query);
            fetch(fullUrl)
                .then(response => {
                    cache.put(fullUrl, response.clone());
                    return response.json();
                })
                .then(response => {
                    response = response.response;
                    const results = response.results.map(item => ({
                        id: item.id,
                        webTitle: item.webTitle,
                        headline: item.fields.trailText,
                        thumbnail: item.fields.thumbnail,
                    }));
                    if (done) done(results);
                });
        });
    }
    fetchBookmark(done) {
        const fetchCardById = (id, done) => {
            caches.open('bookmark-cache').then(cache => {
                const url = "https://content.guardianapis.com/" + id + "?api-key=";
                const query = "&show-fields=thumbnail,trailText";

                const fullUrl = (url + API_KEY + query);
                fetch(fullUrl)
                    .then(response => {
                        cache.put(fullUrl, response.clone());
                        return response.json();
                    })
                    .then(response => {
                        response = response.response;
                        const content = response.content;
                        const results = ({
                            id: content.id,
                            webTitle: content.webTitle,
                            headline: content.fields.trailText,
                            thumbnail: content.fields.thumbnail,
                        });
                        if (done) done(results);
                    });
            });
        }

        const item = window.localStorage.getItem('bookmarked');
        const bookmarked = (item == null ? [] : JSON.parse(item));
        const length = bookmarked.length;
        const results = [];
        if (length < 1) done(results);
        else bookmarked.forEach(id => {
            fetchCardById(id, item => {
                results.push(item);
                if (results.length === length) done(results);
            });
        });
    }
    fetchTopic(section, pageSize, done) {
        caches.open('topic-cache').then(cache => {
            const url = "https://content.guardianapis.com/search?api-key=";
            const query = "&section=" + section + "&show-fields=thumbnail,trailText,lastModified&tag=tone/news&page-size=" + pageSize;

            const fullUrl = (url + API_KEY + query);
            fetch(fullUrl)
                .then(response => {
                    cache.put(fullUrl, response.clone());
                    return response.json();
                })
                .then(response => {
                    response = response.response;
                    const results = response.results.map(item => ({
                        id: item.id,
                        webTitle: item.webTitle,
                        headline: item.fields.trailText,
                        thumbnail: item.fields.thumbnail,
                        lastModified: item.fields.lastModified,
                    }));
                    if (done) done(results);
                });
        });
    }
    fetchArticle(id, done) {
        caches.open('article-cache').then(cache => {
            const url = "https://content.guardianapis.com/" + id + "?api-key=";
            const query = "&show-fields=thumbnail,headline,trailText,lastModified,body,main";

            const fullUrl = (url + API_KEY + query);
            fetch(fullUrl)
                .then(response => {
                    cache.put(fullUrl, response.clone());
                    return response.json();
                })
                .then(response => {
                    response = response.response;
                    const content = response.content;
                    const results = ({
                        id: id,
                        dateTime: content.fields.lastModified,
                        title: content.webTitle,
                        headline: content.fields.trailText,
                        details: content.fields.body,
                        media: content.fields.main,
                    });
                    if (done) done(results);
                });
        });
    }
    fetchAllCards(done) {
        const allDone = (results) => {
            const topStoriesOk = (results.topStories != null);
            const sportsOk = (results.sports != null);
            const culturesOk = (results.cultures != null);
            const lifestyles = (results.lifestyles != null);
            return (topStoriesOk && sportsOk && culturesOk && lifestyles);
        }
        const results = {}
        this.fetchTopic("news", 8, topStories => {
            results.topStories = topStories;
            if (allDone(results)) return done(results);
        });

        this.fetchTopic("sport", 3, sports => {
            results.sports = sports;
            if (allDone(results)) return done(results);
        });

        this.fetchTopic("culture", 3, cultures => {
            results.cultures = cultures;
            if (allDone(results)) return done(results);
        });

        this.fetchTopic("lifeandstyle", 3, lifestyles => {
            results.lifestyles = lifestyles;
            if (allDone(results)) return done(results);
        });
    }
    showLoadingThen = (done) => {
        this.setState({
            loading: true,
            article: null,
            topStories: null,
            sports: null,
            cultures: null,
            lifestyles: null,
            searchResults: null,
            bookmarkResults: null,
        }, done);
    }
    clearSearchShowLoadingThen = (done) => {
        this.setState({
            loading: true,
            clearSearch: true,
            article: null,
            topStories: null,
            sports: null,
            cultures: null,
            lifestyles: null,
            searchResults: null,
            bookmarkResults: null,
        }, done);
    }
    gotoHome = () => this.clearSearchShowLoadingThen(_ => {
        this.fetchAllCards(results => {
            this.setState({
                loading: false,
                clearSearch: false,
                article: null,
                topStories: results.topStories,
                sports: results.sports,
                cultures: results.cultures,
                lifestyles: results.lifestyles,
                searchResults: null,
                bookmarkResults: null,
            });
        });
    });
    gotoBookmarkResults = () => this.showLoadingThen(_ => {
        this.fetchBookmark(results => {
            this.setState({
                loading: false,
                article: null,
                topStories: null,
                sports: null,
                cultures: null,
                lifestyles: null,
                searchResults: null,
                bookmarkResults: results,
            });
        });
    });
    sortDir = (dir) => {
        const sorting = (dir, arr) =>
            arr.sort(function (a, b) {
                const c = new Date(a.lastModified);
                const d = new Date(b.lastModified);
                return (dir === 'oldest' ? (c - d) : (d - c));
            });

        const sortedTopStories = sorting(dir, this.state.topStories);
        const sortedSports = sorting(dir, this.state.sports);
        const sortedCultures = sorting(dir, this.state.cultures);
        const sortedLifestyles = sorting(dir, this.state.lifestyles);
        this.setState({
            loading: false,
            article: null,
            topStories: sortedTopStories,
            sports: sortedSports,
            cultures: sortedCultures,
            lifestyles: sortedLifestyles,
            searchResults: null,
            bookmarkResults: null,
        });
    }
    gotoSearchResults = (keyword) => {
        if (keyword.length < 1) this.gotoHome();
        else this.showLoadingThen(_ => {
            this.fetchSearch(keyword, 15, results => {
                this.setState({
                    loading: false,
                    article: null,
                    topStories: null,
                    sports: null,
                    cultures: null,
                    lifestyles: null,
                    searchResults: results,
                    bookmarkResults: null,
                });
            });
        });
    }
    gotoArticle = (id) => {
        this.clearSearchShowLoadingThen(_ => {
            this.fetchArticle(id, article => {
                this.setState({
                    loading: false,
                    clearSearch: false,
                    article: article,
                    topStories: null,
                    sports: null,
                    cultures: null,
                    lifestyles: null,
                    searchResults: null,
                    bookmarkResults: null,
                });
            });
        });
    }
    render() {
        const showLoading = () => (
            <div style={{ height: "65vh" }}>
                <img className='Loading' src='./loading.gif' alt='loading' />
            </div>
        );
        const showCards = () => (
            <Content
                gotoArticle={this.gotoArticle}
                bookmark={this.gotoBookmarkResults}
                sortDir={this.sortDir}
                topStories={this.state.topStories}
                sports={this.state.sports}
                cultures={this.state.cultures}
                lifestyles={this.state.lifestyles} />);
        const showBookmarkResults = () => (
            <ResultsPage
                gotoArticle={this.gotoArticle}
                sectionName="All Bookmarks"
                results={this.state.bookmarkResults} />);
        const showSearchResults = () => (
            <ResultsPage
                gotoArticle={this.gotoArticle}
                sectionName="Search Results"
                results={this.state.searchResults} />);
        const showArticle = () => {
            const id = this.state.article.id;
            const item = window.localStorage.getItem('bookmarked');
            const bookmarked = (item == null ? [] : JSON.parse(item));
            const isBookmarked = bookmarked.includes(id);
            return (
                <ArticlePage
                    id={id}
                    bookmarked={isBookmarked}
                    dateTime={this.state.article.dateTime}
                    title={this.state.article.title}
                    headline={this.state.article.headline}
                    details={this.state.article.details}
                    media={this.state.article.media} />);
        }
        const contentArea = () => {
            if (this.state.loading) return showLoading();
            if (this.state.topStories != null) return showCards();
            if (this.state.article != null) return showArticle();
            if (this.state.bookmarkResults != null) return showBookmarkResults();
            if (this.state.searchResults != null) return showSearchResults();
        }
        const showContent = contentArea();
        return (
            <div className="Home">
                <Header
                    home={this.gotoHome}
                    search={this.gotoSearchResults}
                    clearSearch={this.state.clearSearch} />
                {showContent}
                <footer className='Footer' />
            </div>
        );
    }
}

export default Home;