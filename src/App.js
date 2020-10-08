import React from "react";

import GetMembers from "./partials/GetMembers";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      loading: false,
      zip: "",
      members: [],
    };
  }
  componentDidMount() {
    fetch("https://api.propublica.org/congress/v1/116/senate/members.json", {
      method: "GET",
      headers: { "X-API-Key": "BtXLIoD8fGmMdVKX1XjUfpNpVPP7eLCXCxngMKJC" },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
        });
        console.log("here");
        console.log(this.state.items);
      });
  }

  render() {
    return (
      <div>
        <GetMembers />
      </div>
    );
  }
}

export default App;
