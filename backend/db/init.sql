-- Création des tables pour NOXYON Budget

-- Table des utilisateurs
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    password_hash VARCHAR(255) NOT NULL,
    pseudo VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table des catégories de dépenses
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table des budgets par catégorie
CREATE TABLE budgets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    amount DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_amount CHECK (amount >= 0)
);

-- Table des dépenses
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    amount DECIMAL(12,2) NOT NULL,
    description TEXT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_amount CHECK (amount >= 0)
);


-- Insertion des catégories de base
INSERT INTO categories (name, description) VALUES
    ('Alimentation', 'Courses alimentaires et restaurants'),
    ('Logement', 'Loyer, charges, assurances'),
    ('Transport', 'Carburant, transports en commun, entretien véhicule'),
    ('Loisirs', 'Sorties, sports, divertissements'),
    ('Santé', 'Frais médicaux, pharmacie'),
    ('Factures', 'Électricité, eau, téléphone, internet'),
    ('Shopping', 'Vêtements, accessoires'),
    ('Éducation', 'Formations, matériel scolaire'),
    ('Épargne', 'Économies, investissements');
