import React from 'react'
import Customer from './Customer';
import CustomerAdd from './CustomerAdd';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

class Header extends React.Component{
    render()
    {
        return(
            <div>

        <Router>
        <div className='Menu-wrapper'>
          <ul>
            <Link to='/'><li>Home</li></Link>
            <Link to='/home'><li>home</li></Link>
            <Link to='/insert'><li>insert</li></Link>
          </ul>
        </div>
        <div className='Contents-wrapper'>
          <Switch>
            <Route exact path='/' component={Customer} />
            <Route path='/home' component={Customer} />
            <Route path='/insert' component={CustomerAdd} />
          </Switch>
        </div>
        </Router>




            </div>
        );
    }
}

export default Header;