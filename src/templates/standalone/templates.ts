import { ComponentOptions } from '../../types';

export function getComponentTemplate(options: ComponentOptions): string {
  return `import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { ${options.className}Service } from './${options.componentName}.service';

@Component({
  selector: 'app-${options.selector}',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './${options.componentName}.component.html',${options.includeStyles ? `\n  styleUrls: ['./${options.componentName}.component.scss'],` : ''}
  providers: [${options.className}Service]
})
export class ${options.className}Component {
  // ✨ Usando inject() function en lugar de constructor injection
  private ${options.componentName}Service = inject(${options.className}Service);
  private router = inject(Router);

  // ✨ Usando signals para reactive state
  data = signal<any>(null);
  isLoading = signal(false);

  async ngOnInit() {
    await this.loadData();
  }

  private async loadData() {
    this.isLoading.set(true);
    try {
      const result = await this.${options.componentName}Service.getData();
      this.data.set(result);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  // ✨ Método para navegación programática
  navigateToDetail(id: string) {
    this.router.navigate(['/detail', id]);
  }
}`;
}

export function getServiceTemplate(options: ComponentOptions): string {
  return `import { Injectable, signal } from '@angular/core';

export interface ${options.className}Data {
  id: string;
  name: string;
  description: string;
}

@Injectable()
export class ${options.className}Service {
  // ✨ Usando signals para state management
  private _data = signal<${options.className}Data[]>([]);
  private _loading = signal(false);

  // ✨ Computed signals (readonly)
  data = this._data.asReadonly();
  loading = this._loading.asReadonly();

  async getData(): Promise<${options.className}Data[]> {
    this._loading.set(true);
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: ${options.className}Data[] = [
        { id: '1', name: 'Item 1', description: 'Description 1' },
        { id: '2', name: 'Item 2', description: 'Description 2' },
      ];
      
      this._data.set(mockData);
      return mockData;
    } finally {
      this._loading.set(false);
    }
  }

  addItem(item: Omit<${options.className}Data, 'id'>) {
    const newItem: ${options.className}Data = {
      ...item,
      id: Date.now().toString()
    };
    
    this._data.update(current => [...current, newItem]);
  }

  removeItem(id: string) {
    this._data.update(current => current.filter(item => item.id !== id));
  }
}`;
}

export function getHtmlTemplate(options: ComponentOptions): string {
  return `<div class="${options.componentName}-container">
  <header class="${options.componentName}-header">
    <h2>${options.className} Component</h2>
    <p>Modern Standalone Component with Signals & New Angular Features</p>
  </header>

  <!-- ✨ Control Flow Syntax (Angular 17+) -->
  @if (isLoading()) {
    <div class="loading">
      <p>Loading data...</p>
    </div>
  } @else {
    <div class="content">
      <!-- ✨ Usando signals en template -->
      @if (data()?.length) {
        <div class="data-grid">
          @for (item of data(); track item.id) {
            <div class="data-card" (click)="navigateToDetail(item.id)">
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
              <small>ID: {{ item.id }}</small>
            </div>
          }
        </div>
      } @else {
        <div class="empty-state">
          <p>No data available</p>
          <button (click)="loadData()" class="reload-btn">
            Reload Data
          </button>
        </div>
      }
    </div>
  }

  <!-- Router Outlet para child routes -->
  <router-outlet></router-outlet>
</div>`;
}

export function getRoutesTemplate(options: ComponentOptions): string {
  return `import { Routes } from '@angular/router';
import { ${options.className}Component } from './${options.componentName}.component';

// ✨ Rutas funcionales (nuevo estilo de Angular)
export const ${options.componentName.toUpperCase()}_ROUTES: Routes = [
  {
    path: '',
    component: ${options.className}Component,
    children: [
      {
        // ✨ Lazy loading con import dinámico
        path: 'detail/:id',
        loadComponent: () => import('./${options.componentName}-detail/${options.componentName}-detail.component')
          .then(m => m.${options.className}DetailComponent)
      }
    ]
  }
];

// ✨ Function para configurar providers específicos de esta feature
export function provide${options.className}Feature() {
  return [
    // Aquí puedes agregar providers específicos para esta feature
    // provideHttpClient(),
    // provideRouter(${options.componentName.toUpperCase()}_ROUTES),
  ];
}`;
}

export function getDetailComponentTemplate(options: ComponentOptions): string {
  return `import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-${options.selector}-detail',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="${options.componentName}-detail">
      <h3>Detail View</h3>
      <p>Item ID: {{ id() }}</p>
      <button (click)="goBack()" class="back-btn">
        ← Back to List
      </button>
    </div>
  \`,${options.includeStyles ? `\n  styles: [\`
    .${options.componentName}-detail {
      padding: 1rem;
      
      .back-btn {
        padding: 0.5rem 1rem;
        background-color: #6c757d;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        
        &:hover {
          background-color: #545b62;
        }
      }
    }
  \`]` : ''}
})
export class ${options.className}DetailComponent {
  // ✨ Usando input() signal para route params
  id = input.required<string>();
  
  private router = inject(Router);

  goBack() {
    this.router.navigate(['..'], { relativeTo: this.router.routerState.root });
  }
}`;
}

export function getStyleTemplate(options: ComponentOptions): string {
  return `.${options.componentName}-container {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;

  .${options.componentName}-header {
    margin-bottom: 2rem;
    
    h2 {
      color: #333;
      margin-bottom: 0.5rem;
      font-size: 2rem;
    }
    
    p {
      color: #666;
      font-size: 1.1rem;
    }
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    
    p {
      font-size: 1.1rem;
      color: #666;
    }
  }

  .data-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
  }

  .data-card {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #e9ecef;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    p {
      margin: 0 0 0.5rem 0;
      color: #666;
    }

    small {
      color: #888;
      font-size: 0.85rem;
    }
  }

  .empty-state {
    text-align: center;
    padding: 2rem;
    
    p {
      margin-bottom: 1rem;
      color: #666;
      font-size: 1.1rem;
    }
  }

  .reload-btn {
    padding: 0.75rem 1.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
}`;
}
