parameters {
    string(name: 'sfOrgURL', defaultValue: '', description: 'Organization URL')
    choice(
            choices: [' ', 'TammiLaw'],
            description: 'Pick Creds',
            name: 'Credentials'
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
                        sh(script: 'printenv && node ./Scripts/NodeJS/createUsers_fetch.mjs $myToken $sfOrgURL $id')
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