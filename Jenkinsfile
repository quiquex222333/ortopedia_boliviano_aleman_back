pipeline {
    agent any

    tools {
        nodejs 'node-lts' // Tu versión de Node configurada en Jenkins
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

        stage('Confirm Context') {
            steps {
                sh '''
                    echo "📁 Directorio actual: $(pwd)"
                    echo "📄 package.json:"
                    cat package.json || echo "❌ package.json no encontrado"
                    echo "🔍 eslint.config.mjs:"
                    cat eslint.config.mjs || echo "❌ eslint.config.mjs no encontrado"
                '''
            }
        }

        stage('Clean & Install') {
            steps {
                sh '''
                    rm -rf node_modules
                    npm ci
                '''
            }
        }

        stage('Verificar Globals') {
            steps {
                sh '''
                    echo "✅ Verificando que 'globals' esté instalado:"
                    ls node_modules || (echo "❌ globals NO instalado" && exit 1)
                    pwd
                '''
            }
        }

        stage('Lint') {
            steps {
                sh './node_modules/.bin/eslint .'
            }
        }

        stage('Test') {
            steps {
                sh './node_modules/.bin/jest'
            }
        }
    }

    post {
        failure {
            echo "❌ Algo falló en el pipeline en la rama ${env.BRANCH_NAME}"
        }
        success {
            echo "✅ Pipeline exitoso en la rama ${env.BRANCH_NAME}"
        }
    }
}
