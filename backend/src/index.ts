import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes (TypeScript)
import authRoutes from './routes/auth.routes';
import expensesRoutes from './routes/expenses.routes';
import budgetsRoutes from './routes/budgets.routes';
import categoriesRoutes from './routes/categories.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/budgets', budgetsRoutes);
app.use('/api/categories', categoriesRoutes);

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/docs.json', (req, res) => res.json(swaggerSpec));

app.get('/', (req, res) => res.json({ message: 'NOXYON Budget API (TS)'}));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
