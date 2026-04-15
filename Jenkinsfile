pipeline {
    agent any
    
    tools {
        nodejs 'node20' 
    }

    stages {
        stage('Descarga de Código') {
            steps {
                // Descarga el código del repo configurado en el Job
                checkout scm 
            }
        }

        stage('Build Image') {
            steps {
                // Construye la imagen de Docker
                sh 'docker build -t mi-app-node:latest .'
            }
        }

        stage('Run & Test') {
            steps {
                script {
                    // 1. Limpieza de puerto 3000 y contenedores previos
                    sh "docker ps -q --filter 'publish=3000' | xargs -r docker rm -f"
                    sh 'docker rm -f mi-app-node || true'
                    
                    // 2. Levantar la aplicación
                    sh 'docker run -d -p 3000:3000 --name mi-app-node mi-app-node:latest'
                    
                    // 3. Esperar a que la app inicie
                    sh 'sleep 5'
                    
                    // 4. Configurar Node y correr Tests
                    def nodeHome = tool name: 'node20', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    withEnv(["PATH+NODEJS=${nodeHome}/bin"]) {
                        sh 'npm install'
                        // Corregimos permisos de ejecución para Mocha
                        sh 'chmod -R +x ./node_modules/.bin'
                        
                        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                            // Ejecuta el test y genera el reporte en la carpeta específica
                            sh 'npx mocha test/*.js --reporter mochawesome --reporter-options reportDir=Reporte_Calidad,reportFilename=mochawesome'
                        }
                    }
                }
            }
            post {
                always {
                    // Publica el reporte en la interfaz de Jenkins (Requiere plugin HTML Publisher)
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