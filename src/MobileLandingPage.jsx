import React from "react";
import { Link } from "react-router-dom";

class MobilelandingPage extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div>
              <Link to={`/mobileonetoonepage/`} className="model-display d-flex flex-column justify-content-center align-items-center">
                <h4>One to One Conversion</h4>
                <img src={"./img/onetooneimg.png"} className="img-fluid border rounded" alt=""/>
              </Link>
              <Link to={`/mobilelistconversionpage/`} className="model-display d-flex flex-column justify-content-center align-items-center">
                <h4>List mode</h4>
                <img src={"./img/listimg.png"} className="img-fluid border rounded" alt=""/>
              </Link>
            </div>
          </div>
        </div>
      </div>
     )
  }
}

export default MobilelandingPage
