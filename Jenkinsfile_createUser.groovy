
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
        stage('Run Create Users Script') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${params.Credentials}", usernameVariable: 'myUserName', passwordVariable: 'myPassword')]) {
                    sh(script: '''file="./token" && export token=$(cat "$file") && printenv''')
                    sh(script: 'printenv')
                    sh(script: 'npm install')
                    sh(script: 'node ./Scripts/NodeJS/main.mjs')
                }
            }
        }
    }
    post {
        // Clean after build
        always {
            cleanWs()
        }
    }
}