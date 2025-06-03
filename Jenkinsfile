pipeline {
    agent any

    tools {
        nodejs 'node-lts'
    }

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    branch 'develop'
                    branch 'staging'
                }
            }
            steps {
                script {
                    def envFolder = (env.BRANCH_NAME == 'develop') ? 'dev' : 'staging'
                    def appName = "backend-${envFolder}"

                    sh """
                        DEST_DIR=/var/www/backend-${envFolder}
                        rm -rf \$DEST_DIR
                        mkdir -p \$DEST_DIR
                        cp -r . \$DEST_DIR

                        pm2 delete ${appName} || true
                        pm2 start \$DEST_DIR/app.js --name ${appName}
                    """
                }
            }
        }
    }

    post {
        failure {
            echo "❌ Falló el pipeline en la rama ${env.BRANCH_NAME}"
        }
        success {
            echo "✅ Pipeline exitoso en la rama ${env.BRANCH_NAME}"
        }
    }
}
