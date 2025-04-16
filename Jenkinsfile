pipeline {
    agent {
        label 'ubuntu-server' // Node Agent chạy trên server Ubuntu
    }
    environment {
        PROJECT_DIR = "/home/trongduong/projects/deployment"
        DOCKER_IMAGE = "duongtrong27/booking_fe:latest" // Thay bằng tên image Docker Hub của bạn
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker Image
                    sh '''
                    sudo docker build -t booking_fe:latest .
                    '''
                }
            }
        }
        stage('Tag Docker Image') {
            steps {
                script {
                    // Sửa tag cho image
                    sh '''
                    sudo docker tag booking_fe:latest $DOCKER_IMAGE
                    '''
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([
                        string(credentialsId: 'DOCKER_HUB_USERNAME', variable: 'DOCKER_HUB_USERNAME'),
                        string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'DOCKER_HUB_PASSWORD')
                    ]) {
                        // Đăng nhập vào Docker Hub và đẩy image
                        sh '''
                        echo "$DOCKER_HUB_PASSWORD" | sudo docker login -u "$DOCKER_HUB_USERNAME" --password-stdin
                        sudo docker push $DOCKER_IMAGE
                        '''
                    }
                }
            }
        }
        stage('Remove Current Containers') {
            steps {
                script {
                    // Xóa container-compose hiện tại
                    sh '''
                    cd $PROJECT_DIR
                    sudo docker-compose down
                    '''
                }
            }
        }
        stage('Deploy New Containers') {
            steps {
                script {
                    // Deploy lại với Docker Compose
                    sh '''
                    cd $PROJECT_DIR
                    sudo docker-compose up -d
                    '''
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}
