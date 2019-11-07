import React from 'react';
import Banner from './banner/banner';
import Info from './info/info';
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';
import BoxLuck from './boxLuck/boxLuck';

class App extends React.Component {
 
 render() {
  return (
   <div className="App">
	<Banner />
    <BoxLuck />
	<Info/>
   </div>
  )
 }
}

export default App;