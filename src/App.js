import React from 'react';

import LandingPage from "./Components/LandingPage/LandingPage.js"
import "./sass/homeScreen.scss"


class App extends React.Component{
  constructor(){
    super()
    this.state = {
     
    }
  }

  componentDidMount(){
    fetch("https://api.propublica.org/congress/v1/116/senate/members.json",{method: 'GET',
    headers: {'X-API-Key': 'BtXLIoD8fGmMdVKX1XjUfpNpVPP7eLCXCxngMKJC'}})
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json,
        })
        console.log('here')
        console.log(this.state.items)
      });
      

    
  }


  render(){
    return(    
        <div>   
          <LandingPage />
        </div>
    )
  }
}

export default App;