# BrainyPlay

**BrainyPlay** is a web-based educational application designed for children aged 1–6. It offers fun, interactive activities that support early brain development in an engaging and child-friendly environment.

## Features

- Simple, responsive user interface tailored for children
- Interactive learning activities
- Confetti effect for correct answers
- Storm/warning overlay for incorrect answers
- Clean HTML, CSS, and JavaScript codebase

## Technologies Used

- HTML, CSS, JavaScript
- Docker
- HAProxy
- GitHub Codespaces
- Docker Hub

## Containerization and Deployment

This project has been containerized and deployed using Docker across two application servers and a load balancer.

### Dockerfile

A `Dockerfile` was created to build and run the application in a container. The container listens on a configurable port, with port `8080` as the default.

### Build & Test Locally

To build and test the application locally:

-docker build -t kauriane/brains:v1.0
-docker run -p 8080:8080 kauriane/brains:v1.0
-curl http://localhost:8080
-Push to Docker Hub
-docker login
-docker push kauriane/brains:v1.0
-Semantic versioning tags such as v1.0 and latest are used.
-docker pull kauriane/brains:v1.0
-docker run -d --name brains --restart unless-stopped -p 8080:8080 kauriane/brainyplay:v1.0
Each app instance should be accessible internally at:

http://localhost:8081/ *web-02

http://localhost:8080/ *web-01

Load Balancer Configuration (lb-01)
The HAProxy configuration (/etc/haproxy/haproxy.cfg) was updated as follows:
``bash``

frontend http_front
    bind *:80
    default_backend webapps

backend webapps
    balance round robin
    server web01 172.20.0.11:8080 check
    server web02 172.20.0.12:8081 check
    
To reload HAProxy after changes:

docker exec -it lb-01 sh -c 'haproxy -sf $(pidof haproxy) -f /etc/haproxy/haproxy.cfg'
End-to-End Testing

From the host machine, test using:

curl http://localhost:8082/

Multiple requests should return alternating responses from web-01 and web-02, confirming round-robin load balancing is functioning correctly.

<img width="511" height="325" alt="ANSWEREDPRAYER!" src="https://github.com/user-attachments/assets/d968c33d-adb8-4e4b-8968-25c55393299d" />

Auriane
BrainyPlay Web Application – July 2025
