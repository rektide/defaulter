var defaulter= require("../defaulter")

var o = {}
defaulter(function(){
	console.log("run")
	return 1;
}, o, 'int')

console.log(o.int) // expect: run \ 1
o.int= undefined
console.log(o.int) // expect: run \ 1
console.log(o.int) // expect: 1
