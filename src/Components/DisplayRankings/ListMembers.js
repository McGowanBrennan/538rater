import React from "react"
import firebase from "../Firebase/firebase.js"
import "./listMembers.css"


class ListMembers extends React.Component{

    constructor(){
        super()
        this.state = {
            repsAndRating: [],
            display: []
        }
        this.setDisplay = this.setDisplay.bind(this)
    }

    setDisplay(){
        let displayElements1 = []
        var i;
        console.log(this.state.repsAndRating)
       
      
    }

    componentDidMount(){

        
        var aScript = document.createElement('script');
        aScript.type = 'text/javascript';
        aScript.src = "./display.js ";
        document.head.appendChild(aScript); 

        let oldState = this.state.repsAndRating
        let displayElements = []
        let oldDisplay = this.state.display
        
        firebase.firestore().collection("AllReps").get().then(querySnapshot => {
            querySnapshot.forEach(doc => { 
                // doc.data() is never undefined for query doc snapshots
                firebase.firestore().collection(doc.data().name).get().then(querySnapshot => {
                    let totalEconomic = 0
                    let totalEnvironmental = 0
                    let totalSocial = 0
                    let numRatings = 0
                   
    
                    querySnapshot.forEach(document => {
                        // doc.data() is never undefined for query doc snapshots
                        //console.log(document.id, " => ", document.data());
                        totalEconomic = totalEconomic + document.data().Economic
                        totalEnvironmental = totalEnvironmental + document.data().Environmental
                        totalSocial = totalSocial + document.data().Social
                        numRatings = numRatings + 1
                    });
                    //console.log(doc.data().name)
                    //console.log(totalEnvironmental)
                    let avgEconomic = totalEconomic / numRatings
                    let avgEnvironmental = totalEnvironmental / numRatings
                    let avgSocial = totalSocial / numRatings
                    let aggregate = (avgEconomic + avgEnvironmental + avgSocial) / 3
                    aggregate = Math.round(aggregate* 100) / 100
                    avgEconomic = Math.round(avgEconomic* 100) / 100
                    avgEnvironmental = Math.round(avgEnvironmental* 100) / 100
                    avgSocial = Math.round(avgSocial* 100) / 100
                    let aggRatings = [doc.data().name, avgEconomic, avgEnvironmental, avgSocial]
                    oldDisplay.push(
                        <tr>
                        <th scope="row">1</th>
                        <td>{doc.data().name}</td>
                        <td>{avgEconomic}</td>
                        <td>{avgEnvironmental}</td>
                        <td>{avgSocial}</td>
                        <td>{aggregate}</td>
                      </tr>
                    
                   )
                    oldState.push(aggRatings)
                    this.setState({
                        repsAndRating : oldState,
                        display : oldDisplay
                    })
                    
                });
            });                      
        })      
    }

    render(){
        console.log(this.state.display)
        let finalDisplay = []
        let leaderboardDiv = this.state.display
        
        
        return(
            <div className = "wrapper">
               
                
        <table class="table table-striped"  id="dtBasicExample">
        <thead className = "thead">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Economic</th>
            <th scope="col">Environmental</th>
            <th scope="col">Social</th>
            <th scope="col">Aggregate</th>
          </tr>
        </thead>
        
       <tbody>
           {leaderboardDiv}
       </tbody>
        
        
      </table>
            </div>
        )
    }
}
export default ListMembers