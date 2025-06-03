pipeline {
    agent any

    tools {
        nodejs 'node-lts' // Ajusta al nombre configurado en Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verificar entorno') {
            steps {
                sh '''
                    echo "📁 Directorio actual: $(pwd)"
                    node -v
                    npm -v
                    echo "NODE_ENV=$NODE_ENV"
                '''
            }
        }

        stage('Instalación de dependencias') {
            steps {
                sh '''
                    rm -rf node_modules
                    npm ci --include=dev
                '''
            }
        }

        stage('Verificar dependencias') {
            steps {
                sh '''
                    echo "✅ Verificando dependencias locales:"
                    test -f node_modules/globals/package.json || (echo "❌ globals no instalado" && exit 1)
                    test -f node_modules/eslint/package.json || (echo "❌ eslint no instalado" && exit 1)
                    test -f node_modules/jest/package.json || (echo "❌ jest no instalado" && exit 1)
                '''
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
        always {
            junit allowEmptyResults: true, testResults: 'reports/junit/jest-report.xml'
        }
        failure {
            echo "❌ Falló el pipeline en la rama ${env.BRANCH_NAME}"
        }
        success {
            echo "✅ Pipeline exitoso en la rama ${env.BRANCH_NAME}"
        }
    }
}
