import { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="container footer">
        <div className="row">
          <div className="col-md-4">one
          </div>
          <div className="col-md-4">two
          </div>
          <div className="col-md-4">three
          </div>
        </div>
      </div>
    )
  }
}

export default Footer;
