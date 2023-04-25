"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeAccents(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}
exports.default = removeAccents;
