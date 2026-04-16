pipeline {
    agent any
    
    // AGREGA ESTO AQUÍ para que todo el pipeline sepa qué Node usar
    tools {
        nodejs 'node' // Asegúrate de que 'node' sea el nombre que pusiste en Global Tool Configuration
    }

    stages {
        // ... (tus otras etapas: Descarga, Build, Run)

        stage('Testing') {
            steps {
                // Ahora sí reconocerá npm y npx
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