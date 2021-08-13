
var fs = require('fs')

var wri = require('wri-sdk')


process.env['WRI_API_KEY'] = 'WRI_ApiKey'
process.env['WRI_ACCESS_KEY'] = "WRI_AccessKey"


async function uploadProfileRequest(){
    var conn = wri.connection.init()

    console.log(conn)

    let contentType = 'application/json'

    const stats = fs.statSync('lib/test.json');
    const fileSizeInBytes = stats.size;
    const file = fs.readFileSync('lib/test.json');

    let uuid = await wri.data.upload(conn, { contentType: contentType, contentLength: fileSizeInBytes }, file)

    console.log(uuid)

}

uploadProfileRequest()