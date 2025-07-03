import * as fs from 'fs';
import * as path from 'path';
import { TemplateGenerator, ComponentOptions } from '../../types';
import { BaseGenerator } from '../../generators/base-generator';
import { 
  getComponentTemplate, 
  getUseCaseTemplate, 
  getRepositoryTemplate, 
  getHtmlTemplate, 
  getStyleTemplate 
} from './templates';

export class CleanArchitectureGenerator extends BaseGenerator implements TemplateGenerator {
  protected isStandalonePattern(): boolean {
    return false; // Clean Architecture puede usar módulos
  }

  async generate(componentDir: string, options: ComponentOptions): Promise<void> {
    // Crear directorios
    const useCaseDir = path.join(componentDir, 'use-cases');
    const repositoryDir = path.join(componentDir, 'repositories');
    
    if (!fs.existsSync(useCaseDir)) {
      fs.mkdirSync(useCaseDir, { recursive: true });
    }
    
    if (!fs.existsSync(repositoryDir)) {
      fs.mkdirSync(repositoryDir, { recursive: true });
    }

    // Escribir archivos
    fs.writeFileSync(
      path.join(componentDir, `${options.componentName}.component.ts`), 
      getComponentTemplate(options)
    );
    
    fs.writeFileSync(
      path.join(useCaseDir, `${options.componentName}.use-case.ts`), 
      getUseCaseTemplate(options)
    );
    
    fs.writeFileSync(
      path.join(repositoryDir, `${options.componentName}.repository.ts`), 
      getRepositoryTemplate(options)
    );
    
    fs.writeFileSync(
      path.join(componentDir, `${options.componentName}.component.html`), 
      getHtmlTemplate(options)
    );

    if (options.includeStyles) {
      fs.writeFileSync(
        path.join(componentDir, `${options.componentName}.component.scss`), 
        getStyleTemplate(options)
      );
    }

    // Generar módulo y routing usando la clase base
    this.generateModuleAndRouting(componentDir, options);
  }
}
