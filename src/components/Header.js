import React from 'react';
import './Header.css'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ""
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.clearSearch) nextState.keyword = "";
        return true;
    }
    updateInputValue(e) {
        const keyword = e.target.value.trim();
        if (keyword !== this.state.keyword) {
            this.setState({ keyword: keyword }, _ => {
                //this.props.search(keyword);
            });
        }
    }
    onLogoClick = (e) => this.props.home();
    onSearchClick = (e) => this.props.search(this.state.keyword);
    onSearchEnter = (e) => {
        if (e.key === "Enter") this.props.search(this.state.keyword);
    }
    render() {
        return (
            <header className='Header'>
                <div className='LogoWrapper'>
                    <img className='Logo' src="./Logo_White.png" onClick={this.onLogoClick} alt='logo'></img>
                </div>
                <div className='Searcher'>
                    <input className='SearchBox'
                        type="text"
                        placeholder="Search.."
                        name="search"
                        value={this.state.keyword}
                        onChange={e => this.updateInputValue(e)}
                        onKeyDown={this.onSearchEnter} />
                    <img className='SearchIcon'
                        src="./search-icon@2x.png"
                        onClick={this.onSearchClick}
                        alt='search-icon'
                        style={{ height: "100%" }} />
                </div>
            </header>
        );
    }
}

export default Header;