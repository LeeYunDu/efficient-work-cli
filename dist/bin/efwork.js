#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('ts-node/register');
const commander_1 = require("commander");
// const { program } = require('commander')
// const { genStart } = require('./efwork-g.ts')
// import {program}
const efwork_g_1 = require("./efwork-g");
// genrator
commander_1.program
    .command('g <type> [path]')
    .description('生成type对应到到模版代码到指定目录')
    .option('-f --force', '如果存在输入的项目目录，强制删除项目目录')
    .action((type, path, cmd) => {
    var _a;
    (0, efwork_g_1.genStart)({ type, path, force: (_a = cmd.force) !== null && _a !== void 0 ? _a : false });
});
commander_1.program.parse(process.argv);
