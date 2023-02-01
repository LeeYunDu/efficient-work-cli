const chalk = require('chalk')
const { execSync } = require('child_process')

exports.warn = message => console.log(chalk.yellow(message))

exports.error = message => console.log(chalk.red(message))

exports.info = message => console.log(chalk.white(message))

exports.success = message => console.log(chalk.green(message))

exports.exit = error => {
  if (error && error instanceof Error) {
    console.log(chalk.red(error.message))
  }
  process.exit(-1)
}

/**
 * 日志
 * @param {*} message 
 */
exports.echo = options => {
  execSync(`echo ${options.title} >> logger.log`)
  execSync(`echo ${options.message} >> logger.log`)
}