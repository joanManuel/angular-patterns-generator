import * as fs from 'fs';
import * as path from 'path';
import { TemplateGenerator, ComponentOptions } from '../../types';
import { 
  getComponentTemplate, 
  getPresenterTemplate, 
  getModelTemplate, 
  getHtmlTemplate, 
  getStyleTemplate 
} from './templates';

export class MVPGenerator implements TemplateGenerator {
  async generate(componentDir: string, options: ComponentOptions): Promise<void> {
    // Escribir archivos
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
  }
}
