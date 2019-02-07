# fakelogger
Fake Console library

Replaces real console methods with fake ones and exposes all logs in the
console.allLogs array. Complete with stack traces. Useful for remote
debugging or creating a web IDE.

## Getting Started
Include `<script src="fakelogger.js"></script>` on your page.
Or use the minified version `<script src="fakelogger.min.js"></script>`.

## Usage
Use `console.*` methods as you would normally. Use only [supported methods](#supports).

## Customization
 * modify INTERFACE value in order to define a custom interface for the all
   logs array

## <a name="supports"></a>Supports
 * console.info
 * console.log
 * console.warn
 * console.error
 * console.assert
