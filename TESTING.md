# 🧪 Guía de Pruebas para Angular Patterns Generator

Este documento describe cómo probar manualmente la extensión Angular Patterns Generator.

## 🚀 Cómo Probar la Extensión

### 1. Ejecutar en Modo Debug

1. **Abrir VS Code** en la carpeta del proyecto de la extensión
2. **Presionar F5** o ir a `Run > Start Debugging`
3. Esto abrirá una nueva ventana de VS Code con la extensión cargada (Extension Host)

### 2. Crear un Proyecto de Prueba

En la ventana del Extension Host:

1. **Crear una carpeta nueva** para pruebas (ej: `test-angular-project`)
2. **Abrir la carpeta** en VS Code
3. **Crear algunas subcarpetas** como `src/app/components/`

### 3. Probar la Generación de Componentes

#### Paso 1: Acceder al Comando
- **Clic derecho** en cualquier carpeta en el Explorer
- Buscar **"Generate Angular Component"** en el menú contextual

#### Paso 2: Probar Cada Patrón

##### 🎯 Probar MVP Pattern
1. Seleccionar **"MVP"**
2. Ingresar nombre: `user-profile`
3. Incluir estilos: **"Yes"**
4. Incluir routing: **"Yes"**
5. Incluir módulo: **"Yes"** (si aparece la opción)

**Archivos esperados:**
```
user-profile/
├── user-profile.component.ts
├── user-profile.component.html
├── user-profile.component.scss
├── user-profile.presenter.ts
├── user-profile.model.ts
├── user-profile.view.interface.ts
├── user-profile.module.ts (si se incluyó módulo)
└── user-profile-routing.module.ts o user-profile.routes.ts (según versión Angular)
```

##### 🏗️ Probar Clean Architecture Pattern
1. Seleccionar **"Clean Architecture"**
2. Ingresar nombre: `product-list`
3. Incluir estilos: **"Yes"**
4. Incluir routing: **"No"**
5. Incluir módulo: **"Yes"** (si aparece la opción)

**Archivos esperados:**
```
product-list/
├── product-list.component.ts
├── product-list.component.html
├── product-list.component.scss
├── use-cases/
│   └── product-list.use-case.ts
├── repositories/
│   └── product-list.repository.interface.ts
└── models/
    └── product-list.model.ts
```

##### ⚡ Probar Standalone Component
1. Seleccionar **"Standalone"**
2. Ingresar nombre: `header-nav`
3. Incluir estilos: **"Yes"**
4. Incluir router: **"Yes"**

**Archivos esperados:**
```
header-nav/
├── header-nav.component.ts (con standalone: true)
├── header-nav.component.html
└── header-nav.component.scss
```

##### 🧠 Probar Smart Component
1. Seleccionar **"Smart Component"**
2. Ingresar nombre: `data-table`
3. Incluir estilos: **"No"**
4. Incluir router: **"No"**

**Archivos esperados:**
```
data-table/
├── data-table.component.ts
├── data-table.component.html
└── data-table.service.ts
```

##### 🎨 Probar Dumb Component
1. Seleccionar **"Dumb Component"**
2. Ingresar nombre: `card-item`
3. Incluir estilos: **"Yes"**
4. Incluir router: **"No"**

**Archivos esperados:**
```
card-item/
├── card-item.component.ts (solo @Input, OnPush)
├── card-item.component.html
└── card-item.component.scss
```

## ✅ Qué Verificar en Cada Archivo

### Para Todos los Patrones:

1. **Nombres correctos**: Los nombres de clase, selector y archivos deben coincidir
2. **Sintaxis TypeScript**: No debe haber errores de sintaxis
3. **Imports correctos**: Angular imports deben estar presentes
4. **ChangeDetection**: Debe usar `OnPush` cuando corresponda

### Específico por Patrón:

#### MVP:
- ✅ Presenter con lógica separada
- ✅ Model con interfaces de datos
- ✅ View interface bien definida

#### Clean Architecture:
- ✅ Use cases en carpeta separada
- ✅ Repository interfaces
- ✅ Models con tipos bien definidos

#### Standalone:
- ✅ `standalone: true` en el componente
- ✅ Imports directos en lugar de módulo

#### Smart Component:
- ✅ Service incluido
- ✅ Lógica de negocio en el componente

#### Dumb Component:
- ✅ Solo `@Input` properties
- ✅ No lógica de negocio
- ✅ `OnPush` change detection

## 🐛 Posibles Problemas y Soluciones

### Error: "Command not found"
- **Causa**: La extensión no se cargó correctamente
- **Solución**: Reiniciar el debug (Ctrl+Shift+F5)

### Error: "No folder selected"
- **Causa**: Comando ejecutado sin seleccionar carpeta
- **Solución**: Hacer clic derecho específicamente en una carpeta

### Error de creación de archivos
- **Causa**: Permisos de escritura o carpeta no existe
- **Solución**: Verificar permisos y que la carpeta existe

### Archivos vacíos o incorrectos
- **Causa**: Error en templates
- **Solución**: Verificar templates en `src/templates/{pattern}/templates.ts`

## 📝 Checklist de Pruebas

- [ ] MVP Pattern funciona correctamente
- [ ] Clean Architecture Pattern funciona correctamente  
- [ ] Standalone Component funciona correctamente
- [ ] Smart Component funciona correctamente
- [ ] Dumb Component funciona correctamente
- [ ] Nombres de archivos son correctos
- [ ] Contenido de archivos es válido
- [ ] Opciones de estilos funcionan
- [ ] Opciones de router funcionan
- [ ] Menú contextual aparece
- [ ] Mensajes de error son apropiados
- [ ] Mensajes de éxito aparecen

## 🔄 Después de Cambios

Si modificas la extensión:

1. **Guarda todos los archivos**
2. **El watch task compilará automáticamente**
3. **Recarga la ventana del Extension Host**: `Ctrl+R` o `Cmd+R`
4. **Prueba nuevamente** los patrones modificados

## 📊 Métricas de Éxito

La extensión funciona correctamente cuando:

- ✅ Todos los 5 patrones generan archivos sin errores
- ✅ Los archivos generados tienen el contenido esperado
- ✅ No hay errores de TypeScript en los archivos generados
- ✅ Las opciones (estilos, router) se aplican correctamente
- ✅ Los nombres se convierten correctamente (kebab-case, PascalCase)
