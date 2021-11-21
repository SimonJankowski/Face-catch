import React, { Component } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from "./components/Navigation/Navigation.js"
import Logo from "./components/Logo/logo.js"
import ImgLinkForm from "./components/ImgLinkForm/ImgLinkForm.js"
import Rank from "./components/Rank/Rank.js"
import FaceRecon from "./components/FaceRecon/FaceRecon.js"
import Particles from "react-tsparticles";
import particlesOpt from "./particlesOpt"

const app = new Clarifai.App({
  apiKey: 'a5963e0610a84643ac58e7a0740110c6'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ""
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input).then(
        function (response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
        },
        function (err) {
        }
      );
  }
  render() {
    return (
      <div className="App">
        <Particles
          id="tsparticles"
          options={particlesOpt}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImgLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecon imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}


export default App;
