import axios from 'axios';
import React from 'react';

class App extends React.Component {

  state = { details: [], }
  componentDidMount() {
    let data;
    axios.get('http://localhost:8000')
    .then(res => {
        data = res.data;
        this.setState({
          details: data
        });
      })
    .catch(err => console.log('Error ${err} occured when GET was called'));
  }

  render() { 
    return (
      <div>
        <header> Data generated from Django </header>
        {this.state.details.map((output, id) => 
          (<div key={id}> 
            <div>
              <h2> {output.news} </h2>
              <h3> {output.detail} </h3>
            </div>
          </div>)
        )} 
      </div>
    )
  }
}

export default App;
