require('./exports.js')

var output = ocaml.compile('let a = 3')

// var json = require('../../package.json')
var header = `Generated by BUCKLESCRIPT`

var failed = false

/**
 * @return {string|bool} return string if successful otherwise return false
 * @param {*} input
 */
function test(input) {
    var output = (ocaml.compile(input))
    if (output && output.js_code) {
        var js_code = output.js_code
        if (js_code.includes(header)) {
            return js_code
        } else {
            failed = true
            return false
        }
    } else {
        failed = true
        return false
    }
}

var fs = require('fs')
var p = require('path')
var example = p.join(__dirname, 'examples')
var files = fs.readdirSync(example)

files.forEach(function (x) {

    if (x.endsWith('.ml')) {
        var path = p.join(example, x)
        var content = fs.readFileSync(path, 'utf8')
        console.log(`testing ${path}`)
        var output
        if (output = test(content)) {
            console.log("successful")
        } else {
            console.error("failed")
        }
    }

})

if(failed){
    console.error('not all tests passed')
    process.exit(2)
}

console.log(`Testing pervasives`)
test(`print_endline "Hello world"`)
console.log(`Finished`)

// console.log(ocaml.compile(`Js.Promise.resolve 3 `))
