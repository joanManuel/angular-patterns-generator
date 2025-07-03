import { ComponentOptions } from '../../types';

export function getComponentTemplate(options: ComponentOptions): string {
  return `import { Component, OnInit } from '@angular/core';
import { ${options.className}UseCase } from './use-cases/${options.componentName}.use-case';

@Component({
  selector: 'app-${options.selector}',
  templateUrl: './${options.componentName}.component.html',${options.includeStyles ? `\n  styleUrls: ['./${options.componentName}.component.scss'],` : ''}
})
export class ${options.className}Component implements OnInit {
  constructor(private ${options.componentName}UseCase: ${options.className}UseCase) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.${options.componentName}UseCase.execute();
  }
}`;
}

export function getUseCaseTemplate(options: ComponentOptions): string {
  return `import { Injectable } from '@angular/core';
import { ${options.className}Repository } from '../repositories/${options.componentName}.repository';

@Injectable({
  providedIn: 'root'
})
export class ${options.className}UseCase {
  constructor(private repository: ${options.className}Repository) {}

  execute() {
    // Implementar lógica de caso de uso
    return this.repository.getData();
  }
}`;
}

export function getRepositoryTemplate(options: ComponentOptions): string {
  return `import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ${options.className}Repository {
  getData(): Observable<any> {
    // Implementar lógica de acceso a datos
    return of({});
  }
}`;
}

export function getHtmlTemplate(options: ComponentOptions): string {
  return `<div class="${options.componentName}-container">
  <h2>${options.className} Component</h2>
  <p>Clean Architecture Pattern Implementation</p>
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
