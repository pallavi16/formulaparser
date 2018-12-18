/*import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import App from './App';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

describe('App component testing', function() {
  it('renders welcome message', function() {
    const wrapper = shallow(<App />); 
    const welcome = <h1 className='App-title'>Welcome to React</h1>;
    expect(wrapper.contains(welcome)).to.equal(true);
  });
});

describe('App component testing', function() {
  it('dump components renders initially',function() {
  const component = renderer.create(
    <App onChange={() => {}} label="Hi i am a dump component" />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
});*/

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div').length).toEqual(1);
  });
});


describe('App', () => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<App />));

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

});