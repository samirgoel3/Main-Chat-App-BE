let localConfig = {
    app:{
        hostname: "localhost",
        app_secret:'chat-app',
        port:process.env.PORT || 5000,
        base_url: "base url of hosted server for images path",
        api_version:'v1'
    },
    db:{
        server_one :"mongodb+srv://root:f5SyLDiVYl3vWSCn@chat-app-clusture.anejdot.mongodb.net/?retryWrites=true&w=majority"
    }

};

module.exports = localConfig;
