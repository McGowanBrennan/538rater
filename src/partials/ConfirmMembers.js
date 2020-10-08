import React from "react";
import "../styles/confirmStyle.css";

class ConfirmMembers extends React.Component {
  constructor() {
    super();
    this.state = {
      representatives: [
        { name: "head", party: "", isActive: false, index: 0, pic: "" },
      ],

      displayElements: [],
    };
    this.inputOnClick = this.inputOnClick.bind(this);
  }

  inputOnClick(e) {
    let index = e.target.value;
    const newList = this.state.displayElements;
    delete newList[index - 1];
    this.setState({
      displayElements: newList,
    });
  }

  componentDidMount() {
    console.log(this.props.reps.officials);
    var i;
    let newState = this.state.representatives;
    for (i = 2; i < this.props.reps.length; i++) {
      console.log(this.props.reps[i].photoUrl);
      let mem = {
        name: this.props.reps[i].name,
        party: this.props.reps[i].party,
        isActive: false,
        index: i,
        pic: this.props.reps[i].photoUrl,
      };
      newState.push(mem);
    }
    console.log(newState);
    this.setState({
      // prevState?
      representatives: newState,
    });

    let displayElements1 = [];

    for (i = 1; i < this.state.representatives.length; i++) {
      displayElements1.push(
        <div class="box">
          <input id={i} type="checkbox" />
          <span class="check"></span>
          <label for={i}>
            {this.state.representatives[i].name +
              ", " +
              this.state.representatives[i].party.slice(0, 1)}
          </label>
        </div>
      );
    }

    this.setState({
      displayElements: displayElements1,
    });
  }

  render() {
    return (
      <div className="confirmText">
        Confirm your representatives
        {this.state.displayElements}
        <div class="x">
          <button class="btn btn" backgroundColor="#00EA90" type="submit">
            Confirm{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default ConfirmMembers;
