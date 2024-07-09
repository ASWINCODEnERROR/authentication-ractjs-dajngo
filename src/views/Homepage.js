import React from 'react'
import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <div>
      <>
  <main role="madin" style={{ marginTop: 50 }}>
    {/* Main jumbotron for a primary marketing message or call to action */}
    <div className="jumbotron">
      <div className="container">
        <h1 className="display-3">Welcome to ABC Company!</h1>
        <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          
        </p>
        <p>
          <Link className="btn btn-primary btn-lg" to="/dashboard" role="button">
            Learn more »
          </Link>
        </p>

      </div>
    </div>
   
    {/* /container */}
  </main>
  <footer className="container">
    {/* <p>© Company 2017-2018</p> */}
  </footer>
</>

    </div>
  )
}

export default Homepage
