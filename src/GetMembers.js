import React from "react"
import ConfirmMembers from "./ConfirmMembers"




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
        this.setState({[e.target.id]:e.target.value})
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
        var aScript = document.createElement('script');
        aScript.type = 'text/javascript';
        aScript.src = "./getLocation.js ";
    
        document.head.appendChild(aScript); 
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
        <div class="form-group">
      
            <input id="zipcode" value={this.state.zipcode} placeholder="address" onChange={this.handleChange} />
            </div>              

            
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