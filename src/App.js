/**
 * @Author: Ali
 * @Date:   2019-12-04T16:11:09+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-12-06T12:06:39+01:00
 */

import React,{Component} from 'react';
import io from 'socket.io-client'
import logo from './logo.svg';
import './App.css';


class App extends Component {

  componentDidMount(){
    let socket = io()
    socket.on('poll-1', payload =>{
      console.log('listening on the client on hi emitted from the server',payload)
    })
    socket.emit('client',{answer:"A"})
  }
render(){

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

      </header>
    </div>
  )
}

}

export default App;
