# social-media-d-une-entreprise-interne
Réseau social interne d’entreprise développé avec Spring Boot et React. Il permet aux employés de publier, commenter, liker et collaborer via une interface moderne. L’application utilise une API REST sécurisée avec authentification JWT et gestion des rôles.

🏢 Social Media Interne d’Entreprise

Réseau social interne développé avec Spring Boot (backend) et React (frontend), permettant aux employés de publier, commenter, liker et collaborer dans un environnement sécurisé.

🚀 Fonctionnalités principales

Authentification sécurisée avec JWT

Gestion des utilisateurs et des rôles (Admin / Employé)

Création, modification et suppression de posts

Commentaires et likes

Groupes internes (RH, IT, Marketing…)

Notifications en temps réel

Upload de fichiers

Interface responsive (desktop + mobile)

🏗️ Architecture du projet
SocialMedia/
├── backend/   ← Spring Boot
├── frontend/  ← React + Vite
└── README.md

Backend : Spring Boot, Spring Data JPA, Hibernate, MySQL/PostgreSQL

Frontend : React, Axios, React Router, Tailwind CSS / Material UI

💻 Installation
1️⃣ Backend
cd backend
mvn clean install
mvn spring-boot:run

Le serveur backend tournera par défaut sur http://localhost:8080.

2️⃣ Frontend
cd frontend
npm install
npm run dev

Le frontend tournera par défaut sur http://localhost:5173 (Vite).

🔐 Sécurité

Authentification via JWT

Password hashing avec BCrypt

Autorisation basée sur les rôles

🛠️ Outils et technologies

Backend : Spring Boot, Spring Security, Spring Data JPA, Hibernate

Frontend : React, Vite, Axios, Tailwind CSS / Material UI

Base de données : MySQL

Versioning : Git / GitHub

📂 .gitignore recommandé
# Node / React
frontend/node_modules/
frontend/dist/
frontend/.env

# Java / Spring Boot
backend/target/
backend/.idea/
backend/*.iml

# Logs
*.log
