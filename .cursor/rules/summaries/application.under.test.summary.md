# Marine Licensing Application Under Test Context

## Core Principle

The marine licensing application is a UK Government (Defra) system that handles licensing, exemptions, public register, and project management for marine activities in English waters, built on Node.js/Hapi.js with MongoDB and GOV.UK Design System.

## When to Apply

- Creating domain-specific test scenarios
- Implementing new tests for marine licensing features
- Understanding application architecture for test development
- Referencing marine licensing terminology
- Setting up test environments for the application

## Key Guidelines

1. **Reference actual routes and endpoints** - Check frontend/backend routes to understand application structure
2. **Use domain language** - Refer to marine licensing concepts (exemptions, licences, project names, public register)
3. **Follow application patterns** - Both frontend and backend use Hapi.js patterns
4. **Check actual page structures** - Reference Nunjucks templates and frontend components
5. **Understand user journeys** - Reflect specific marine licensing workflows in test scenarios

## Examples

| Application Area | Test Considerations                                                                |
| ---------------- | ---------------------------------------------------------------------------------- |
| Frontend         | Hapi.js routes, Nunjucks templates, GOV.UK Design System components                |
| Backend          | REST API endpoints, MongoDB models, validation schemas                             |
| User Types       | Internal MMO staff, external applicants (veteran/novice)                           |
| Key Features     | Licence applications, exemption notifications, public register, project management |

## Related Rules

- [personas](../personas.mdc) - User types and characteristics for marine licensing
- [logical.consistency.validation](../logical.consistency.validation.mdc) - Data model validation principles
- [screenplay-pattern](../screenplay-pattern.mdc) - User-centric test automation approach used in project
