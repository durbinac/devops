pipeline {
    agent any 
    
    stages {
        stage('Build Image') {
            steps {
                sh 'docker build -t mi-app-node:latest .'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Ejecutando pruebas de Selenium...'
                sh 'npm test' 
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker run -d -p 3000:3000 --name app-devops mi-app-node:latest'
            }
        }
    }
}