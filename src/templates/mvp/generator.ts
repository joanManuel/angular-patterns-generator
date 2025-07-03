import * as fs from 'fs';
import * as path from 'path';
import { TemplateGenerator, ComponentOptions } from '../../types';
import { BaseGenerator } from '../../generators/base-generator';
import { 
  getComponentTemplate, 
  getPresenterTemplate, 
  getModelTemplate, 
  getHtmlTemplate, 
  getStyleTemplate 
} from './templates';

export class MVPGenerator extends BaseGenerator implements TemplateGenerator {
  protected isStandalonePattern(): boolean {
    return false;
  }

  async generate(componentDir: string, options: ComponentOptions): Promise<void> {
    // Escribir archivos principales del patrón MVP
    fs.writeFileSync(
      path.join(componentDir, `${options.componentName}.component.ts`), 
      getComponentTemplate(options)
    );
    
    fs.writeFileSync(
      path.join(componentDir, `${options.componentName}.presenter.ts`), 
      getPresenterTemplate(options)
    );
    
    fs.writeFileSync(
      path.join(componentDir, `${options.componentName}.model.ts`), 
      getModelTemplate(options)
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
