import { ComponentOptions } from '../../types';

export function getComponentTemplate(options: ComponentOptions): string {
  return `import { Component } from '@angular/core';
import { ${options.className}Presenter } from './${options.componentName}.presenter';

@Component({
  selector: 'app-${options.selector}',
  templateUrl: './${options.componentName}.component.html',${options.includeStyles ? `\n  styleUrls: ['./${options.componentName}.component.scss'],` : ''}
  providers: [${options.className}Presenter]
})
export class ${options.className}Component {
  constructor(public presenter: ${options.className}Presenter) {}
}`;
}

export function getPresenterTemplate(options: ComponentOptions): string {
  return `import { Injectable } from '@angular/core';
import { ${options.className}Model } from './${options.componentName}.model';

@Injectable()
export class ${options.className}Presenter {
  constructor(private model: ${options.className}Model) {}

  // Lógica de presentación aquí
  getData() {
    return this.model.getData();
  }

  onAction() {
    // Manejar acciones de la vista
  }
}`;
}

export function getModelTemplate(options: ComponentOptions): string {
  return `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ${options.className}Model {
  // Lógica de datos y estado aquí
  
  getData() {
    // Implementar lógica de obtención de datos
    return {};
  }

  updateData(data: any) {
    // Implementar lógica de actualización
  }
}`;
}

export function getHtmlTemplate(options: ComponentOptions): string {
  return `<div class="${options.componentName}-container">
  <h2>${options.className} Component</h2>
  <p>MVP Pattern Implementation</p>
  <!-- Agregar tu template aquí -->
</div>`;
}

export function getStyleTemplate(options: ComponentOptions): string {
  return `.${options.componentName}-container {
  padding: 1rem;
  
  h2 {
    color: #333;
    margin-bottom: 0.5rem;
  }
}`;
}
