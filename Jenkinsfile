pipeline {
    agent any

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
                    // Limpieza: borra el contenedor si ya existe
                    sh 'docker ps -q --filter name=mi-app-node | xargs -r docker rm -f'
                    // Despliegue
                    sh 'docker run -d -p 3000:3000 --name mi-app-node mi-app-node:latest'
                    sh 'sleep 5'
                }
            }
        }

        stage('Testing') {
            steps {
                // AQUÍ ESTÁ EL CAMBIO PRO:
                // Sin catchError. Si mocha falla, el pipeline se detiene en FAILURE.
                sh 'npm install'
                sh 'chmod -R +x ./node_modules/.bin'
                sh 'npx mocha test/seleniumTest.js --reporter mochawesome --reporter-options reportDir=Reporte_Calidad,reportFilename=mochawesome'
            }
        }
    }

    post {
        always {
            // Esto garantiza que el reporte se guarde siempre, incluso si falló el test
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