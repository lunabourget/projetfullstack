import axios from 'axios';

// Base API configurable via variables d'environnement (CI ou local)
const API_BASE = process.env.API_BASE_URL || process.env.REACT_APP_API_URL || 'http://51.254.205.63:5000';
const API_URL = `${API_BASE}/api`;

// Générer un pseudo unique pour éviter les conflits
const testUser = {
  pseudo: `testuser_${Date.now()}`,
  password: 'SecurePass123!',
};

let authToken: string;

describe('Authentication Tests', () => {
  describe('POST /auth/register - Register new user', () => {
    it('should successfully register a new user', async () => {
      const response = await axios.post(`${API_URL}/auth/register`, {
        pseudo: testUser.pseudo,
        password: testUser.password,
      });

      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('user');
      expect(response.data).toHaveProperty('token');
      expect(response.data.user.pseudo).toBe(testUser.pseudo);
      expect(response.data.user).not.toHaveProperty('password');
    });

    it('should fail to register with missing fields', async () => {
      try {
        await axios.post(`${API_URL}/auth/register`, {
          pseudo: testUser.pseudo,
        });
        fail('Expected request to fail');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('error');
      }
    });

    it('should fail to register with duplicate pseudo', async () => {
      try {
        await axios.post(`${API_URL}/auth/register`, {
          pseudo: testUser.pseudo,
          password: testUser.password,
        });
        fail('Expected request to fail');
      } catch (error: any) {
        expect(error.response.status).toBe(409);
        expect(error.response.data.error).toContain('déjà utilisé');
      }
    });
  });

  describe('POST /auth/login - Login user', () => {
    it('should successfully login with valid credentials', async () => {
      const response = await axios.post(`${API_URL}/auth/login`, {
        pseudo: testUser.pseudo,
        password: testUser.password,
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('user');
      expect(response.data).toHaveProperty('token');
      expect(response.data.user.pseudo).toBe(testUser.pseudo);
      
      // Sauvegarder le token pour d'autres tests potentiels
      authToken = response.data.token;
      expect(authToken).toBeTruthy();
    });

    it('should fail to login with invalid password', async () => {
      try {
        await axios.post(`${API_URL}/auth/login`, {
          pseudo: testUser.pseudo,
          password: 'WrongPassword123!',
        });
        fail('Expected request to fail');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
        expect(error.response.data.error).toContain('Identifiants invalides');
      }
    });

    it('should fail to login with non-existent user', async () => {
      try {
        await axios.post(`${API_URL}/auth/login`, {
          pseudo: 'nonexistentuser_999999',
          password: testUser.password,
        });
        fail('Expected request to fail');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
        expect(error.response.data.error).toContain('Identifiants invalides');
      }
    });

    it('should fail to login with missing fields', async () => {
      try {
        await axios.post(`${API_URL}/auth/login`, {
          pseudo: testUser.pseudo,
        });
        fail('Expected request to fail');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty('error');
      }
    });
  });
});
