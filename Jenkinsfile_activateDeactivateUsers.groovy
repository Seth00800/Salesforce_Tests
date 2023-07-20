parameters {
    string(name: 'sfOrgURL', defaultValue: '', description: 'Organization URL')
    choice(
            choices: [' ', 'TammiLaw'],
            description: 'Pick Creds',
            name: 'Credentials'
    )
    choice(
            choices: [' ', 'Activate', 'Deactivate'],
            description: 'Choose User Operation',
            name: 'UserState'
    )
    string(name: 'UserList', defaultValue: '', description: 'Add Comma Separated List Of Users LoginIds')
    booleanParam(
            defaultValue: false,
            description: 'If this box is checked, the parameters in the Jenkinsfile will be populated in Jenkins, and the job will end.  It is safe to check only this box and then execute the job.',
            name: 'Update_Parameters'
    )
}

pipeline {
    agent any

    stages {
        stage('Run Create Users Script') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${params.Credentials}", usernameVariable: 'myUserName', passwordVariable: 'myPassword')]) {
                        sh(script: '''npm install && node ./Scripts/NodeJS/middlewares/authorization/authorization.mjs $sfOrgUrl && file="./token" && export token=$(cat "$file")''')
                        env.myToken = readFile('./token')
                        env.sfOrgURL = params.sfOrgURL
                        env.id = params.Credentials
                        env.users = params.UserList
                        println(env.users)

                        def myUserState = params.UserState
                        println(myUserState)

                        if(myUserState == 'Deactivate') {
                            println("I AM IN MY DEACTIVATE")
                            sh(script: 'printenv && node ./Scripts/NodeJS/deactivateUsers_fetch.mjs $myToken $sfOrgURL $id $users')
                        }else if(myUserState == 'Activate'){
                            println("I AM IN MY ACTIVATE")
                            sh(script: 'printenv && node ./Scripts/NodeJS/activateUsers_fetch.mjs $myToken $sfOrgURL $id $users')
                        }
                    }
                }
            }
        }
    }
//    post {
//        // Clean after build
//        always {
//            cleanWs()
//        }
//    }
}