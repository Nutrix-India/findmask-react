import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import './App.css'

import axios from 'axios';
import Resizer from 'react-image-file-resizer';

class Image extends Component{
  render() {
  return ( 
      <div className="image-no-show">
        <img src={this.state.imagePreviewUrl} alt='Upload an Image'/>
      </div>
      )
    }
}

class App extends Component {
  componentDidMount(){
    document.title = "Mask Detection | Vinay Kudari"
  }

  state = {
    image: null,
    imagePreviewUrl: null,
    response: {},
    imageClass: 'noshow',
    response_header: 'Response'
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };
  
  imageSelectedHandler = event => {
    let reader = new FileReader();
    var fileInput = false
      if(event.target.files[0]) {
          fileInput = event.target.files[0]
      }
      if(fileInput) {
        Resizer.imageFileResizer(
            fileInput,
            416,
            416,
            'JPEG',
            60,
            0,
            uri => {
              reader.onloadend = () => {
                this.setState({
                    image: uri,
                    imagePreviewUrl: reader.result,
                    imageClass: 'show'
                  })
              }
              reader.readAsDataURL(uri)
            },
            'blob'
        )
      }
  };

  imageUploadHandler = (e) => {
    this.setState({
      response_header: 'Uploading Image'
    })

    e.preventDefault();
    const form_data = new FormData();
    form_data.append('image', this.state.image, this.state.name);
    let url = '/api/predict/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        console.log(
          'Upload Progress: '
           + Math.round(progressEvent.loaded/progressEvent.total * 100)
           + '%'
        )
        if (progressEvent.loaded === progressEvent.total){
          this.setState({
            response_header: 'Analyzing Image'
          })
        }
      }
    })
    .then(res => {
      this.setState({
        response: res.data,
        response_header: 'Response'
      })
    })
    .catch(err => console.log(err))
  };

  render() {
    return (
      <div className="App">
        <h4>Mask Detection</h4>
        <br/>
        <br/>
        <div className={this.state.imageClass}>
          <img src={this.state.imagePreviewUrl} alt='Upload an Image'/>
        </div>

        <form onSubmit={this.imageUploadHandler}>
          <p>
            <input 
              type="file"
              id="image" 
              onChange={this.imageSelectedHandler}
              required
            />
          </p>
          <input type="submit"/>
        </form>

        <br/>
        <h5>{this.state.response_header}</h5>
        <p>----------------------------------------------------------</p>
        <div className='response'>
          
          <pre>
            {JSON.stringify(this.state.response, null, 2)}
          </pre>
        </div>
        
      </div>
    );
  }
}

export default App;
