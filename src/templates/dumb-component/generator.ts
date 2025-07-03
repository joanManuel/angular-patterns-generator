import * as fs from 'fs';
import * as path from 'path';
import { TemplateGenerator, ComponentOptions } from '../../types';
import { 
  getComponentTemplate, 
  getHtmlTemplate, 
  getStyleTemplate 
} from './templates';

export class DumbComponentGenerator implements TemplateGenerator {
  async generate(componentDir: string, options: ComponentOptions): Promise<void> {
    // Escribir archivos
    fs.writeFileSync(
      path.join(componentDir, `${options.componentName}.component.ts`), 
      getComponentTemplate(options)
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
  }
}
