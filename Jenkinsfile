pipeline {
    agent any
    stages {
        stage('Check Docker') {
            steps {
                script {
                    try {
                        //sh 'sudo systemctl start docker'
                        //sh 'sudo systemctl enable docker'
                        sh 'docker --version'
                    } catch (Exception e) {
                        error "Docker is not running or not installed"
                    }
                }
            }
        }
        stage('Check Repository') {
            steps {
                script {
                    echo 'Cloning...'
                    sh 'git pull https://github.com/Max-500/nodejs-docker-jenkins-pipelines.git'
                }
            }
        }
        stage('Build and Test') {
            steps {
                script {
                    def imageId = sh(script: 'docker images -q soa-deploy:latest', returnStdout: true).trim()
                    if (imageId != "") {
                        def containerId = sh(script: 'docker ps -q -f name=soa-deploy-test', returnStdout: true).trim()
                        if (containerId != "") {
                            sh "docker stop soa-deploy-test"
                            sh "docker rm soa-deploy-test"
                            sh "docker rmi -f soa-deploy:latest"  // Forzando la eliminación de la imagen
                        } else {
                            sh "docker rmi -f soa-deploy:latest"  // Forzando la eliminación de la imagen
                        }
                    }
                    echo 'Building Docker image and running tests...'
                    sh "docker build -t soa-deploy:latest ."
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
            echo 'Build or tests failed. No deployment will be done.'
        }
    }
}