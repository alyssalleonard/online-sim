import React, { Component } from 'react';
import './Search.css';
import axios from 'axios';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            state: '',
            city: '',
            forecast: [],
            recentSearches: []
        }
        this.getForecast = this.getForecast.bind(this);
    }

    componentDidMount() {
        axios.get('/api/places').then(res => this.setState({recentSearches: res.data}))
    }

    getForecast() {
        axios.get(`http://api.wunderground.com/api/fc679834de8f58d0/forecast10day/q/${this.state.state}/${this.state.city}.json`)
        .then(response => {
            this.setState({forecast: response.data.forecast ? response.data.forecast.simpleforecast.forecastday.splice(4, 5) : []})
            if (response.data.forecast) {
                axios.post(`/api/places`, {place: this.state.city}).then(res => this.setState({recentSearches: res.data}))                
            }
        })
    }

    updateCity(e) {
        this.setState({
            city: e.target.value
        })
    }

    updateState(e) {
        this.setState({
            state: e.target.value
        })
    }

    render() {
        const days = this.state.forecast.map(day => {
            return (
                <div className="day">
                    <span>{day.date.weekday}</span>
                    <span className="conditions">{day.conditions}</span>
                    <span>{`High ${day.high.fahrenheit}`}</span>
                    <span>{`Low ${day.low.fahrenheit}`}</span>
                    <img src={day.icon_url} alt="conditions"/>
                </div>
            )
        })

        const recentSearches = this.state.recentSearches.map(search => {
            return (
                <h2>{search.place}</h2>
            )
        })
        return(
            <div className="content">
                <form className="form">
                    <input type="text" placeholder="City" className="city-search" onChange={e => this.updateCity(e)} />
                    <select className="states" onChange={e => this.updateState(e)} >
                        <option defaultValue></option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    <button type="button" className="button" onClick={this.getForecast}>Get Weather</button>
                </form>
                <h2>{this.state.forecast.length > 0 ? '5 Day Forecast' : 'Enter City'}</h2>
                <div className="results">{this.state.forecast.length > 0 ? days : (<div className="empty"></div>)}</div>
                <h2>Recent Searches</h2>
                <div className="recent-searches">{this.state.forecast.length > 0 ? recentSearches : ""}</div>
            </div>
        )
    }
}

export default Search