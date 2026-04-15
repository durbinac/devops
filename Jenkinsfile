pipeline {
    agent any
    
    // Aquí definimos la herramienta globalmente
    tools {
        nodejs 'node20' 
    }

    stages {
        stage('Descarga') {
            steps {
                checkout scm
            }
        }
        stage('Build Image') {
            steps {
                sh 'docker build -t mi-app-node:latest .'
            }
        }
        stage('Run & Test') {
            steps {
                script {
                    // Borramos contenedor previo si existe
                    sh 'docker rm -f mi-app-node || true'
                    
                    // Levantamos la app
                    sh 'docker run -d -p 3000:3000 --name mi-app-node mi-app-node:latest'
                    
                    // FORZAMOS EL PATH DE NPM:
                    // Esto busca la carpeta donde Jenkins instaló Node 20
                    def nodeHome = tool name: 'node20', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    
                    withEnv(["PATH+NODEJS=${nodeHome}/bin"]) {
                        sh 'npm install'
                        sh 'npm test'
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
                        reportName: 'Reporte de Calidad'
                    ])
                }
            }
        }
    }
}