# Angular Patterns Generator

Una extensión de VS Code que genera componentes Angular siguiendo diferentes patrones de arquitectura y buenas prácticas. Ideal para mantener consistencia en proyectos grandes y acelerar el desarrollo.

## ✨ Características

- **5 Patrones de Arquitectura**: MVP, Clean Architecture, Standalone Components, Smart Components y Dumb Components
- **Soporte Angular Moderno**: Incluye signals, inject(), functional routing guards y OnPush strategy
- **TypeScript Completo**: Tipos estrictos y interfaces bien definidas
- **Estructura Modular**: Templates organizados por patrón para fácil mantenimiento
- **Integración con VS Code**: Menú contextual en el Explorer para generación rápida

## 🚀 Uso

1. **Haz clic derecho** en una carpeta en el Explorer de VS Code
2. Selecciona **"Generate Angular Component"**
3. Elige el **patrón de arquitectura** deseado
4. Ingresa el **nombre del componente**
5. Los archivos se generan automáticamente en la carpeta seleccionada

### Patrones Disponibles

#### 🎯 MVP (Model-View-Presenter)
Separa la lógica de presentación del componente usando un patrón MVP clásico.
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
Implementa una arquitectura limpia con casos de uso, repositorios e interfaces bien definidas.
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
Componente independiente moderno de Angular 14+ con imports directos.
```
component-name/
├── component-name.component.ts
├── component-name.component.html
└── component-name.component.scss
```

#### 🧠 Smart Component
Componente inteligente que maneja estado y lógica de negocio.
```
component-name/
├── component-name.component.ts
├── component-name.component.html
├── component-name.component.scss
└── component-name.service.ts
```

#### 🎨 Dumb Component
Componente de presentación puro que solo recibe datos via inputs.
```
component-name/
├── component-name.component.ts
├── component-name.component.html
└── component-name.component.scss
```

## 🛠️ Requisitos

- **VS Code** 1.74.0 o superior
- **Node.js** 16.x o superior
- Proyecto **Angular** (opcional, para mejor integración)

## ⚙️ Configuración

Esta extensión no requiere configuración adicional. Funciona automáticamente al detectar el comando desde el menú contextual.

## 🏗️ Arquitectura de la Extensión

La extensión está estructurada de forma modular para facilitar el mantenimiento y la extensión:

```
src/
├── extension.ts              # Punto de entrada principal
├── generators/
│   └── factory.ts           # Factory para seleccionar generadores
├── templates/
│   ├── mvp/
│   │   ├── templates.ts     # Templates del patrón MVP
│   │   └── generator.ts     # Generador MVP
│   ├── clean-architecture/
│   │   ├── templates.ts     # Templates Clean Architecture
│   │   └── generator.ts     # Generador Clean Architecture
│   ├── standalone/
│   │   ├── templates.ts     # Templates Standalone
│   │   └── generator.ts     # Generador Standalone
│   ├── smart-component/
│   │   ├── templates.ts     # Templates Smart Component
│   │   └── generator.ts     # Generador Smart Component
│   └── dumb-component/
│       ├── templates.ts     # Templates Dumb Component
│       └── generator.ts     # Generador Dumb Component
├── types/
│   └── index.ts             # Tipos TypeScript compartidos
└── utils/
    └── string.ts            # Utilidades para strings
```

## 🚧 Desarrollo

Para contribuir o modificar la extensión:

1. **Clonar el repositorio**
2. **Instalar dependencias**: `npm install`
3. **Compilar en modo watch**: `npm run watch`
4. **Abrir en VS Code** y presionar `F5` para ejecutar en modo debug
5. **Hacer cambios** en los templates o generadores según sea necesario

### Agregar un Nuevo Patrón

1. Crear nueva carpeta en `src/templates/nuevo-patron/`
2. Crear `templates.ts` con los templates del patrón
3. Crear `generator.ts` con la lógica de generación
4. Actualizar `GeneratorFactory` en `src/generators/factory.ts`
5. Agregar el nuevo patrón a las opciones en `extension.ts`

## 📝 Próximas Características

- [ ] Configuración personalizable via settings de VS Code
- [ ] Soporte para tests automáticos (jasmine/jest)
- [ ] Templates personalizables por usuario
- [ ] Soporte para Storybook
- [ ] Integración con Angular CLI
- [ ] Soporte para microfrontends
- [ ] Templates para services, guards y pipes

## 🐛 Problemas Conocidos

Actualmente no hay problemas conocidos. Si encuentras algún bug, por favor reporta un issue en el repositorio.

## 📋 Notas de Versión

### 1.0.0

- Lanzamiento inicial con 5 patrones de arquitectura
- Soporte completo para Angular moderno
- Estructura modular de templates y generadores

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
