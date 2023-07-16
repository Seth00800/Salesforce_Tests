
pipeline {
    agent any
//    environment {
//
//        accessToken = token
//    }

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
                        sh(script: '''
                                node ./Scripts/NodeJS/middlewares/authorization/authorization.mjs
                            ''', returnStdout: true).trim()
                    }
                }
            }
        }
        stage("Create Access Token Environment Variable") {
            steps {
                script {
                    sh(script: '''
                        file="./token"
                        token=$(cat "$file")
                    ''', returnStdOut: true).trim()
                }
            }
        }
        stage('Run Create Users Script') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${params.Credentials}", usernameVariable: 'myUserName', passwordVariable: 'myPassword')]) {
                    sh(script: 'echo $myUserName')
                    sh(script: 'echo $myPassword')
                    sh(script: 'printenv')
//                    sh(script: 'npm install')
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