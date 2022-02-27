var axios = require('axios');
var data = JSON.stringify({});
var AWS = require('aws-sdk');


console.log(process.env.AWS_SDK_LOAD_CONFIG);

// process.exit(1);

var config = {
    method: 'post',
    url: 'https://www.irctctourism.com/tourism/pkgUser/pckgs/getFareTypeAndDetail?pckgCode=SCZBD41&classId=2&jrnyDate=19-MAR-22',
    headers: {
        'Connection': 'keep-alive',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
        'sec-ch-ua-platform': '"macOS"',
        'Origin': 'https://www.irctctourism.com',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://www.irctctourism.com/tourpackageBooking?packageCode=SCZBD41',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
    },
    data: data
};

axios(config)
    .then(function(response) {
        console.log(JSON.stringify(response.data));
        sendEmail(JSON.stringify(response.data))
        
    })
    .catch(function(error) {
        console.log(error);
    });


function sendEmail(data) {
    // Set the region 
    AWS.load
    AWS.config.update({
        region: 'us-east-2',
        apiVersion: 'latest',
        credentials: {
            accessKeyId: '',
            secretAccessKey: ''
        }
    });

    // Create sendEmail params 
    var params = {
        Destination: {
            ToAddresses: [
                'mohananagavenkat@gmail.com',
                /* more items */
            ]
        },
        Message: {
            /* required */
            Body: {
                /* required */
                Html: {
                    Charset: "UTF-8",
                    Data: data
                },
                Text: {
                    Charset: "UTF-8",
                    Data: data
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Test email'
            }
        },
        Source: 'venkat@coffeebeans.io',
        /* required */
        ReplyToAddresses: [
            'venkat@coffeebeans.io',
            /* more items */
        ],
    };
    
    var sendPromise = new AWS.SES({
        apiVersion: '2010-12-01'
    }).sendEmail(params).promise();

    sendPromise.then(
        function(data) {
            console.log(data.MessageId);
        }).catch(
        function(err) {
            console.error(err, err.stack);
        });

}

