const assert = require('assert');
const { Given, When, Then } = require('cucumber');

this.user='';


Given('User is dipesh',  () =>{
  this.user='dipesh';
});
When('I go to system', async  ()=> {
  this.result='welcome dipesh';
});

Then('It greets me `welcome dipesh`',  () =>{
  assert.equal(this.result,`welcome ${this.user}`);
});
