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
                    // Detener y eliminar cualquier contenedor que esté usando el puerto 3000
                    sh 'docker stop node-hello-world || true'
                    sh 'docker rm node-hello-world || true'
                    
                    // Desplegar el nuevo contenedor usando la sintaxis simplificada
                    docker.image(DOCKER_IMAGE).run('-d -p 3000:3000 --name node-hello-world')
                }
            }
        }
    }
}