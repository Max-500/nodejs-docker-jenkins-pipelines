pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-node-app'
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
                    sh 'docker run -d -p 3000:3000 --name node-hello-world my-node-app'
                    // Verifica que el archivo index.js esté presente en el contenedor
                    sh 'docker exec node-hello-world ls -la /app'
                    // Verifica los logs del contenedor
                    sh 'docker logs node-hello-world'
                }
            }
        }
    }
}
