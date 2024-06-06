pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'node-hello-world'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }
        stage('Docker Test') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).inside {
                        // Este comando debería ejecutarse correctamente
                        sh 'echo "Hello, Docker!"'
                        
                        // Verificación básica de Node.js
                        sh 'node -v'
                        
                        // Verificación básica de NPM
                        sh 'npm -v'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Ejecuta el contenedor en segundo plano y expone el puerto 3000
                    sh 'docker run -d -p 3000:3000 --name node-hello-world node-hello-world'
                }
            }
        }
    }
    post {
        always {
            script {
                // Limpia contenedores y recursos después de la ejecución
                sh 'docker rm -f node-hello-world || true'
                sh 'docker rmi -f node-hello-world || true'
            }
        }
    }
}
