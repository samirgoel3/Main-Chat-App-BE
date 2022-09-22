let app_config = {
    hostname: "localhost",
    app_secret: 'chat-app-be',
    port: process.env.PORT || 5000,
    base_url: "https://main-chat-app-be-cyxz.vercel.app/",
    api_version: 'v1'
};

let db_config = {
    server_one: "mongodb+srv://root:f5SyLDiVYl3vWSCn@chat-app-clusture.anejdot.mongodb.net/?retryWrites=true&w=majority"
}


module.exports = {app_config, db_config};