

export const configVars = {
    "salesforceOrgApiUrl" : process.env['sfOrgURL'],
    "clientId": process.env["myUserName"],
    "clientSecret": process.env["myPassword"],
    "grantType": "client_credentials",
    "accessToken": process.env['token'],
    "mongoUname": process.env.MONGO_INITDB_ROOT_USERNAME,
    "mongoPwd": process.env.MONGO_INITDB_ROOT_PASSWORD,
    "apiAuthKey": process.env.AUTH_KEY,
    // "apiAuthKey": "TkhOU1JYTlBia3g1",
    "sfDomain":"http://localhost:30004",
    "endPoints": {
        "getToken": "/services/oauth2/token?",
        "getAllUsers": "/services/data/v41.0/query?q=SELECT+UserName+FROM+User",
        "createNewUser": "/services/data/v52.0/sobjects/User/",
        "userActivation": "/services/data/v50.0/sobjects/User/",
        "profileIds": "/services/data/v52.0/query?q=SELECT+Id+FROM+Profile",
        "profileId": "/services/data/v52.0/sobjects/Profile/"
    },
    "createUserObj": {
        "LanguageLocaleKey": "en_US",
        "EmailEncodingKey": "UTF-8",
        "LocaleSidKey": "en_US"
    },
    "userListArray": ["sethtestuser32@cmentor.com", "sethtestuser35@cmentor.com", "sethtestuser36@cmentor.com"]
}