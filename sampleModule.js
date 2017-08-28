// Private variable
var total = 0;

// Constructor
function Foo() {
  // access private shared variable
  total++;
  this.baz = 'bazv'; // default value
};

// Expose a getter (could also expose a setter to make it a public variable)
Foo.prototype.getTotalObjects = function(){
  return total;
};

// class methods
Foo.prototype.fooBar = function() {
    return this.baz;
  };
  
Foo.sGetTotalObjects = function() {
  return total;  
};
  
  // export the class
module.exports = Foo;
