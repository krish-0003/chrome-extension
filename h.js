const https = require('https');
const fs = require('fs');

const url = 'https://images-na.ssl-images-amazon.com/images/I/41W0gZAWKrL._.jpg'; // link to file you want to download
const path = 'app/assets/my_image_name.xlsx' // where to save a file

// const request = http.get(url, function(response) {
//     if (response.statusCode === 200) {
//         var file = fs.createWriteStream(path);
//         response.pipe(file);
//     }
//     request.setTimeout(60000, function() { // if after 60s file not downlaoded, we abort a request 
//         // request.abort();
//     });
// });

// var http = require('http');
// var fs = require('fs');


  
// URL of the image
// const url = 'GFG.jpeg';
  
https.get(url,(res) => {
    // Image will be stored at this path
    console.log("df");
    const path = `F:\chrome_extension_course\code\inpage_button\img.jpeg`; 
    const filePath = fs.createWriteStream(path);
    res.pipe(filePath);
    filePath.on('finish',() => {
        filePath.close();
        console.log('Download Completed'); 
    })
})