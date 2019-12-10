/**
 * @Author: Ali
 * @Date:   2019-12-04T16:11:09+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-12-09T00:38:31+01:00
 */

import React,{Component} from 'react';
import io from 'socket.io-client'

import Item from './components/Item'
import Audience from './components/Audience'
import './App.css';

let socket = io({transports: ['polling']})
class App extends Component {
    constructor(){
      super()
      this.state = {
        currentPoll:{answers:[]},
        member:{},
        userName:'',
        userAnswer:'',
        results:null,
        audience:[]
      }

      socket.on('poll-2', payload => {
        this.setState({currentPoll:payload})
      })
    }

  renderQuestions = () => {
    const currentQs = this.state.currentPoll.answers
    const newList = currentQs.map( question =>
      <Item
        key={question.id}
        id={question.id}
        handleClick={this.handleClick}
        text={question.text} />)
        return newList
  }
  handleClick = (id) => {
    this.setState(state => ({
      userAnswer:id
    }))
  }
  handleChange = e => this.setState({userName:e.target.value})
render(){
  const timeStamp = new Date().toLocaleTimeString()
  if(this.state.currentPoll.answers.length === 0){
    return <h1> loading .... {timeStamp}</h1>
  }
   else {
    const clientPayload = {
      name:this.state.userName,
      id:socket.id,
      userAnswer:this.state.userAnswer,
      timeStamp:timeStamp
    }
    socket.emit('join',clientPayload)
  }
  return (
    <div className="App">
        <div className="questions">
            {this.renderQuestions()}
        </div>
        <div className="audience">
          <Audience audience={this.state.audience}/>
        </div>
        <input type="text" value={this.state.userName} onChange={this.handleChange} required />
    </div>
  )
}

}

export default App;
