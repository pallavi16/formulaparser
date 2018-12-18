import React from 'react';
import { mount, shallow } from 'enzyme';
import { create } from "react-test-renderer";
import ParseFormula from './ParseFormula';
import Axios from 'axios';
import { expect } from 'chai'
import sinon from 'sinon'



describe('ParseFormula', () => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<ParseFormula />));

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(2);
  });
});


describe('mounted Component', () => {
  let wrapper;
  beforeEach(() => wrapper = mount(<ParseFormula />));
it('should fetch data', async () => {
      const props = { get: Promise.resolve('data') };
      const shallowWrapper = shallow(<ParseFormula {...props}/>);
      await props.get;
      expect(shallowWrapper.html()).toBe("<div class=\"calculater-container\"><h2>Formula</h2><div><p>Loading...</p></div><button> ADD</button></div>");
   });
});


describe("Formulas component", () => {
  it("shows a list of formulas", async () => {
    const response = {
      data: [{ formula: "a+b+2+x" }, {formula: "a/d*f+5" }]
    };
    Axios.get(response);
    const component = create(<ParseFormula />);
    const instance = component.getInstance();
    await instance.componentDidMount();
  });
});

describe('Formula component', () => {
  it('should call handleClick() when clicked', () => {
    const spy = sinon.spy(ParseFormula.prototype, 'handleClick')
    const wrapper = shallow(<ParseFormula />)
    wrapper.find('div').simulate('click')      
    expect(spy.calledOnce).to.equal(true)
  })
})