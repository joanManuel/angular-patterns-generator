import { ComponentOptions } from '../../types';

export function getComponentTemplate(options: ComponentOptions): string {
  return `import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-${options.selector}',
  templateUrl: './${options.componentName}.component.html',${options.includeStyles ? `\n  styleUrls: ['./${options.componentName}.component.scss']` : ''}
})
export class ${options.className}Component {
  @Input() data: any;
  @Output() action = new EventEmitter<any>();

  onButtonClick() {
    this.action.emit(this.data);
  }
}`;
}

export function getHtmlTemplate(options: ComponentOptions): string {
  return `<div class="${options.componentName}-container">
  <h2>${options.className} Component (Dumb)</h2>
  <p>Dumb Component - Receives data via @Input and emits events via @Output</p>
  
  <div *ngIf="data">
    <!-- Mostrar datos recibidos -->
    <pre>{{ data | json }}</pre>
  </div>
  
  <button (click)="onButtonClick()">Trigger Action</button>
</div>`;
}

export function getStyleTemplate(options: ComponentOptions): string {
  return `.${options.componentName}-container {
  padding: 1rem;
  
  h2 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background-color: #0056b3;
    }
  }
  
  pre {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #e9ecef;
    overflow-x: auto;
    margin: 1rem 0;
  }
}`;
}
