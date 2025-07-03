import * as fs from 'fs';
import * as path from 'path';
import { TemplateGenerator, ComponentOptions } from '../../types';
import { BaseGenerator } from '../../generators/base-generator';
import { 
  getComponentTemplate, 
  getServiceTemplate, 
  getHtmlTemplate, 
  getStyleTemplate 
} from './templates';

export class SmartComponentGenerator extends BaseGenerator implements TemplateGenerator {
  protected isStandalonePattern(): boolean {
    return false; // Smart components pueden usar módulos
  }

  async generate(componentDir: string, options: ComponentOptions): Promise<void> {
    // Escribir archivos
    fs.writeFileSync(
      path.join(componentDir, `${options.componentName}.component.ts`), 
      getComponentTemplate(options)
    );
    
    fs.writeFileSync(
      path.join(componentDir, `${options.componentName}.service.ts`), 
      getServiceTemplate(options)
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
