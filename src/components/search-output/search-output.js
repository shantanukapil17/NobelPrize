import React from "react";
import "../search-bar/search-bar";
export class SearchOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props);
  }

  render() {
    const winners = this.props.nobelOutput;
    console.log(winners);
    return (
      <div className="columns is-vcentered is-multiline has-text-centered is-mobile is-centered">
        {winners.length > 0 ? (
          this.props.nobelOutput.map((output, index) => {
            return (
              <div className="column is-half mtop">
                <div className="card has-background-white">
                  <div className="card-content columns is-multiline ">
                    <div className="column is-one-third">Name:</div>
                    <div className="column is-two-thirds has-text-weight-bold">
                      {output.firstname + " " + output.surname}
                    </div>
                    <div className="column is-one-third ">Date of Birth:</div>
                    <div className="column is-two-thirds has-text-weight-bold">
                      {output.born}
                    </div>
                    <div className="column is-one-third">Year & Field:</div>
                    <div className="column is-two-thirds has-text-weight-bold">
                      {output.prizes.map((okj, i) => {
                        return <p>{okj.year + "-" + okj.category}</p>;
                      })}
                    </div>
                    <div className="column is-one-third">Country:</div>
                    <div className="column is-two-thirds has-text-weight-bold has-text-weight-bold">
                      {output.bornCountry}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="column is-two-thirds">
            <p className="is-size-5 has-text-danger">
              Noble Prize winners with this name does not exist. Please Search in CaseSensitive
            </p>
          </div>
        )}
      </div>
    );
  }
}
