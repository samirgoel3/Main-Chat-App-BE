let app_config = {
    hostname: "localhost",
    app_secret: 'chat-app-be',
    port: process.env.PORT || 5000,
    base_url: "http://13.126.21.229:5000",
    api_version: 'v1'
};

let db_config = {
    server_one: "mongodb+srv://samir:1234567890@cluster0.pxhc1by.mongodb.net/?retryWrites=true&w=majority"
}


module.exports = {app_config, db_config};