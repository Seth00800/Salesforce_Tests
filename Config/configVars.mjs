

export const configVars = {
    "salesforceOrgApiUrl" : process.env['sfOrgURL'],
    "clientId": process.env["myUserName"],
    "clientSecret": process.env["myPassword"],
    "grantType": "client_credentials",
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