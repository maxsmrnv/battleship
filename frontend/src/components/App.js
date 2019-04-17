import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';

import '../styles/App.scss';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <form>
          <input placeholder='Write your name...'/>
          <button>next</button>
        </form>
      </Wrapper>
    );
  }
}

export default hot(App);
