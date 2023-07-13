

export const configVars = {
    "salesforceOrgApiUrl" : process.env['sfOrgURL'],
    "clientId": process.env["myUserName"],
    "clientSecret": process.env["myPassword"],
    "grantType": "client_credentials",
    "mongoUrl": "@10.107.59.108:27017",
    "mongoUrlPrefix": "mongodb://",
    "mongoUname": process.env.MONGODB_LOCAL_USER,
    "mongoPwd": process.env.MONGODB_LOCAL_PASSWORD,
    "apiAuthKey": process.env.AUTH_KEY,
    "endPoints": {
        "getToken": "/services/oauth2/token?",
        "getAllUsers": "/services/data/v41.0/query?q=SELECT+UserName+FROM+User",
        "createNewUser": "/services/data/v52.0/sobjects/User/",
        "deactivateUser": "/services/data/v50.0/sobjects/User/",
        "profileIds": "/services/data/v52.0/query/?q=SELECT+Id+FROM+Profile",
        "profileId": "/services/data/v52.0/sobjects/Profile/"
    },
    "createUserObj": {
        "LanguageLocaleKey": "en_US",
        "EmailEncodingKey": "UTF-8",
        "LocaleSidKey": "en_US"
    }


}