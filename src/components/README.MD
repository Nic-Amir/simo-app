# Component Structuring Guidelines

## Atomic:

#### Atomic components are designed to have a single, well-defined responsibility and are highly reusable. They should be as self-contained and independent as possible.

1. **Single Responsibility:** Each atomic component should have a single, clearly defined responsibility. For example, create separate components for buttons, inputs, labels, and other UI elements.

2. **Independence:** Atomic components should be independent and not rely on internal state or external dependencies. They should accept all necessary data through props.

3. **Reusability:** Aim to create atomic components that can be reused across different parts of the application. These components should provide consistent functionality and appearance.

## Pure and Stateless:

#### Pure and stateless components should be free from side effects and external dependencies.

1. **Stateless:** Pure components should not manage their own internal state. They should receive all data and behavior via props from parent components.

2. **Deterministic:** The output of pure components should be solely determined by their input (props). There should be no side effects or dependencies on external state.

3. **No Side Effects:** Pure components should not have side effects. They should not perform network requests, modify global state, or affect the application outside their rendering.

4. **Reusability:** Pure components should be highly reusable. You should be able to use the same pure component in multiple parts of the application without unexpected behavior.

5. **Predictability:** Pure components should be predictable and easy to reason about. Given their props, their behavior and output should be straightforward to understand.

6. **Testability:** Pure components should be easy to test because they do not have internal state or side effects. Testing can be done by passing different sets of props and verifying the output.

## Naming Conventions:

1. Choose descriptive and meaningful names. Names should clearly indicate the component's purpose and functionality.

2. Use camelCase for component names (e.g., `button`, `inputField`) and PascalCase for component filenames (e.g., `Button.js`, `InputField.js`).

- NOTE: component name is different from file name
  -- filename: `text-component.jsx`
  -- component name: `TextComponent` / `<TextComponent />`
  -- putting it together: `import TextComponent from './text-component.jsx'`