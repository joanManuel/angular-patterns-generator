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
}

export interface TemplateGenerator {
  generate(componentDir: string, options: ComponentOptions): Promise<void>;
}

export interface FileTemplate {
  filename: string;
  content: string;
}
