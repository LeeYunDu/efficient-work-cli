#!/usr/bin/env node
"use strict";
require('ts-node/register');
// import { program } from 'commander'
const { program } = require('commander');
const { genStart } = require('./efwork-g.ts');
// genrator
program
    .command('g <type> [path]')
    .description('生成type对应到到模版代码到指定目录')
    .option('-f --force', '如果存在输入的项目目录，强制删除项目目录')
    .action((type, path, cmd) => {
    var _a;
    genStart({ type, path, force: (_a = cmd.force) !== null && _a !== void 0 ? _a : false });
});
program.parse(process.argv);
