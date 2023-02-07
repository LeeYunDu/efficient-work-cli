"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGenretor = void 0;
const init_1 = require("../template/listModel/init");
/**
 *
 * @param option
 */
function useGenretor(option) {
    let { type, path, force } = option;
    switch (type) {
        case 'listModel':
            (0, init_1.useInitListModel)(path);
            break;
    }
}
exports.useGenretor = useGenretor;
