import * as fs from 'fs';
import * as path from 'path';
import { ComponentOptions } from '../types';
import { 
  generateModuleTemplate, 
  generateRoutingModuleTemplate, 
  generateStandaloneRoutesTemplate 
} from '../utils/module-templates';

export abstract class BaseGenerator {
  /**
   * Genera archivos de módulo y routing cuando sea necesario
   */
  protected generateModuleAndRouting(componentDir: string, options: ComponentOptions): void {
    // Generar módulo si se solicita y no es standalone
    if (options.includeModule && !this.isStandalonePattern()) {
      fs.writeFileSync(
        path.join(componentDir, `${options.componentName}.module.ts`), 
        generateModuleTemplate(options)
      );
    }

    // Generar routing si se solicita
    if (options.includeRouter) {
      if (this.isStandalonePattern() || (options.useModernRouting && options.angularVersion >= 19)) {
        // Routing moderno para standalone o Angular 19+
        fs.writeFileSync(
          path.join(componentDir, `${options.componentName}.routes.ts`), 
          generateStandaloneRoutesTemplate(options)
        );
      } else {
        // Routing clásico con módulos
        fs.writeFileSync(
          path.join(componentDir, `${options.componentName}-routing.module.ts`), 
          generateRoutingModuleTemplate(options)
        );
      }
    }
  }

  /**
   * Determina si el patrón actual es standalone
   */
  protected abstract isStandalonePattern(): boolean;
}
