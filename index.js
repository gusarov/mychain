//console.log('My Chain Started');

var object = {
    
     // catch the system signal about
     // impossibility to respond the message
     __noSuchMethod__: function (name, args) {
       alert([name, args]);
       if (name == 'test') {
         return '.test() method is handled';
       }
       return delegate[name].apply(this, args);
     },
    
     root: function(){

     }
};
    
var delegate = {
    square: function (a) {
    return a * a;
    }
};

console.log("root isFunction = " + isFunction(object.root));
console.log("square isFunction = " + isFunction(object.square));

console.log(object.square(10));
console.log(object.test(10));

/*


var Foo = require('./sampleModule.js');

//console.log(Foo.getTotalObjects());

console.log(Foo().fooBar());
console.log(Foo().getTotalObjects());
console.log(Foo.sGetTotalObjects());


// discover nodes
//  - last successful list
//  - dnsprobes
//  - hardcoded https cdn
//  - hardcoded list of nodes (should be like 1024 of them)
//  - shared folders ftps and smbs for internal tunneling

// listen for incomming commands
// lookup new blocks

*/