pipeline {

    agent any

    environment {
        SERVER = "ubuntu@13.233.192.181"
    }

    options {
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy') {

            when {
                anyOf {
                    branch 'develop'
                    branch 'staging'
                    branch 'main'
                }
            }

            steps {

                script {

                    def ENV_NAME = ""
                    def APP_PATH = ""
                    def APP_NAME = ""

                    if (env.BRANCH_NAME == "develop") {

                        ENV_NAME = "development"
                        APP_PATH = "/var/www/dev-app"
                        APP_NAME = "dev-app"

                        echo "Deploying to DEV environment"

                    } else if (env.BRANCH_NAME == "staging") {

                        input message: "Approve STAGING Deployment?"

                        ENV_NAME = "staging"
                        APP_PATH = "/var/www/staging-app"
                        APP_NAME = "staging-app"

                        echo "Deploying to STAGING environment"

                    } else if (env.BRANCH_NAME == "main") {

                        input message: "Approve PRODUCTION Deployment?"

                        ENV_NAME = "production"
                        APP_PATH = "/var/www/prod-app"
                        APP_NAME = "prod-app"

                        echo "Deploying to PRODUCTION environment"
                    }

                    sh """
                    echo "Syncing files to ${APP_PATH}"

                    rsync -avz --delete ./ ${SERVER}:${APP_PATH}

                    ssh ${SERVER} '
                        cd ${APP_PATH}
                        npm install
                        pm2 startOrReload ecosystem.config.js --env ${ENV_NAME}
                        pm2 save
                    '
                    """
                }
            }
        }
    }

    post {

        success {
            echo "Deployment Successful for ${env.BRANCH_NAME}"
        }

        failure {
            echo "Deployment Failed for ${env.BRANCH_NAME}"
        }
    }
}
