
var fs = require('fs')
const { exit } = require('process')

var wri = require('wri-sdk')


console.log(`process.env.WRI_API_KEY: ${process.env.WRI_API_KEY}`)
console.log(`process.env.WRI_ACCESS_KEY: ${process.env.WRI_ACCESS_KEY}`)

var requestId;

var uploadProfileRequest = async () => {
    if (!process.env.WRI_ACCESS_KEY || !process.env['WRI_API_KEY']){
        console.error('ERROR:key not set')
        exit()
    }
    var conn = wri.connection.init()

    let contentType = 'application/json'

    const stats = fs.statSync('lib/test.json');
    const fileSizeInBytes = stats.size;
    const file = fs.readFileSync('lib/test.json');

    let uuid = await wri.data.upload(conn, { contentType: contentType, contentLength: fileSizeInBytes }, file)

    console.log(`uuid ${uuid}`)

    let type = await wri.processing.getType('PROFILE')

    let payload = {
        fileUuid: uuid,
        fileName: 'Testing sdk',
        fileType: 'application/json',
        dataType: 'win/loss',
        processingType: type.name,
        fileMappings: {
            firstname: "firstname",
            lastname: "lastname",
            company: "company",
            win: "status"
        },
        winMapping: "sold",
        dataSource: "spreadsheet",
        productService: "product1"
    }

    let processingRequestResult = await wri.processing.request(conn, type, payload)
    console.log('processingRequestResult', processingRequestResult)

    requestId = uuid;
    // let id = "3de32980-aea5-491b-af39-3470f19f3487"

    // let type = await processing.getType('PROFILE')
    fs.appendFileSync('requests.txt', `${uuid}\n`);
}


var getResults = async (id) => {
    let processingResult = await processing.getResults(conn, type, id)
    console.log('processingResult', processingResult)
    return processingResult
}

uploadProfileRequest()
// getResults(requestId)