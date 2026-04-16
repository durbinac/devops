pipeline {
    agent any
    
    tools {
        // Cambia 'node' por 'node20' como sugiere el error
        nodejs 'node20' 
    }

    stages {
        stage('Descarga de Código') {
            steps {
                checkout scm
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t mi-app-node:latest .'
            }
        }

        stage('Run & Deploy') {
            steps {
                script {
                    sh 'docker ps -q --filter name=mi-app-node | xargs -r docker rm -f'
                    sh 'docker run -d -p 3000:3000 --name mi-app-node mi-app-node:latest'
                    sh 'sleep 5'
                }
            }
        }

        stage('Testing') {
            steps {
                sh 'npm install'
                sh 'chmod -R +x ./node_modules/.bin'
                sh 'npx mocha test/seleniumTest.js --reporter mochawesome --reporter-options reportDir=Reporte_Calidad,reportFilename=mochawesome'
            }
        }
    }
    
    post {
        always {
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'Reporte_Calidad',
                reportFiles: 'mochawesome.html',
                reportName: 'Reporte de Calidad Selenium'
            ])
        }
    }
}