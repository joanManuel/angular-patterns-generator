import { ComponentOptions } from '../../types';

export function getComponentTemplate(options: ComponentOptions): string {
  return `import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ${options.className}Service } from './${options.componentName}.service';

@Component({
  selector: 'app-${options.selector}',
  templateUrl: './${options.componentName}.component.html',${options.includeStyles ? `\n  styleUrls: ['./${options.componentName}.component.scss'],` : ''}
})
export class ${options.className}Component implements OnInit {
  data$: Observable<any>;

  constructor(private ${options.componentName}Service: ${options.className}Service) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.data$ = this.${options.componentName}Service.getData();
  }

  onAction(data: any) {
    this.${options.componentName}Service.updateData(data);
  }
}`;
}

export function getServiceTemplate(options: ComponentOptions): string {
  return `import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ${options.className}Service {
  private dataSubject = new BehaviorSubject<any>({});

  getData(): Observable<any> {
    return this.dataSubject.asObservable();
  }

  updateData(data: any) {
    this.dataSubject.next(data);
  }
}`;
}

export function getHtmlTemplate(options: ComponentOptions): string {
  return `<div class="${options.componentName}-container">
  <h2>${options.className} Component (Smart)</h2>
  <p>Smart Component - Manages state and business logic</p>
  <div *ngIf="data$ | async as data">
    <!-- Mostrar datos aquí -->
    <pre>{{ data | json }}</pre>
  </div>
</div>`;
}

export function getStyleTemplate(options: ComponentOptions): string {
  return `.${options.componentName}-container {
  padding: 1rem;
  
  h2 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  pre {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #e9ecef;
    overflow-x: auto;
  }
}`;
}
