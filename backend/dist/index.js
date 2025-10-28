"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes (TypeScript)
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const expenses_routes_1 = __importDefault(require("./routes/expenses.routes"));
const budgets_routes_1 = __importDefault(require("./routes/budgets.routes"));
const categories_routes_1 = __importDefault(require("./routes/categories.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger"));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/expenses', expenses_routes_1.default);
app.use('/api/budgets', budgets_routes_1.default);
app.use('/api/categories', categories_routes_1.default);
// Swagger UI
app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.get('/api/docs.json', (req, res) => res.json(swagger_1.default));
app.get('/', (req, res) => res.json({ message: 'NOXYON Budget API (TS)' }));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
