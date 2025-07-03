import * as assert from 'assert';
import * as vscode from 'vscode';
import { GeneratorFactory } from '../generators/factory';
import { ComponentPattern } from '../types';

suite('Angular Patterns Generator Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('GeneratorFactory should return correct generator for MVP pattern', () => {
		const generator = GeneratorFactory.getGenerator(ComponentPattern.MVP);
		assert.ok(generator, 'Generator should be defined');
		assert.strictEqual(generator.constructor.name, 'MvpGenerator');
	});

	test('GeneratorFactory should return correct generator for Clean Architecture pattern', () => {
		const generator = GeneratorFactory.getGenerator(ComponentPattern.CLEAN_ARCHITECTURE);
		assert.ok(generator, 'Generator should be defined');
		assert.strictEqual(generator.constructor.name, 'CleanArchitectureGenerator');
	});

	test('GeneratorFactory should return correct generator for Standalone pattern', () => {
		const generator = GeneratorFactory.getGenerator(ComponentPattern.STANDALONE);
		assert.ok(generator, 'Generator should be defined');
		assert.strictEqual(generator.constructor.name, 'StandaloneGenerator');
	});

	test('GeneratorFactory should return correct generator for Smart Component pattern', () => {
		const generator = GeneratorFactory.getGenerator(ComponentPattern.SMART_COMPONENT);
		assert.ok(generator, 'Generator should be defined');
		assert.strictEqual(generator.constructor.name, 'SmartComponentGenerator');
	});

	test('GeneratorFactory should return correct generator for Dumb Component pattern', () => {
		const generator = GeneratorFactory.getGenerator(ComponentPattern.DUMB_COMPONENT);
		assert.ok(generator, 'Generator should be defined');
		assert.strictEqual(generator.constructor.name, 'DumbComponentGenerator');
	});

	test('String utils should properly convert to PascalCase', () => {
		const { toPascalCase } = require('../utils/string');
		assert.strictEqual(toPascalCase('my-component'), 'MyComponent');
		assert.strictEqual(toPascalCase('user-profile'), 'UserProfile');
		assert.strictEqual(toPascalCase('simple'), 'Simple');
	});

	test('String utils should properly convert to kebab-case', () => {
		const { toKebabCase } = require('../utils/string');
		assert.strictEqual(toKebabCase('MyComponent'), 'my-component');
		assert.strictEqual(toKebabCase('UserProfile'), 'user-profile');
		assert.strictEqual(toKebabCase('Simple'), 'simple');
	});
});
