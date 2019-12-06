/**
 * @Author: Ali
 * @Date:   2019-12-04T16:11:09+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-12-06T13:33:48+01:00
 */

import React,{Component} from 'react';
import io from 'socket.io-client'
import './App.css';

let socket = io()
class App extends Component {
    state = {
      currentPoll:{answers:[]},
      userAnswer:''
    }
  componentDidMount(){

    socket.on('poll-1', payload =>{
      this.setState({currentPoll:payload})
    })


  }
  renderQuestions = () => {
    const currentQs = this.state.currentPoll.answers
    const newList = currentQs.map( question => (
      <div
        className="single"
        key={question.id}
        onClick={()=>this.setState({userAnswer:question.id})}
        >
        {question.text}
      </div>
    )
    )
    return newList
  }
render(){
socket.emit('client',{userAnswer:this.state.userAnswer})
  if(this.state.currentPoll.answers.length === 0){
    return <h1> loading .... </h1>
  }
  return (
    <div className="App">
        <div className="questions">
            {this.renderQuestions()}
        </div>
        {this.state.userAnswer}
    </div>
  )
}

}

export default App;
