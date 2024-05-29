import React, { Component } from 'react';

class NavBar extends Component {

    render() { 
        console.log('NavBar - Rendered');
        return ( 
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    Navbar <span className="badge badge-pill badge seconday">{this.props.totalCounters}</span>
                </a>
            </nav>
         );
    }
}
 
export default NavBar;