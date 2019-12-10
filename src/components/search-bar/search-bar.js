import React from "react";
import { SearchOutput } from "../search-output/search-output";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class SearchBar extends React.Component {
  notify = () => toast("TOAST");
  constructor() {
    super();
    this.state = {
      nobelWinners: [],
      nobelWinnerName: "",
      nobelWinnerSurname: "",
      searchWinners: [],
      loaderVisible: false
    };
    this.getNobelWinner();
    this.searchNobelWinner = this.searchNobelWinner.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  getNobelWinner() {
    return fetch(`http://api.nobelprize.org/v1/laureate.json`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          nobelWinners: responseJson["laureates"]
        });
        console.log(this.state.nobelWinners);
      });
  }
  searchNobelWinner(event) {
    event.preventDefault();
    const Winnerz = this.state.nobelWinners;
    const srchResult = [];
    console.log(Winnerz);
    for (var key of Winnerz) {
      if (key["firstname"] === this.state.nobelWinnerName) {
        if (this.state.nobelWinnerSurname.length > 0) {
          if (key["surname"] === this.state.nobelWinnerSurname) {
            srchResult.push(key);
          }
        } else {
          srchResult.push(key);
        }
      }
    }
    this.setState({ searchWinners: srchResult });
    console.log(srchResult.length);
    if (srchResult.length === 0) {
      console.log(srchResult.length);
      toast.error(
        "No winners exist with this name. Make sure your search is CaseSensitive"
      );
    }
    console.log(srchResult);
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    const headStyle = {
      marginTop: "2%"
    };
    const searchResult = this.state.searchWinners;
    return (
      <div className="container">
        <div className="columns is-mobile">
          <div className="column">
            <h1
              style={headStyle}
              className="is-size-3 has-text-dark has-text-centered"
            >
              Find Nobel Winners
            </h1>
          </div>
        </div>
        <div className="columns is-mobile is-multiline is-vcentered is-centered">
          <div className="column is-two-thirds">
            <label className="label">Winner's First Name *</label>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="nobelWinnerName"
                  placeholder="Enter First Name"
                  value={this.state.nobelWinnerName}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <p className="is-size-7 has-text-black">Mandatory*</p>
          </div>
          <div className="column is-two-thirds">
            <label className="label">Winner's Lastname</label>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="nobelWinnerSurname"
                  placeholder="Enter Last Name"
                  value={this.state.nobelWinnerSurname}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <p className="is-size-7 has-text-primary">Optional</p>
          </div>
          <div className="column is-offset-half is-two-thirds">
            <a onClick={this.searchNobelWinner} className="button has-text-danger">
              SEARCH
            </a>
            <ToastContainer />
          </div>
          <div className="column is-full">
            {searchResult.length > 0 ? (
              <SearchOutput nobelOutput={searchResult} />
            ) : (
              undefined
            )}
          </div>
        </div>
      </div>
    );
  }
}
