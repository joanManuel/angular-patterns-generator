import * as fs from 'fs';
import * as path from 'path';
import { TemplateGenerator, ComponentOptions } from '../../types';
import { BaseGenerator } from '../../generators/base-generator';
import { 
  getComponentTemplate, 
  getServiceTemplate, 
  getHtmlTemplate, 
  getRoutesTemplate, 
  getDetailComponentTemplate, 
  getStyleTemplate 
} from './templates';

export class StandaloneGenerator extends BaseGenerator implements TemplateGenerator {
  protected isStandalonePattern(): boolean {
    return true;
  }

  async generate(componentDir: string, options: ComponentOptions): Promise<void> {
    // Crear directorio para componente detail
    const detailComponentDir = path.join(componentDir, `${options.componentName}-detail`);
    if (!fs.existsSync(detailComponentDir)) {
      fs.mkdirSync(detailComponentDir, { recursive: true });
    }

    // Escribir archivos principales
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

    // Escribir componente detail
    fs.writeFileSync(
      path.join(detailComponentDir, `${options.componentName}-detail.component.ts`), 
      getDetailComponentTemplate(options)
    );

    if (options.includeStyles) {
      fs.writeFileSync(
        path.join(componentDir, `${options.componentName}.component.scss`), 
        getStyleTemplate(options)
      );
    }

    // Generar routing usando la clase base
    this.generateModuleAndRouting(componentDir, options);
  }
}
