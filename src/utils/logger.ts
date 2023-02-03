const chalk = require('chalk')
export const warn = (message: any) => console.log(chalk.yellow(message))
export const error = (message: any) => console.log(chalk.red(message))
export const info = (message: any) => console.log(chalk.white(message))
export const success = (message: any) => console.log(chalk.green(message))
export const exit = (error: any) => {
  if (error && error instanceof Error) {
    console.log(chalk.red(error.message))
  }
  process.exit(-1)
}