pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/quiquex222333/ortopedia_boliviano_aleman_back.git'
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
                sh 'npm test' // o 'npx jest'
            }
        }

        stage('Build') {
            steps {
                sh 'tar -czf backend.tar.gz .'
            }
        }

        stage('Deploy') {
            steps {
                // Ejemplo con PM2
                sh '''
                    scp backend.tar.gz user@host:/deploy/backend/
                    ssh user@host '
                        cd /deploy/backend &&
                        tar -xzf backend.tar.gz &&
                        pm2 restart app.js
                    '
                '''
            }
        }
    }
}
