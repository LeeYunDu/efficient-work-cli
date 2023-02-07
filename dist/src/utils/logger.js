"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exit = exports.success = exports.info = exports.error = exports.warn = void 0;
const chalk = require('chalk');
const warn = (message) => console.log(chalk.yellow(message));
exports.warn = warn;
const error = (message) => console.log(chalk.red(message));
exports.error = error;
const info = (message) => console.log(chalk.white(message));
exports.info = info;
const success = (message) => console.log(chalk.green(message));
exports.success = success;
const exit = (error) => {
    if (error && error instanceof Error) {
        console.log(chalk.red(error.message));
    }
    process.exit(-1);
};
exports.exit = exit;
