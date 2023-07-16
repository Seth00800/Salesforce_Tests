
def accessToken = ""
pipeline {
    agent any

    parameters {
        string(name: 'sfOrgURL', defaultValue: '', description: 'Organization URL')
        choice(
                choices: [' ', 'TammiLaw'],
                description: 'Pick Creds',
                name: 'Credentials'
        )
    }
    stages {
        stage('get SF Token') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${params.Credentials}", usernameVariable: 'myUserName', passwordVariable: 'myPassword')]) {
                        sh(script: 'npm install')
                        def token = sh(script: '''
                                node ./Scripts/NodeJS/middlewares/authorization/authorization.mjs
                            ''', returnStdout: true).trim()

                        accessToken = token

                    }
                }
            }
        }
        stage('Run Create Users Script') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${params.Credentials}", usernameVariable: 'myUserName', passwordVariable: 'myPassword')]) {
                    sh(script: 'echo $myUserName')
                    sh(script: 'echo $myPassword')
                    sh(script: 'printenv')
                    sh(script: 'npm install')
//                    sh(script: 'node ./Scripts/NodeJS/main.mjs')
                }
            }
        }
    }
//    post {
//        // Clean after build
//        always {
////            cleanWs()
//        }
//    }
}