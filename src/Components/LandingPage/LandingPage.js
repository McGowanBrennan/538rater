import React from "react"

import GetMembers from "../SearchReps/GetMembers.js"
import ListMembers from "../DisplayRankings/ListMembers.js"
import "./homeScreen.scss"

class LandingPage extends React.Component{
  constructor(){
    super()
    this.state = {
      items: [],
      loading: false,
      zip: "",
      members: [],
      leaveRating: false,
      viewRating: false
    }
    this.handleClick1 = this.handleClick1.bind(this)
    this.handleClick2 = this.handleClick2.bind(this)
  }

  handleClick1(){
    this.setState({
      leaveRating: true
    })
  }

  handleClick2(){
    this.setState({
      viewRating: true
    })
  }

  render(){
    
    if(this.state.leaveRating){
      return(
      <GetMembers />
      )
    }

    if(this.state.viewRating){
      return(
        <ListMembers />
        )
    }

    return( 
        <div>
          <div className = "title">
                <code>538rater.com</code>
                </div>
                <div class="container">
                <div class="row">
                    <div class="col-sm">
                    <button class="button" onClick = {this.handleClick1}>
                    <code>Leave    rating </code>
                    <div class="button__horizontal"></div>
                    <div class="button__vertical"></div>
                </button>
                    </div>
                    <div class="col-sm">
                    
                    </div>
                    <div class="col-sm">
                    <button class="button" onClick = {this.handleClick2}>
                <code>View RATINGS</code>
                    <div class="button__horizontal"></div>
                    <div class="button__vertical"></div>
                </button>
                    </div>
                </div>
          </div>

        </div>
    )
  }
}

export default LandingPage;