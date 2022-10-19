class App extends Component{
  state = {
    showMessage: false
  }
  onButtonClickHandler = () => {
   this.setState({showMessage: true});
  };

  render(){ 
    return(<div className="App">
     {this.state.showMessage && <p>Hi</p>}
      <button onClick={this.onButtonClickHandler}>Enter</button>
    </div>);

  }
}