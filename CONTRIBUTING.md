# Contributing to Edge Detection Viewer

Thank you for your interest in contributing to this project!

## 🔄 Development Workflow

### 1. Fork and Clone

```bash
git clone <your-fork-url>
cd EdgeDetectionViewer
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes

Follow the coding standards outlined below.

### 4. Commit Changes

Use conventional commit messages:

```bash
git commit -m "feat: add new edge detection algorithm"
git commit -m "fix: resolve memory leak in JNI bridge"
git commit -m "docs: update setup instructions"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

## 📝 Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```
feat(camera): add support for front camera

Implement front camera switching functionality with
proper orientation handling.

Closes #123
```

```
fix(jni): resolve memory leak in frame processing

- Release JNI arrays properly
- Use smart pointers for C++ objects
- Add memory profiling tests
```

## 🎨 Code Style

### Kotlin

- Follow [Kotlin Coding Conventions](https://kotlinlang.org/docs/coding-conventions.html)
- Use 4 spaces for indentation
- Maximum line length: 120 characters

### C++

- Follow [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)
- Use 4 spaces for indentation
- Use smart pointers (`std::unique_ptr`, `std::shared_ptr`)
- RAII for resource management

### TypeScript

- Follow [TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- Use 2 spaces for indentation
- Enable strict mode
- Use interfaces for type definitions

## 🧪 Testing

### Android

```bash
./gradlew test
./gradlew connectedAndroidTest
```

### Web

```bash
cd web
npm test
```

## 📚 Documentation

- Update README.md for user-facing changes
- Update ARCHITECTURE.md for architectural changes
- Add inline comments for complex logic
- Update SETUP_GUIDE.md if setup process changes

## 🐛 Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**:
   - Android version
   - Device model
   - App version
6. **Logs**: Relevant logcat output
7. **Screenshots**: If applicable

## 💡 Feature Requests

When requesting features, please include:

1. **Use Case**: Why is this feature needed?
2. **Proposed Solution**: How should it work?
3. **Alternatives**: Other approaches considered
4. **Additional Context**: Any other relevant information

## 🔍 Code Review Process

1. All submissions require review
2. Reviewers will check:
   - Code quality and style
   - Test coverage
   - Documentation
   - Performance impact
3. Address review comments
4. Maintain clean commit history

## 📋 Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] Commit messages follow conventions
- [ ] No merge conflicts
- [ ] PR description is clear and complete

## 🚀 Release Process

1. Update version in `app/build.gradle`
2. Update CHANGELOG.md
3. Create release tag
4. Build release APK
5. Create GitHub release

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## 🙏 Thank You!

Your contributions make this project better for everyone!
