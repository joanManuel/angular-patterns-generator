export enum ComponentPattern {
  MVP = 'MVP',
  CLEAN_ARCHITECTURE = 'Clean Architecture',
  STANDALONE = 'Standalone',
  SMART_COMPONENT = 'Smart Component',
  DUMB_COMPONENT = 'Dumb Component'
}

export interface ComponentOptions {
  componentName: string;
  className: string;
  selector: string;
  includeStyles: boolean;
  includeRouter: boolean;
  includeModule: boolean;
  angularVersion: number;
  useModernRouting: boolean;
}

export interface TemplateGenerator {
  generate(componentDir: string, options: ComponentOptions): Promise<void>;
}

export interface FileTemplate {
  filename: string;
  content: string;
}

export interface AngularProjectInfo {
  version: number;
  hasStandaloneApi: boolean;
  useModernRouting: boolean;
}
