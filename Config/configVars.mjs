

export const configVars = {
    "salesforceOrgApiUrl" : process.env['sfOrgURL'],
    // "salesforceOrgApiUrl" : "https://cmentor--tammisb.sandbox.my.salesforce.com",
    // "clientId": "3MVG9Bd71Ohl9lnNGeHbtkeyaCsip.De7E56hhRM8KAQSgknjhS6fRGlMceP3Vy4QBJjNG1DkLMYcVyesmm4_",
    // "clientSecret": "B5C3ED10868E403B1445EC8152E6D4DF944E38BD4AF74DA58318BB57F5F42DE9",
    // "clientId": process.env["myUserName"],
    // "clientSecret": process.env["myPassword"],
    // "grantType": "client_credentials",
    "mongoUrl": "@10.96.106.77:27017/",
    // "mongoUrl": "@localhost:32000/",
    "mongoUrlPrefix": "mongodb://",
    "accessToken": "Bearer 00DDw000005FClx!AREAQA21avU8Ru.vlwq5vGWjQp13KaJBlqFexIbnCVCzrQXn38vozMxb1fMeN5sVTqU2pceTsczFc_Sf4QjA7p4bTvR6V7Wn",
    "mongoUname": process.env.MONGODB_LOCAL_USER,
    "mongoPwd": process.env.MONGODB_LOCAL_PASSWORD,
    // "mongoUname": "adminuser",
    // "mongoPwd": "password123",
    "apiAuthKey": process.env.AUTH_KEY,
    // "apiAuthKey": "TkhOU1JYTlBia3g1",
    "endPoints": {
        "getToken": "/services/oauth2/token?",
        "getAllUsers": "/services/data/v41.0/query?q=SELECT+UserName+FROM+User",
        "createNewUser": "/services/data/v52.0/sobjects/User/",
        "deactivateUser": "/services/data/v50.0/sobjects/User/",
        "profileIds": "/services/data/v52.0/query?q=SELECT+Id+FROM+Profile",
        "profileId": "/services/data/v52.0/sobjects/Profile/"
    },
    "createUserObj": {
        "LanguageLocaleKey": "en_US",
        "EmailEncodingKey": "UTF-8",
        "LocaleSidKey": "en_US"
    }


}