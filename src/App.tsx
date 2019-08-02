import * as React from 'react';
import axios from 'axios';
import './App.css';

interface Shifui {
  header: string;
  footer: string;
  js: string[];
  css: string[];
}

interface State {
  shifu: Shifui;
}
interface Props {

}

export default class Shifu extends React.Component<Props, State> {
  state:State = {
    shifu: {
      header: '',
      footer: '',
      js: [],
      css: []
    }
  };

  componentDidMount() {
    axios.get('http://localhost:4000/api/').then(res => {
      const shifuData = res.data;
      this.setState({
        shifu: {
          header: shifuData.header,
          footer: shifuData.footer,
          js: shifuData.js,
          css: shifuData.css,
        }
      });
      this.state.shifu.css.forEach((el) => {
        const shifuCss = document.createElement('link');
        shifuCss.href = el;
        shifuCss.rel = 'stylesheet';
        document.head.appendChild(shifuCss);
      });
      this.state.shifu.css.forEach((el) => {
        const shifuJs = document.createElement('script');
        shifuJs.src = el;
        document.body.appendChild(shifuJs);
      });
    });
  }
  render() {
    return (
        <div>
          <div dangerouslySetInnerHTML={{ __html: this.state.shifu.header }}/>
          <div dangerouslySetInnerHTML={{ __html: this.state.shifu.footer }}/>
        </div>
    )
  }
}
