CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE employes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    matricule varchar(30) UNIQUE NOT NULL,
    nom varchar(100),
    prenom varchar(100),
    email varchar(150),
    telephone varchar(50),
    direction varchar(150),
    service varchar(150),
    poste varchar(150),
    grade varchar(100),
    created_at timestamp DEFAULT now()
);
