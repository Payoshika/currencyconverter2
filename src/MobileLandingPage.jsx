import React from "react";
import { Link } from "react-router-dom";

class MobilelandingPage extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="container-fluid w-100">
        <div className="row">
          <Link to={`/mobileonetoonepage/`} className="model-display col-12 d-flex flex-column justify-content-center align-items-center mb-2">
            <h4>One to One Conversion</h4>
            <img src={"./img/onetooneimg.png"} className="img-fluid border rounded" alt=""/>
          </Link>
          <Link to={`/mobilelistconversionpage/`} className="model-display col-12 d-flex flex-column justify-content-center align-items-center mb-2">
            <h4>List mode</h4>
            <img src={"./img/listimg.png"} className="img-fluid border rounded" alt=""/>
          </Link>
        </div>
      </div>
     )
  }
}

export default MobilelandingPage
