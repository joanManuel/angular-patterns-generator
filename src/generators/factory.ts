import { TemplateGenerator, ComponentPattern } from '../types';
import { MVPGenerator } from '../templates/mvp/generator';
import { CleanArchitectureGenerator } from '../templates/clean-architecture/generator';
import { StandaloneGenerator } from '../templates/standalone/generator';
import { SmartComponentGenerator } from '../templates/smart-component/generator';
import { DumbComponentGenerator } from '../templates/dumb-component/generator';

export class GeneratorFactory {
  static getGenerator(pattern: string): TemplateGenerator {
    switch (pattern) {
      case ComponentPattern.MVP:
        return new MVPGenerator();
      case ComponentPattern.CLEAN_ARCHITECTURE:
        return new CleanArchitectureGenerator();
      case ComponentPattern.STANDALONE:
        return new StandaloneGenerator();
      case ComponentPattern.SMART_COMPONENT:
        return new SmartComponentGenerator();
      case ComponentPattern.DUMB_COMPONENT:
        return new DumbComponentGenerator();
      default:
        throw new Error(`Unknown pattern: ${pattern}`);
    }
  }
}
