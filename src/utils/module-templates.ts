import { ComponentOptions } from '../types';

export function generateModuleTemplate(options: ComponentOptions): string {
  return `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
${options.includeRouter ? `import { ${options.className}RoutingModule } from './${options.componentName}-routing.module';` : ''}
import { ${options.className}Component } from './${options.componentName}.component';

@NgModule({
  declarations: [
    ${options.className}Component
  ],
  imports: [
    CommonModule${options.includeRouter ? `,
    ${options.className}RoutingModule` : ''}
  ]${!options.includeRouter ? `,
  exports: [
    ${options.className}Component
  ]` : ''}
})
export class ${options.className}Module { }
`;
}

export function generateRoutingModuleTemplate(options: ComponentOptions): string {
  if (options.useModernRouting && options.angularVersion >= 19) {
    return generateModernRoutingModule(options);
  } else {
    return generateClassicRoutingModule(options);
  }
}

function generateModernRoutingModule(options: ComponentOptions): string {
  return `import { Routes } from '@angular/router';
import { ${options.className}Component } from './${options.componentName}.component';

export const ${options.componentName.toUpperCase().replace(/-/g, '_')}_ROUTES: Routes = [
  {
    path: '',
    component: ${options.className}Component,
    title: '${options.className}'
  }
];
`;
}

function generateClassicRoutingModule(options: ComponentOptions): string {
  return `import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ${options.className}Component } from './${options.componentName}.component';

const routes: Routes = [
  {
    path: '',
    component: ${options.className}Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ${options.className}RoutingModule { }
`;
}

export function generateStandaloneRoutesTemplate(options: ComponentOptions): string {
  return `import { Routes } from '@angular/router';
import { ${options.className}Component } from './${options.componentName}.component';

export const routes: Routes = [
  {
    path: '',
    component: ${options.className}Component,
    title: '${options.className}',
    canActivate: [], // Add guards here if needed
    canDeactivate: [], // Add guards here if needed
  }
];
`;
}
