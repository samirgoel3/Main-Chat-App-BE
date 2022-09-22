const Config = require('../../config/env_config/config')
module.exports = {
    CREATE_USER: {
        name: "Create user",
        endpoint: "/create",
        posting_script: false,
        response: false,
        request_type: "POST",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/user/create",
        description: "This api is used only creating user only as a normal user"
    },
    LOGIN_USER: {
        name: "Login user",
        endpoint: "/login",
        posting_script: false,
        response: false,
        request_type: "POST",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/user/login",
        description: "This api is used only for login user"
    },
    CHECK_EMAIL_EXIST: {
        name: "Email Exist",
        endpoint: "/check-email",
        posting_script: false,
        response: false,
        request_type: "POST",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/user/check-email",
        description: "This api is user for email exist in DB or not"
    },
    RESET_PASSWORD: {
        name: "Reset Password",
        endpoint: "/reset-password",
        posting_script: false,
        response: false,
        request_type: "POST",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/user/reset-password",
        description: "This api is user for email exist in DB or not"
    },
    SEARCH_USER: {
        name: "Search Users",
        endpoint: "/search",
        posting_script: false,
        response: false,
        request_type: "POST",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/user/search",
        description: "This api will search user according to the applied regex"
    },
    ALL_USERS: {
        name: "All Users",
        endpoint: "/all",
        posting_script: false,
        response: false,
        request_type: "POST",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/user/all",
        description: "This api will fetch all users created in DB"
    },
    CREATE_ONE_ONE_CHAT: {
        name: "Create One to One Chat",
        endpoint: "/create-one-one-chat",
        posting_script: false,
        response: false,
        request_type: "POST",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/chat/create-one-one-chat",
        description: "This api will create chat and update if already exist"
    },
    CREATE_GROUP_CHAT: {
        name: "Create Group Chat",
        endpoint: "/create-group-chat",
        posting_script: false,
        response: false,
        request_type: "POST",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/chat/create-group-chat",
        description: "This api will create chat only , and in this case user can create different groups with same sets of users"
    },
    GET_GROUP_CHAT_BY_USER_ID: {
        name: "Create Group Chat",
        endpoint: "/chat-groups",
        posting_script: false,
        response: false,
        request_type: "GET",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/chat/chat-groups",
        description: "This api will return all groups of chat for a particulat user"
    },
    EDIT_GROUP_CHAT: {
        name: "Edit Group Chat",
        endpoint: "/edit-chat-group",
        posting_script: false,
        response: false,
        request_type: "POST",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/chat/edit-chat-group",
        description: "This api will Edit chat group but admin is capable to edit the group here"
    },
    GET_ALL_CHATS_WITH_UNREAD_MESSAGE: {
        name: "Get All chats with unread message",
        endpoint: "/getChatByUnreadMessage",
        posting_script: false,
        response: false,
        request_type: "GET",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/chat/getChatByUnreadMessage",
        description: "This api will return all chats in which a particular user has some unready messages"
    },GET_ALL_CHATS_BY_USER_ID: {
        name: "Get All chats according to user ID",
        endpoint: "/getAllChats",
        posting_script: false,
        response: false,
        request_type: "GET",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/chat/getChatByUnreadMessage",
        description: "This api will return all chat without messages weather it is group type or not"
    },
    GET_ALL_CHATS_WITH_READ_MESSAGE: {
        name: "Get All chats with read message",
        endpoint: "/getChatByreadMessage",
        posting_script: false,
        response: false,
        request_type: "GET",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/chat/getChatByreadMessage",
        description: "This api will return all chats in which all messages are set as read"
    },
    SEND_MESSAGE: {
        name: "Send Message",
        endpoint: "/send",
        posting_script: false,
        response: false,
        request_type: "POST",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/message/send",
        description: "This api will send message and add its reference id in chat collection"
    },
    MARK_MESSAGE_AS_READ: {
        name: "Mark message as read",
        endpoint: "/mark_message-read",
        posting_script: false,
        response: false,
        request_type: "POST",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/message/mark_message-read",
        description: "This api will mark a particular message as read for a particular user, in group chat it can be possible where ti has more than one readers"
    },
    GET_ALL_MESSAGE_OF_CHAT: {
        name: "Get All Messages of a particular chat",
        endpoint: "/getchat",
        posting_script: false,
        response: false,
        request_type: "GET",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/message/getchat",
        description: "This api will return all messages in a particular chat"
    },
    GET_ALL_UNREAD_MESSAGE_OF_CHAT: {
        name: "Get All Unread Messages of a particular chat",
        endpoint: "/getUnreadMessagesOfChat",
        posting_script: false,
        response: false,
        request_type: "GET",
        platform_type: "Mobile App",
        url: Config.app.base_url + "api/" + Config.app.api_version + "/message/getUnreadMessagesOfChat",
        description: "This api will return all unread messages(latest message) for a particular chat"
    }
}
