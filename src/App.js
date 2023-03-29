import React, { Component } from 'react'
import NavBar from './Components/NavBar'
import News from './Components/News'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

export class App extends Component {
  // key = process.env.API_KEY
  key = "85b3766ca6f54e538e78fcb9560694dc"
  render() {
    return (
      <>
        <Router>
          <NavBar />

          <Routes>
            <Route exact path='/' element={<News key='home' pageSize={9} apiKey={this.key} country='in' category='general' />}></Route>
            <Route exact path='/business' element={<News key='business' pageSize={9} apiKey={this.key} country='in' category='business' />}></Route>
            <Route exact path='/entertainment' element={<News key='entertainment' pageSize={9} apiKey={this.key} country='in' category='entertainment' />}></Route>
            <Route exact path='/general' element={<News key='general' pageSize={9} apiKey={this.key} country='in' category='general' />}></Route>
            <Route exact path='/health' element={<News key='health' pageSize={9} apiKey={this.key} country='in' category='health' />}></Route>
            <Route exact path='/science' element={<News key='science' pageSize={9} apiKey={this.key} country='in' category='science' />}></Route>
            <Route exact path='/sports' element={<News key='sports' pageSize={9} apiKey={this.key} country='in' category='sports' />}></Route>
            <Route exact path='/technology' element={<News key='technology' pageSize={9} apiKey={this.key} country='in' category='technology' />}></Route>
          </Routes>

        </Router>
      </>
    )
  }
}

export default App
