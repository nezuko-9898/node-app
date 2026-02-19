pipeline {

    agent any

    environment {
        SERVER = "ubuntu@52.66.189.89"
        APP_PATH = "/var/www/node-application"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy') {

            steps {

                script {

                    def ENV_NAME = ""

                    if (env.BRANCH_NAME == "develop") {
                        ENV_NAME = "development"
                    }

                    if (env.BRANCH_NAME == "staging") {
                        input message: "Deploy STAGING?"
                        ENV_NAME = "staging"
                    }

                    if (env.BRANCH_NAME == "main") {
                        input message: "Deploy PRODUCTION?"
                        ENV_NAME = "production"
                    }

                    sh """
                    rsync -avz --delete ./ ${SERVER}:${APP_PATH}

                    ssh ${SERVER} '
                        cd ${APP_PATH}
                        npm install
                        pm2 reload ecosystem.config.js --env ${ENV_NAME} --update-env
                    '
                    """
                }
            }
        }
    }
}
