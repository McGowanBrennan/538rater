import React from "react"
import firebase from "../Firebase/firebase"
//import "./sass/ratingStyle.scss";
import StarRatings from 'react-star-ratings';

class Ratings extends React.Component{
    constructor(){
        super()
        this.state = {
            reps: [
                { name: "head", party: "", isActive: false, index: 0, pic:"" },
            ],
            currentRep : [],
            rating: 0,
            rating2: 0,
            rating3: 0
        }
        this.createDBEntry = this.createDBEntry.bind(this)
        this.changeRating = this.changeRating.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }


    changeRating( newRating, name ) {
        this.setState({
          [name]: newRating
        });
    
      }

    createDBEntry(){
        let newState = []
        this.state.reps.map((person, key) => {
            console.log(person)
        newState.push(person.name)
        const usersRef = firebase.firestore().collection(person.name).doc("Setup")
        //console.log(usersRef)
        usersRef.get()
          .then((docSnapshot) => {
              if (docSnapshot.exists) {
              usersRef.onSnapshot((doc) => {
                  console.log("exists")
              });
              } else {
               console.log("doesnt exist")
               
               firebase.firestore().collection(person.name).doc("Setup").set({
                  Economic: 0,
                  Environmental: 0,
                  Social: 0
                  })
          
              }
            
        
        })
    })

    this.setState({
        currentRep: newState
    })
    }

    

    handleClick(){
        
            firebase.firestore().collection(this.state.currentRep[0]).add({
                Economic: this.state.rating,
                Environmental: this.state.rating2,
                Social: this.state.rating3,
                })
                console.log(this.state.currentRep)
                let newRep = this.state.currentRep
                if(newRep.length !== 0){
                    newRep.shift()
                    this.setState({
                        currentRep : newRep,
                        rating: 0,
                        rating2: 0,
                        rating3: 0
                    })
                    console.log(this.state.currentRep)
            }
        
    }

    componentDidMount(){
        //console.log(this.props.reps)
        this.setState({
            reps: this.props.reps
        },
        this.createDBEntry
        )
            
        
        
    
          
    };


    render(){
        let curr = this.state.currentRep[0]
        console.log(this.state.currentRep.length)
        if(this.state.currentRep.length === 0){
            console.log("this.state.currentRep.length")
            return(
                <div>thanks for rating!</div>
            )
        }
        else{
        return(
            <div>
                <div className = "Rating-Container"> How would you rate <code>{curr}</code>?</div>
                <div className = "stars1">
                    On economic policy?
                <StarRatings
          rating={this.state.rating}
          starRatedColor="yellow"
          changeRating={this.changeRating}
          numberOfStars={10}
          starDimension="40px"
          name='rating'
        />
                </div>

                <div className = "stars2">
                    On environmental policy?
                <StarRatings
          rating={this.state.rating2}
          starRatedColor="yellow"
          changeRating={this.changeRating}
          starDimension="40px"
          numberOfStars={10}
          name='rating2'
        />
                </div>

                <div className = "stars3">
                    On social policy?
                <StarRatings
          rating={this.state.rating3}
          starRatedColor="yellow"
          changeRating={this.changeRating}
          numberOfStars={10}
          starDimension="40px"
          name='rating3'
        />
                </div>
                
                <button onClick={this.handleClick}>Submit</button>
                </div>



           
        )
    }
}

}

export default Ratings