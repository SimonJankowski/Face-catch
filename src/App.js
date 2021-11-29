import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation.js"
import SignIn from "./components/SignIn/SignIn.js"
import Register from "./components/Register/Register.js"
import Logo from "./components/Logo/logo.js"
import ImgLinkForm from "./components/ImgLinkForm/ImgLinkForm.js"
import Rank from "./components/Rank/Rank.js"
import FaceRecon from "./components/FaceRecon/FaceRecon.js"
import Particles from "react-tsparticles";
import particlesOpt from "./particlesOpt"


const initialState = {
  input: '',
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  }

}
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    })
  }

  // componentDidMount() {
  //   fetch("http://localhost:3000")
  //     .then(response => response.json())
  //     .then(console.log)
  //     .catch(err => (console.log(err)))
  // }

  calcFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("imputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({ box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }
  consoling = () => {
    console.log("huj")
  }
  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://nameless-ravine-84327.herokuapp.com', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://nameless-ravine-84327.herokuapp.com', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calcFaceLocation(response))
      })
      .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState)
    } else if (route === "home") {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }


  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles
          id="tsparticles"
          options={particlesOpt}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === "home"
          ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImgLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecon box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === "signin"
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}


export default App;
