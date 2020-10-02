import React from "react"
import ConfirmMembers from "./ConfirmMembers"
import AlgoliaPlaces from 'algolia-places-react';

/*

div className = "outer">
        <div className = "places">
         <AlgoliaPlaces
      placeholder='Write an address here'
 
      options={{
        appId: 'pl5JW99P01Q8',
        apiKey: '691a0ca8e7dc6c33ce434be84b000710',
        language: 'en',
        countries: ['us'],
        type: 'address',
        // Other options from https://community.algolia.com/places/documentation.html#options
      }}
 
      onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => 
        console.log('Fired when suggestion selected in the dropdown or hint was validated.')}
 
      onSuggestions={({ rawAnswer, query, suggestions }) => 
        console.log('Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed.')}
 
      onCursorChanged={({ rawAnswer, query, suggestion, suggestonIndex }) => 
        console.log('Fired when arrows keys are used to navigate suggestions.')}
 
      onClear={() => 
        console.log('Fired when the input is cleared.')}
 
      onLimit={({ message }) => 
        console.log('Fired when you reached your current rate limit.')}
 
      onError={({ message }) => 
        console.log('Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.')}
    />
                </div>
                </div>
*/


/*
<div>
                
                <div class="newsletter-subscribe">
        <div class="container">
            <div class="intro">
                <h2 class="text-center">Enter your zipcode to find your representatives.</h2>
                
            </div>
            <form class="form-inline" method="post">
                <div class="form-group"><input class="form-control"  name="zipcode" value={this.state.zipcode} placeholder="zipcode" onChange={this.handleChange}/></div>
                <div class="form-group"><button class="btn btn-primary" onClick = {this.getZip} type="submit">OK </button></div>
            </form>
            <div className="logo">538rater.com™</div>
        </div>
        
    </div>

                    
            
            </div>

*/


class GetMembers extends React.Component{
    constructor(){
        super()
        this.state = {
            zipcode: "",
            reps: [],
            display: [],
            isLoading: false,
            isRendered: true
        }
        this.getZip = this.getZip.bind(this)
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value})
        console.log(this.state.zipcode)
     }

    getZip(){
        this.setState({ isLoading: true });
        
        let url = "https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=" + this.state.zipcode + "&includeOffices=true&levels=country&key=AIzaSyA7yKG6JKgpgrRrQho_kBx4kxaP9sX1bD4"
        console.log(url)
        fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          reps: json,
          isLoading: false,
          isRendered: false
        },
        
        )
      })
      

      console.log(this.state.zipcode)
      console.log(this.state.reps)
      console.log(this.state.display)
      
    }

    componentDidMount(){
        const script = document.createElement("script");

    script.src = "./js/getLocation.js";
    script.async = true;
    

    document.body.appendChild(script);
    }
    render(){

        const { isLoading , isRendered} = this.state;
        if (isLoading) {
            return <p>Loading ...</p>;
        }
        if(!isRendered) {
            
            return(

                <div>
                    <ConfirmMembers reps={this.state.reps.officials}/>
                </div>

            )
        }
        return(

          
                
                

            <div className = "test">
                
            <div class="newsletter-subscribe">
    <div class="container">
        <div class="intro">
            <h2 class="text-center">Enter your address to find your representatives.</h2>
            
        </div>
        <form class="form-inline" method="post">
            <div class="form-group"><input class="form-control"  name="zipcode" value={this.state.zipcode} placeholder="address" onChange={this.handleChange}/></div>
            <div class="form-group"><button class="btn btn-primary" onClick = {this.getZip} type="submit">OK </button></div>
        </form>
        <div className="logo">538rater.com™</div>
    </div>
    
</div>

            
                
        
        </div>
            
            
        )
        
    }
}


export default GetMembers