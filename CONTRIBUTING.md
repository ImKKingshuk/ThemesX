# Contributing to ThemesX

Thank you for your interest in contributing to ThemesX! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Getting Started

### Ways to Contribute

- 🐛 **Bug Reports:** Found a bug? Let us know!
- ✨ **Feature Requests:** Have an idea? We'd love to hear it!
- 📝 **Documentation:** Improve or add documentation
- 🧪 **Tests:** Add or improve test coverage
- 💻 **Code:** Fix bugs or implement features
- 🎨 **Examples:** Add usage examples

### Before You Start

1. Check [existing issues](https://github.com/ImKKingshuk/ThemesX/issues)
2. Read this contributing guide
3. Set up your development environment

## Development Setup

### Prerequisites

- **Node.js:** 18.x or higher
- **Bun:** Latest version (recommended) or npm/pnpm/yarn
- **Git:** For version control

### Fork and Clone

1. **Fork the repository** on GitHub

2. **Clone your fork:**

```bash
git clone https://github.com/YOUR_USERNAME/ThemesX.git
cd ThemesX
```

3. **Add upstream remote:**

```bash
git remote add upstream https://github.com/ImKKingshuk/ThemesX.git
```

### Install Dependencies

```bash
# Using bun (recommended)
bun install

# Or using npm
npm install
```

### Available Scripts

```bash
# Development
bun run dev          # Watch mode for development

# Building
bun run build        # Build the library

# Testing
bun run test         # Run tests

# Linting & Formatting
bun run check        # Lint and format code
bun run format       # Format code only
```

## Making Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

**Branch naming:**

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `test/` - Test additions/changes
- `refactor/` - Code refactoring

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add tests for new features
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run tests
bun run test

# Check linting
bun run check

# Build to ensure no errors
bun run build
```

## Testing

### Writing Tests

Tests are located in `/tests` directory. We use `@rstest/core` for testing.

**Test file naming:**

- `*.test.tsx` for component tests
- `*.test.ts` for utility function tests

**Example test:**

```typescript
import { test, expect } from "@rstest/core";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../src/index";

test("should switch themes", async () => {
  render(
    <ThemeProvider defaultTheme="light">
      <TestComponent />
    </ThemeProvider>
  );

  // Your assertions
  expect(screen.getByTestId("theme")).toHaveTextContent("light");
});
```

### Test Coverage

- Aim for >80% code coverage
- Test edge cases
- Test error scenarios
- Test TypeScript types

## Submitting Changes

### 1. Commit Your Changes

Follow our [commit message conventions](#commit-messages):

```bash
git add .
git commit -m "feat: add OKLCH color parsing"
```

### 2. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 3. Create a Pull Request

1. Go to the [ThemesX repository](https://github.com/ImKKingshuk/ThemesX)
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template:
   - **Description:** What changes did you make?
   - **Motivation:** Why are these changes needed?
   - **Testing:** How did you test the changes?
   - **Screenshots:** If UI changes, add screenshots

### 4. Code Review

- Address review comments promptly
- Keep discussions respectful
- Update your PR based on feedback

### 5. Merge

Once approved, maintainers will merge your PR!

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Provide proper type annotations
- Avoid `any` type
- Use interfaces for public APIs

**Good:**

```typescript
interface ThemeConfig {
  light?: ThemeColors;
  dark?: ThemeColors;
}

export function createTheme(config: ThemeConfig): ThemeConfig {
  return config;
}
```

**Bad:**

```typescript
export function createTheme(config: any): any {
  return config;
}
```

### React

- Use functional components
- Use hooks appropriately
- Memoize expensive computations
- Follow React best practices

**Good:**

```typescript
export const ThemeProvider: React.FC<ThemeProviderProps> = React.memo(
  ({ children, config }) => {
    const memoizedValue = React.useMemo(() => computeValue(), [dependency]);

    return (
      <ThemeContext.Provider value={memoizedValue}>
        {children}
      </ThemeContext.Provider>
    );
  }
);
```

### Code Style

We use **Biome** for linting and formatting:

```bash
# Auto-fix issues
bun run check

# Format code
bun run format
```

**Key rules:**

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Use trailing commas
- Max line length: 100 characters

### Documentation

- Add JSDoc comments for public APIs
- Update README for new features
- Add examples for complex features
- Keep documentation up-to-date

**Example:**

````typescript
/**
 * Create a custom theme configuration
 *
 * @param config - Theme configuration object
 * @returns Validated theme configuration
 *
 * @example
 * ```typescript
 * const config = createTheme({
 *   light: { background: '#fff' },
 *   dark: { background: '#000' },
 * });
 * ```
 */
export function createTheme(config: ThemeConfig): ThemeConfig {
  return config;
}
````

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `perf`: Performance improvements

### Examples

**Feature:**

```
feat(colors): add OKLCH color space support

- Add parseColor utility for OKLCH colors
- Update color generation logic
- Add OKLCH examples to documentation
```

**Bug fix:**

```
fix(storage): prevent theme flicker on SSR

Fixes #123
```

**Documentation:**

```
docs: update migration guide for v2.0
```

**Breaking change:**

```
feat!: change default CSS variable prefix

BREAKING CHANGE: Default prefix changed from 'theme' to 'themesx'
```

## Pull Request Guidelines

### PR Title

Use the same format as commit messages:

```
feat(colors): add OKLCH support
fix(provider): resolve hydration mismatch
docs: update API reference
```

### PR Description

Include:

1. **What:** Brief description of changes
2. **Why:** Motivation for changes
3. **How:** Technical approach
4. **Testing:** How you tested
5. **Screenshots:** For visual changes
6. **Breaking Changes:** If any
7. **Related Issues:** Link to issues

**Template:**

```markdown
## What

Add OKLCH color space support for perceptually uniform colors.

## Why

Users requested modern color space support for better color consistency.

## How

- Added OKLCH parser in color utilities
- Updated color generation to handle OKLCH format
- Added comprehensive tests

## Testing

- Added unit tests for OKLCH parsing
- Tested with various OKLCH values
- Verified visual consistency across themes

## Screenshots

N/A

## Breaking Changes

None

## Related Issues

Closes #42
```

## Review Process

### What We Look For

- ✅ Code quality and style
- ✅ Test coverage
- ✅ Documentation updates
- ✅ No breaking changes (or justified)
- ✅ Performance impact
- ✅ Accessibility considerations

### Review Timeline

- **Initial review:** Within 3-5 days
- **Follow-up:** Within 2 days
- **Merge:** After approval and CI passes

## Release Process

Maintainers handle releases:

1. Version bump (semantic versioning)
2. Update CHANGELOG
3. Create GitHub release
4. Publish to npm

## Questions?

- 💬 [GitHub Discussions](https://github.com/ImKKingshuk/ThemesX/discussions)
- 🐛 [GitHub Issues](https://github.com/ImKKingshuk/ThemesX/issues)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (GPL-3.0-or-later).

---

Thank you for contributing to ThemesX! 🎉
