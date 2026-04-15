pipeline {
    agent any
    tools {
        nodejs 'node20'
    }
    stages {
        stage('Descarga') {
            steps { checkout scm }
        }
        stage('Build Image') {
            steps {
                sh 'docker build -t mi-app-node:latest .'
            }
        }
        stage('Run & Test') {
            steps {
                script {
                    // LIMPIEZA DINÁMICA: Borra CUALQUIER contenedor que use el puerto 3000
                    sh "docker ps -q --filter 'publish=3000' | xargs -r docker rm -f"
                    
                    // Levantamos la app
                    sh 'docker run -d -p 3000:3000 --name mi-app-node mi-app-node:latest'
                    
                    // Esperamos a que la app respire
                    sh 'sleep 5'
                    
                    def nodeHome = tool name: 'node20', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    withEnv(["PATH+NODEJS=${nodeHome}/bin"]) {
                        sh 'npm install'
                        // Si falla el test, que no se detenga el reporte
                        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                            sh 'npm test'
                        }
                    }
                }
            }
            post {
                always {
                    // Este paso solo funcionará si instalaste el plugin HTML Publisher
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
    }
}