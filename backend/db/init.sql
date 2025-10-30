CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    password_hash VARCHAR(255) NOT NULL,
    pseudo VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE budgets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    amount DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_amount CHECK (amount >= 0)
);

CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    budget_id INTEGER REFERENCES budgets(id) ON DELETE SET NULL,
    amount DECIMAL(12,2) NOT NULL,
    description TEXT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_amount CHECK (amount >= 0)
);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_budgets_timestamp
BEFORE UPDATE ON budgets
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_expenses_timestamp
BEFORE UPDATE ON expenses
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

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

CREATE OR REPLACE FUNCTION create_default_budgets()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO budgets (user_id, category_id, amount)
    SELECT NEW.id, c.id, ROUND((RANDOM() * 800 + 200)::numeric, 2)
    FROM categories c;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION create_default_budgets();

INSERT INTO users (pseudo, password_hash)
VALUES 
('martin', 'hashed_password_1'),
('alice', 'hashed_password_2'),
('bob', 'hashed_password_3');

DO $$
DECLARE
    u RECORD;
    b RECORD;
    i INTEGER;
    descriptions TEXT[] := ARRAY[
        'Courses', 'Restaurant', 'Essence', 'Abonnement Netflix', 
        'Médecin', 'Internet', 'Café', 'Sortie cinéma',
        'Électricité', 'Voiture', 'Téléphone', 'Transport en commun',
        'Achat vêtements', 'Formation', 'Investissement', 'Loisirs'
    ];
BEGIN
    FOR u IN SELECT id FROM users LOOP
        FOR i IN 1..30 LOOP
            SELECT * INTO b FROM budgets 
            WHERE user_id = u.id 
            ORDER BY RANDOM() LIMIT 1;

            INSERT INTO expenses (user_id, budget_id, amount, description, date)
            VALUES (
                u.id,
                b.id,
                ROUND((RANDOM() * 100 + 5)::numeric, 2),
                descriptions[1 + FLOOR(RANDOM() * array_length(descriptions, 1))],
                CURRENT_DATE - (FLOOR(RANDOM() * 90)) * INTERVAL '1 day'
            );
        END LOOP;
    END LOOP;
END $$;
