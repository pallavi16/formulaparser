import React, { Component } from 'react';
import './ParseFormula.css';
import Axios from 'axios';



class ParseFormula extends Component {

  state = {
     data: [],
     formValues:{},
     isLoading:true,
     result: []
    };
      doArithmetic = this.doArithmetic.bind(this);  
      modifyExpression = this.modifyExpression.bind(this);
      calculateResult = this.calculateResult.bind(this);


componentDidMount() {
  console.log("Data: "+ this.state.data)

  Axios.get('http://localhost:3000/parser') // JSON File Path
      .then(res => {
        
        this.setState({
          data:res.data,
          isLoading: false
          
        });
       
})
.catch(function(error) {
  this.setState({error, isLoading: false})
});
}


 handleChange(event){
    event.preventDefault();
    let formValues= this.state.formValues;
    let name = event.target.name;
    let value = event.target.value;
    formValues[name] = value;

    this.setState({formValues: formValues});

     formValues = JSON.stringify(this.state.formValues);
    console.log("STRINGIFIED VALS: "+ formValues);

  }


handleClick(event){

console.log("inside fetch");
event.preventDefault();


var data = this.state.data;
var values= this.state.formValues;
var result = this.state.result;
var obj;

fetch('./input1.json')
.then(response => {
  alert("success");
    obj = JSON.parse(JSON.stringify(data));
    Object.keys(obj).map(
       function(object,key){
       if(key === 1){ 
      obj[object]["values"] = values;
      obj[object]["result"] = result;
      }

      }
    )

    this.writeJSON(obj);
})
.catch(err => console.error(err))


  }


writeJSON(formData){

  fetch('http://localhost:3000/parser', { //OR 'http://localhost:3000/db' -same result
    method: 'POST',
    body: JSON.stringify(formData),
    headers: new Headers({
        "Accept": 'application/json',
        "Content-type": "application/json"
        //"Content-type": "application/json; raw"
    }),
}).then(res => res.json())
    .then( res =>{
        console.log('Request succeeded with JSON response', res);

    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}



  modifyExpression(formula){

    const escapeRE = new RegExp(/[A-Za-z]/g);  
    var characters = this.state.formValues;
    var result;
    console.log("this state form values");
    console.log(characters);
    var s = formula;
   
    if(s !== undefined){
    s = s.replace(escapeRE, m => characters[m]);
    }
    console.log(s);

    if(!/[a-zA-Z]/.test(s)){
      
      result = this.calculateResult(s);
     

    return (
        <div>
          <h4>Result:{result}</h4>

        </div>
      )
  
}
}



  doArithmetic(arithmetic){
    
    console.log(arithmetic);
    var arr;
    var operator = "/*+-^";

    for(var i = 0; i < operator.length; i++){
       if(i === 0)
          {
            arr = arithmetic !== undefined ? arithmetic.split(operator[i]):0;
          }
        else 
          {
          arr = arr.toString().split(operator[i]);
          }
  }
    console.log(arr);
    
   var ar = arr.toString().split(',');
   console.log(ar);


  ar = ar.filter(function (a) {
    return !/^\d+$/.test(a);
  });

     console.log("new array: ");
        console.log(ar);

    return (

       <div style={{width: '100%'}}>
      {
        ar.map((array, idx) =>(
            <div key={idx}>
            {
            array.toString().split(',').map(item =>(
             
                <span>
                  <label htmlFor={idx}> {item}:&nbsp;&nbsp;&nbsp;&nbsp; 
                   <input type="number" name={item} id={idx} placeholder= {item} value={this.state.formValues[item] || ''}  
                   onChange={this.handleChange.bind(this)} />
                   </label>  
                  <br/>
                </span>
              
              ))
            }
            </div>
          ))
      }
      </div>
      );
      

  }

  calculateResult(expr){

    var result = this.state.result;
    var chars = expr.toString().split("");

    var n = [], op = [], index = 0, oplast = true;

    n[index] = "";

    // Parse the expression
    for (var c = 0; c < chars.length; c++) {
        if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
            op[index] = chars[c];
            index++;
            n[index] = "";
            oplast = true;
        } else {
            n[index] += chars[c];
            oplast = false;
        }
    }

    // Calculate the expression
    expr = parseFloat(n[0]);
    for (var o = 0; o < op.length; o++) {
        var num = parseFloat(n[o + 1]);
        switch (op[o]) {
            case "+":
                expr = expr + num;
                break;
            case "-":
                expr = expr - num;
                break;
            case "*":
                expr = expr * num;
                break;
            case "/":
                expr = expr / num;
                break;
            default:
                console.log("arithmetic operator type not supported");    
        }
    }
    console.log("Result is: "+ expr);

          result.push(expr);
  
    return expr;
}
  





render() {
    const { isLoading, data} = this.state;

    return (
      <React.Fragment>
      <div className="calculater-container">
        <h2>Formula</h2>
        <div>
          {!isLoading ? (
           
            data.map(post => {
              const { formula, key} = post;
              
              return (
                <div key={key} >
                  <h3>Formula: {formula}</h3>
                  <h5>Inputs:</h5>
                  {this.doArithmetic(formula)}
                   {this.modifyExpression(formula)} 

                  <hr />
                  </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      <button onClick={this.handleClick.bind(this)}> ADD
      </button>
      </div>
      </React.Fragment>
    ); 
  }
}


export default ParseFormula;
