# Angular Patterns Generator

A VS Code extension that generates Angular components following different architectural patterns and best practices. Perfect for maintaining consistency in large projects and accelerating development.

## ✨ Features

- **5 Architecture Patterns**: MVP, Clean Architecture, Standalone Components, Smart Components, and Dumb Components
- **Automatic Angular Detection**: Detects Angular version and adapts templates automatically
- **Smart Routing**: Generates modern routing (Angular 19+) or classic routing based on detected version
- **Optional Modules**: Support for module generation in classic Angular projects
- **Modern Angular Support**: Includes signals, inject(), functional routing guards, and OnPush strategy
- **Full TypeScript**: Strict types and well-defined interfaces
- **Modular Structure**: Templates organized by pattern for easy maintenance
- **VS Code Integration**: Context menu in Explorer for quick generation

## 🔍 Automatic Detection

The extension automatically detects:

- **Angular Version**: Reads package.json to determine the version
- **Project Type**: Identifies if it uses standalone components or modules
- **Routing Configuration**: Decides between modern or classic routing

### 🆕 New Options

- **Include Module**: Generates .module.ts files for patterns that require them
- **Adaptive Routing**:
  - Angular 19+: .routes.ts files with functional guards
  - Angular <19: Classic routing modules
- **Project Detection**: Informative message about detected version

## 🚀 Usage

1. **Right-click** on a folder in VS Code Explorer
2. Select **"Generate Angular Component with Pattern"**
3. Choose the desired **architecture pattern**
4. Enter the **component name**
5. Files are automatically generated in the selected folder

### Available Patterns

#### 🎯 MVP (Model-View-Presenter)

Separates presentation logic from the component using a classic MVP pattern.

```
component-name/
├── component-name.component.ts
├── component-name.component.html
├── component-name.component.scss
├── component-name.presenter.ts
├── component-name.model.ts
└── component-name.view.interface.ts
```

#### 🏗️ Clean Architecture

Implements clean architecture with use cases, repositories, and well-defined interfaces.

```
component-name/
├── component-name.component.ts
├── component-name.component.html
├── component-name.component.scss
├── use-cases/
│   └── component-name.use-case.ts
├── repositories/
│   └── component-name.repository.interface.ts
└── models/
    └── component-name.model.ts
```

#### ⚡ Standalone Component

Modern independent component from Angular 14+ with direct imports.

```
component-name/
├── component-name.component.ts
├── component-name.component.html
└── component-name.component.scss
```

#### 🧠 Smart Component

Intelligent component that handles state and business logic.

```
component-name/
├── component-name.component.ts
├── component-name.component.html
├── component-name.component.scss
└── component-name.service.ts
```

#### 🎨 Dumb Component

Pure presentation component that only receives data via inputs.

```
component-name/
├── component-name.component.ts
├── component-name.component.html
└── component-name.component.scss
```

## 🛠️ Requirements

- **VS Code** 1.101.0 or higher
- **Node.js** 16.x or higher
- **Angular** project (optional, for better integration)

## ⚙️ Configuration

This extension requires no additional configuration. It works automatically when invoked from the context menu.

## 🏗️ Extension Architecture

The extension is structured modularly to facilitate maintenance and extension:

```
src/
├── extension.ts              # Main entry point
├── generators/
│   ├── base-generator.ts    # Base generator class
│   └── factory.ts           # Factory for selecting generators
├── templates/
│   ├── mvp/
│   │   ├── templates.ts     # MVP pattern templates
│   │   └── generator.ts     # MVP generator
│   ├── clean-architecture/
│   │   ├── templates.ts     # Clean Architecture templates
│   │   └── generator.ts     # Clean Architecture generator
│   ├── standalone/
│   │   ├── templates.ts     # Standalone templates
│   │   └── generator.ts     # Standalone generator
│   ├── smart-component/
│   │   ├── templates.ts     # Smart Component templates
│   │   └── generator.ts     # Smart Component generator
│   └── dumb-component/
│       ├── templates.ts     # Dumb Component templates
│       └── generator.ts     # Dumb Component generator
├── types/
│   └── index.ts             # Shared TypeScript types
└── utils/
    ├── angular-detector.ts  # Angular project detection
    ├── module-templates.ts  # Module and routing templates
    └── string.ts            # String utilities
```

## 🚧 Development

To contribute or modify the extension:

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Compile in watch mode**: `npm run watch`
4. **Open in VS Code** and press `F5` to run in debug mode
5. **Make changes** to templates or generators as needed

### Adding a New Pattern

1. Create a new folder in `src/templates/new-pattern/`
2. Create `templates.ts` with the pattern templates
3. Create `generator.ts` with the generation logic
4. Update `GeneratorFactory` in `src/generators/factory.ts`
5. Add the new pattern to options in `extension.ts`

## 📝 Upcoming Features

- [ ] Customizable configuration via VS Code settings
- [ ] Automatic test support (jasmine/jest)
- [ ] User-customizable templates
- [ ] Storybook support
- [ ] Angular CLI integration
- [ ] Microfrontend support
- [ ] Templates for services, guards, and pipes

## 🐛 Known Issues

Currently, there are no known issues. If you encounter any bugs, please report an issue in the repository.

## 📋 Release Notes

### 1.0.1

- Improved icon with better visibility and professional design
- Enhanced template generation with Angular version detection
- Added module and routing support with adaptive generation

### 1.0.0

- Initial release with 5 architecture patterns
- Full support for modern Angular
- Modular structure of templates and generators

---

## Following Extension Guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For More Information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
