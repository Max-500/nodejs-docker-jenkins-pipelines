pipeline {
    agent any
    stages {
        stage('Check Docker') {
            steps {
                sh 'docker --version'
            }
        }
        stage('Check Repository') {
            steps {
                script {
                    // Si no existe el directorio, realiza un git pull
                    echo 'Cloning...'
                    sh 'git pull https://github.com/Max-500/nodejs-docker-jenkins-pipelines.git'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    def imageId = sh(script: 'docker images -q soa-deploy:latest', returnStdout: true).trim()
                    if (imageId != "") {
                        def containerId = sh(script: 'docker ps -q -f name=soa-deploy-test', returnStdout: true).trim()
                        if (containerId != "") {
                            sh "docker stop soa-deploy-test"
                            sh "docker rm soa-deploy-test"
                            sh "docker rmi soa-deploy:latest"
                        } else {
                            sh "docker rmi soa-deploy:latest"
                        }
                    }
                    echo 'Building Docker image...'
                    sh "docker build -t soa-deploy:latest ."
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'npm install'
                sh 'npm install --production'
                sh 'npm install mocha'
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    sh 'npm test'
                }
            }
        }
    }
    post {
        success {
            script {
                def containerRunning = sh(script: 'docker ps -q -f name=soa-deploy-test', returnStdout: true).trim()
                if (containerRunning) {
                    sh "docker stop soa-deploy-test"
                    sh "docker rm soa-deploy-test"
                }
                sh "docker run -d -p 3000:3000 --name soa-deploy-test soa-deploy:latest"
            }
        }
        failure {
            echo 'Build failed. No deployment will be done.'
        }
    }
}