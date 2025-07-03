import * as fs from 'fs';
import * as path from 'path';
import { AngularProjectInfo } from '../types';

export class AngularProjectDetector {
  /**
   * Detecta la versión de Angular y configuración del proyecto
   */
  static detectAngularProject(workspacePath: string): AngularProjectInfo {
    const defaultInfo: AngularProjectInfo = {
      version: 18, // Versión por defecto
      hasStandaloneApi: true,
      useModernRouting: true
    };

    try {
      // Buscar package.json en el workspace o directorios padres
      const packageJsonPath = this.findPackageJson(workspacePath);
      if (!packageJsonPath) {
        console.log('No se encontró package.json, usando configuración por defecto');
        return defaultInfo;
      }

      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const angularVersion = this.extractAngularVersion(packageJson);

      return {
        version: angularVersion,
        hasStandaloneApi: angularVersion >= 14,
        useModernRouting: angularVersion >= 19
      };
    } catch (error) {
      console.log('Error detectando proyecto Angular:', error);
      return defaultInfo;
    }
  }

  /**
   * Busca package.json en el directorio actual o directorios padres
   */
  private static findPackageJson(startPath: string): string | null {
    let currentPath = startPath;
    
    while (currentPath !== path.dirname(currentPath)) {
      const packageJsonPath = path.join(currentPath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        return packageJsonPath;
      }
      currentPath = path.dirname(currentPath);
    }
    
    return null;
  }

  /**
   * Extrae la versión de Angular del package.json
   */
  private static extractAngularVersion(packageJson: any): number {
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    // Buscar @angular/core
    const angularCore = dependencies['@angular/core'];
    if (angularCore) {
      const versionMatch = angularCore.match(/(\d+)/);
      if (versionMatch) {
        return parseInt(versionMatch[1], 10);
      }
    }

    // Buscar @angular/cli como alternativa
    const angularCli = dependencies['@angular/cli'];
    if (angularCli) {
      const versionMatch = angularCli.match(/(\d+)/);
      if (versionMatch) {
        return parseInt(versionMatch[1], 10);
      }
    }

    // Si no se encuentra, asumir versión moderna
    return 18;
  }

  /**
   * Verifica si el proyecto usa standalone components por defecto
   */
  static hasStandaloneBootstrap(workspacePath: string): boolean {
    try {
      const mainTsPath = path.join(workspacePath, 'src', 'main.ts');
      if (fs.existsSync(mainTsPath)) {
        const mainContent = fs.readFileSync(mainTsPath, 'utf8');
        return mainContent.includes('bootstrapApplication');
      }
    } catch (error) {
      console.log('Error verificando bootstrap:', error);
    }
    return false;
  }

  /**
   * Verifica si existe angular.json
   */
  static isAngularProject(workspacePath: string): boolean {
    const angularJsonPath = path.join(workspacePath, 'angular.json');
    return fs.existsSync(angularJsonPath);
  }
}
