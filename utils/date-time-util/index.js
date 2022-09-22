const date = require('date-and-time');

const convertMongoDbTimestampToDate = (mongoTimestamp) =>{
    let convertedDate = date.format(new Date(mongoTimestamp), 'hh:mm A ddd')
    return convertedDate;
}

module.exports = {convertMongoDbTimestampToDate}