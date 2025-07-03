import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { ComponentOptions, ComponentPattern } from './types';
import { GeneratorFactory } from './generators/factory';
import { toPascalCase, toKebabCase } from './utils/string';
import { AngularProjectDetector } from './utils/angular-detector';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('angularPatterns.generateComponent', async (uri: vscode.Uri) => {
    if (!uri) {
      vscode.window.showErrorMessage('Please select a folder to generate the component.');
      return;
    }

    const folderPath = uri.fsPath;

    // � Detectar configuración de Angular
    const angularInfo = AngularProjectDetector.detectAngularProject(folderPath);
    const isAngularProject = AngularProjectDetector.isAngularProject(folderPath);
    
    if (isAngularProject) {
      vscode.window.showInformationMessage(`Angular ${angularInfo.version} detectado - ${angularInfo.useModernRouting ? 'Routing moderno' : 'Routing clásico'}`);
    }

    // �🔥 1. Solicitar el nombre del componente
    const componentName = await vscode.window.showInputBox({
      prompt: 'Enter the component name',
      placeHolder: 'my-component'
    });

    if (!componentName) {
      vscode.window.showErrorMessage('Component name is required.');
      return;
    }

    // 🔥 2. Elegir el patrón
    const pattern = await vscode.window.showQuickPick(
      [ComponentPattern.MVP, ComponentPattern.CLEAN_ARCHITECTURE, ComponentPattern.STANDALONE, ComponentPattern.SMART_COMPONENT, ComponentPattern.DUMB_COMPONENT],
      { placeHolder: 'Select the architecture pattern for this component' }
    );

    if (!pattern) {
      vscode.window.showErrorMessage('No pattern selected. Operation cancelled.');
      return;
    }

    // 🔥 3. Opciones adicionales
    const includeStyles = await vscode.window.showQuickPick(['Yes', 'No'], { placeHolder: 'Include styles?' });
    const includeRouter = await vscode.window.showQuickPick(['Yes', 'No'], { placeHolder: 'Include routing?' });
    
    // 🆕 Nueva opción para módulos (solo si no es standalone o si es proyecto Angular clásico)
    let includeModule = false;
    if (pattern !== ComponentPattern.STANDALONE && isAngularProject && angularInfo.version < 17) {
      const moduleChoice = await vscode.window.showQuickPick(['Yes', 'No'], { placeHolder: 'Include module?' });
      includeModule = moduleChoice === 'Yes';
    }

    try {
      // 🔥 4. Generar los archivos según el patrón
      await generateComponentFiles(
        folderPath, 
        componentName, 
        pattern, 
        includeStyles === 'Yes', 
        includeRouter === 'Yes',
        includeModule,
        angularInfo
      );
      
      vscode.window.showInformationMessage(`Component "${componentName}" generated with ${pattern} pattern in ${folderPath}`);
    } catch (error) {
      vscode.window.showErrorMessage(`Error generating component: ${error}`);
    }
  });

  context.subscriptions.push(disposable);
}

// 🔥 Función para generar archivos de componente
async function generateComponentFiles(
  folderPath: string, 
  componentName: string, 
  pattern: string, 
  includeStyles: boolean, 
  includeRouter: boolean,
  includeModule: boolean,
  angularInfo: { version: number; hasStandaloneApi: boolean; useModernRouting: boolean; }
) {
  const componentDir = path.join(folderPath, componentName);
  
  // Crear directorio del componente
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  const className = toPascalCase(componentName);
  const selector = toKebabCase(componentName);

  // Crear opciones para el generador
  const options: ComponentOptions = {
    componentName,
    className,
    selector,
    includeStyles,
    includeRouter,
    includeModule,
    angularVersion: angularInfo.version,
    useModernRouting: angularInfo.useModernRouting
  };

  // Obtener el generador apropiado y generar archivos
  const generator = GeneratorFactory.getGenerator(pattern);
  await generator.generate(componentDir, options);
}

export function deactivate() {}