import React from 'react';
import { mount, shallow } from 'enzyme';
import { create } from "react-test-renderer";
import ParseFormula from './ParseFormula';
import Axios from 'axios';



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
      expect(shallowWrapper.html()).toBe("<div class=\"calculater-container\"><h2>Formula</h2><div><p>Loading...</p></div><button class=\"btn submit\"> ADD</button></div>");
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
