pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        PATH = "/usr/local/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Tools') {
            steps {
                sh 'which node || echo "❌ Node.js no encontrado"'
                sh 'which npm || echo "❌ npm no encontrado"'
                sh 'which pm2 || echo "❌ pm2 no encontrado"'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npx eslint .'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
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
            echo "✅ Pipeline ejecutado correctamente en ${env.BRANCH_NAME}"
        }
    }
}
