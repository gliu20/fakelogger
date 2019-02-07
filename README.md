# fakelogger
Fake Console library

Replaces real console methods with fake ones and exposes all logs in the
console.allLogs array. Complete with stack traces. Useful for remote
debugging or creating a web IDE.

## Customization
 * modify INTERFACE value in order to define a custom interface for the all
   logs array

## Supports
 * console.info
 * console.log
 * console.warn
 * console.error
 * console.assert
