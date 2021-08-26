
var fs = require('fs')
const { exit } = require('process')

var wri = require('wri-sdk')


console.log(`process.env.WRI_API_KEY: ${process.env.WRI_API_KEY}`)
console.log(`process.env.WRI_ACCESS_KEY: ${process.env.WRI_ACCESS_KEY}`)


var getResults = async (id) => {
    let processingResult = await processing.getResults(conn, type, id)
    console.log('processingResult', processingResult)
    return processingResult
}


getResults(requestId)