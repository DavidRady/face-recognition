import './App.css';
import React, {useState} from 'react';
import Navigation from './components/navigation/Navigation';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import Particles from 'react-tsparticles';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';

function App() {

  const [input, setInput] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [box, setBox] = useState([]);
  const [route, setRoute] = useState('Signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    username: '',
    email: '',
    entries: 0,
    joined: ''
  })

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const loadUser = (data) => {
    setUser({
      id: data.id,
      username: data.username,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }

  const locateFace = (data) => {
    const image = document.getElementById('inputImage');
    let data_faces = data.outputs[0].data.regions;
    let faces = [];
    if(data_faces){
      data_faces.forEach(face => {
      faces.push(face.region_info.bounding_box)
      })
    }

    const width = Number(image.width)
    const height = Number(image.height)

    let boxes = [];
    if(faces){
      faces.forEach(box => {
        boxes.push({
          leftCol: box.left_col * width,
          topRow: box.top_row * height,
          rightCol: width - (box.right_col * width),
          bottomRow: height - (box.bottom_row * height)
        })
      })
    }

    return boxes
  }

  const displayBox = (box) => {
    setBox(box);
  }


  const onDetect = () => {
    setImageURL(input);
    fetch('https://obscure-chamber-21233.herokuapp.com/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json', },
          body: JSON.stringify({
            input: input
          })
        })
        .then(response => response.json())
        .then(response => {
          if(response) {
            fetch('https://obscure-chamber-21233.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json', },
              body: JSON.stringify({
                id: user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              setUser({
                id: user.id,
                username: user.username,
                email: user.email,
                entries: count,
                joined: user.joined
              });
            })
          }
      displayBox(locateFace(response))
    })
    .catch(err => console.log(err));
  }

  const onRouteChange = (route) => {
    if(route==='signout'){
      setIsSignedIn(false);
      setImageURL('')
      setBox([]);
    }
    else if(route==='home'){
      setIsSignedIn(true);
    }
    setRoute(route)
  }

  return (
    <div className="App">

    {/* <Particles
      className='particles'
      id="tsparticles"
      options={{
        fpsLimit: 30,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 0,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 50,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 4,
          },
        },
        detectRetina: true,
      }}
    /> */}
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
      {
        route === 'home' ? 
          <div> 
            <Rank username={user.username} entries={user.entries} />
            <ImageLinkForm onInputChange={onInputChange} onDetect={onDetect}/>
            <FaceRecognition imageURL={imageURL} box={box} />
          </div> : 
          ( route==='register' ?
          <Register loadUser={loadUser} onRouteChange={onRouteChange}/> : <Signin loadUser={loadUser} onRouteChange={onRouteChange}/>
          )
    } 
    </div>
  );
}

export default App;
