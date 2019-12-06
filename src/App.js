/**
 * @Author: Ali
 * @Date:   2019-12-04T16:11:09+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-12-06T12:49:57+01:00
 */

import React,{Component} from 'react';
import io from 'socket.io-client'
import './App.css';


class App extends Component {
    state = {
      currentPoll:{answers:[]},
      userAnswer:''
    }
  componentDidMount(){
    let socket = io()
    socket.on('poll-1', payload =>{
      this.setState({currentPoll:payload})
    })
    socket.emit('client',{answer:"A"})
  }
  renderQuestions = () => {
    const currentQs = this.state.currentPoll.answers
    const newList = currentQs.map( question => <li key={question.id}> {question.text} </li>)
    return newList
  }
render(){
  if(this.state.currentPoll.answers.length === 0){
    return <h1> loading .... </h1>
  }
  return (
    <div className="App">
    {this.renderQuestions()}
    </div>
  )
}

}

export default App;
