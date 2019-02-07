/*
* Fake Console library
*
* Replaces real console methods with fake ones and exposes all logs in the
* console.allLogs array. Complete with stack traces. Useful for remote
* debugging or creating a web IDE.
*
* Customization
*  - modify INTERFACE value in order to define a custom interface for the all
*    logs array
*
* Supports
*  - console.info
*  - console.log
*  - console.warn
*  - console.error
*  - console.assert
*/

(function () {
   var INTERFACE = "allLogs";
   var consoleInfo = [
       "info",
       "log",
       "warn",
       "error",
       "assert"
   ]

   console[INTERFACE] = [];

   function enumerateObj (obj) {
       var enumerated = [];
       for (var i in obj) {
           if (typeof obj[i] === "object") {
               // allow logging of objects
               // prevent output from becoming [object Object]
               // also pretty print the object
               obj[i] = JSON.stringify(obj[i],null,'\t');
           }
           enumerated.push(obj[i]);
       }
       return enumerated;
   }

   for (var i in consoleInfo) {
       console[consoleInfo[i]] = (function () {
           // name needs to be cached which is why
           // a closure was created
           var cachedName = consoleInfo[i];
           return function () {
               // arguments is a typeof object
               // therefore needs to be converted to array
               // in order to be joined together
               var enumeratedArgs = enumerateObj(arguments);
               var logger = Error(enumeratedArgs.join("    "));

               logger.name = cachedName;
               console[INTERFACE].push(logger.stack);
           }
       })()
   }

   // console.assert only outputs when assertion is false
   // this modifies the function to allow this functionality
   console.assert = (function () {

       // need save current console.assert
       // remember: this has already been modified
       // to only save logs in the console[INTERFACE]
       var cachedConsoleAssert = console.assert;

       return function (assertion) {
           if (!assertion) {
               // arguments is a typeof object
               // therefore needs to be converted to array
               // in order to be joined together
               var enumeratedArgs = enumerateObj(arguments);

               // hacky way to delete first argument
               // because the first argument is the assertion,
               // we don't want to output that
               enumeratedArgs.reverse();
               enumeratedArgs.pop();
               enumeratedArgs.reverse();
              
               // actually output what we want to output
               cachedConsoleAssert(enumeratedArgs.join("    "));
           }
       }
   })();
})();
