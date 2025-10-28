import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NOXYON Budget API',
      version: '1.0.0',
      description: 'API pour gérer budgets et dépenses'
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:5000',
        description: 'Local server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Budget: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            user_id: { type: 'integer' },
            category_id: { type: 'integer' },
            amount: { type: 'number', format: 'float' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        },
        BudgetWithCategory: {
          allOf: [
            { $ref: '#/components/schemas/Budget' },
            {
              type: 'object',
              properties: {
                category_name: { type: 'string' }
              }
            }
          ]
        },
        Expense: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            user_id: { type: 'integer' },
            category_id: { type: 'integer' },
            amount: { type: 'number', format: 'float' },
            description: { type: 'string' },
            date: { type: 'string', format: 'date' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        },
        ExpenseWithCategory: {
          allOf: [
            { $ref: '#/components/schemas/Expense' },
            {
              type: 'object',
              properties: {
                category_name: { type: 'string' }
              }
            }
          ]
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: []
};

const swaggerSpec: any = swaggerJSDoc(options);

export default swaggerSpec;

swaggerSpec.paths = {
  '/api/budgets': {
    get: {
      tags: ['Budgets'],
      summary: 'Get all budgets for the authenticated user',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'List of budgets',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/BudgetWithCategory' }
              }
            }
          }
        },
        '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
      }
    },
    post: {
      tags: ['Budgets'],
      summary: 'Create a budget',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                category_id: { type: 'integer' },
                amount: { type: 'number', format: 'float' }
              },
              required: ['category_id', 'amount']
            }
          }
        }
      },
      responses: {
        '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Budget' } } } },
        '400': { description: 'Bad Request' },
        '401': { description: 'Unauthorized' }
      }
    }
  },
  '/api/budgets/{id}': {
    put: {
      tags: ['Budgets'],
      summary: 'Update budget amount',
      security: [{ bearerAuth: [] }],
      parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer' } } ],
      requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { amount: { type: 'number', format: 'float' } }, required: ['amount'] } } } },
      responses: { '200': { description: 'Updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Budget' } } } }, '401': { description: 'Unauthorized' }, '404': { description: 'Not found' } }
    },
    delete: {
      tags: ['Budgets'],
      summary: 'Delete a budget',
      security: [{ bearerAuth: [] }],
      parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer' } } ],
      responses: { '200': { description: 'Deleted' }, '401': { description: 'Unauthorized' }, '404': { description: 'Not found' } }
    }
  },
  '/api/expenses': {
    get: {
      tags: ['Expenses'],
      summary: 'Get expenses for authenticated user (optional filters)',
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'startDate', in: 'query', schema: { type: 'string', format: 'date' } },
        { name: 'endDate', in: 'query', schema: { type: 'string', format: 'date' } },
        { name: 'category_id', in: 'query', schema: { type: 'integer' } }
      ],
      responses: { '200': { description: 'List of expenses', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/ExpenseWithCategory' } } } } }, '401': { description: 'Unauthorized' } }
    },
    post: {
      tags: ['Expenses'],
      summary: 'Create an expense',
      security: [{ bearerAuth: [] }],
      requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { category_id: { type: 'integer' }, amount: { type: 'number', format: 'float' }, description: { type: 'string' }, date: { type: 'string', format: 'date' } }, required: ['category_id', 'amount'] } } } },
      responses: { '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Expense' } } } }, '400': { description: 'Bad Request' }, '401': { description: 'Unauthorized' } }
    }
  },
  '/api/expenses/{id}': {
    put: {
      tags: ['Expenses'],
      summary: 'Update an expense',
      security: [{ bearerAuth: [] }],
      parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer' } } ],
      requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { amount: { type: 'number', format: 'float' }, description: { type: 'string' }, category_id: { type: 'integer' }, date: { type: 'string', format: 'date' } } } } } },
      responses: { '200': { description: 'Updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Expense' } } } }, '401': { description: 'Unauthorized' }, '404': { description: 'Not found' } }
    },
    delete: {
      tags: ['Expenses'],
      summary: 'Delete an expense',
      security: [{ bearerAuth: [] }],
      parameters: [ { name: 'id', in: 'path', required: true, schema: { type: 'integer' } } ],
      responses: { '200': { description: 'Deleted' }, '401': { description: 'Unauthorized' }, '404': { description: 'Not found' } }
    }
  }
};
