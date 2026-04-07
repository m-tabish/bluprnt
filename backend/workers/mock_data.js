const mock_data = {
    technologies: ["Jest", "Supertest", "Nock", "Cypress"],
    description:
        "A non-linear testing framework setup for JavaScript APIs and UI workflows.",
    steps: {
        nodes: [
            {
                nodeId: "n1",
                process: "Unit Testing Configuration",
                description: "Set up Jest for unit level logic validation.",
                code: `const sum = (a, b) => a + b;
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
module.exports = sum;`,
                resources: ["https://jestjs.io/docs/getting-started"],
                target: ["n2", "n3"],
            },
            {
                nodeId: "n2",
                process: "API Integration Tests",
                description: "Implement Supertest for endpoint verification.",
                code: `const request = require('supertest');
const app = require('./app');
describe('GET /users', () => {
    it('responds with json', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
    });
});`,
                resources: ["https://www.npmjs.com/package/supertest"],
                target: ["n4"],
            },
            {
                nodeId: "n3",
                process: "Mock Network Layer",
                description: "Use Nock to mock external HTTP requests.",
                code: `const nock = require('nock');
const scope = nock('https://api.github.com')
    .get('/users')
    .reply(200, { username: 'testuser' });
// Now execute your fetch call logic`,
                resources: ["https://github.com/nock/nock"],
                target: ["n4"],
            },
            {
                nodeId: "n4",
                process: "End-to-End UI Validation",
                description: "Automate browser flows with Cypress.",
                code: `describe('Login Flow', () => {
    it('should redirect on login', () => {
        cy.visit('/login');
        cy.get('input[name=user]').type('admin');
        cy.get('button').click();
        cy.url().should('include', '/dashboard');
    });
});`,
                resources: ["https://docs.cypress.io/guides"],
                target: [],
            },
        ],
        edges: [
            { source: "n1", target: "n2", label: "requires unit baseline" },
            { source: "n1", target: "n3", label: "requires unit baseline" },
            { source: "n2", target: "n4", label: "enables E2E coverage" },
            { source: "n3", target: "n4", label: "ensures dependency safety" },
        ],
    },
};
module.exports = mock_data