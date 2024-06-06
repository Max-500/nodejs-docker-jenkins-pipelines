pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'node-hello-world'
    }

    stages {
        stage('Build and Test') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Elimina el contenedor existente si lo hay
                    sh 'docker rm -f node-hello-world || true'
                    // Despliega el nuevo contenedor
                    sh 'docker run -d -p 3000:3000 --name node-hello-world node-hello-world'
                }
            }
        }
    }
}
