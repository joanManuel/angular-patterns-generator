export function toPascalCase(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
            .replace(/^[a-z]/, (g) => g.toUpperCase());
}

export function toKebabCase(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
}

export function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}
