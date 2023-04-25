"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postParams = exports.getParams = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pizzip_1 = __importDefault(require("pizzip"));
const docxtemplater_1 = __importDefault(require("docxtemplater"));
const inspect_module_1 = __importDefault(require("docxtemplater/js/inspect-module"));
const FileModel_1 = require("../models/FileModel");
const getParams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: "Not Found resource" });
        }
        const doc = yield FileModel_1.FileModel.findOne({ _id: id });
        if (!doc) {
            return res.status(404).json({ message: "Not Found resource" });
        }
        const template = fs_1.default.readFileSync(path_1.default.join(`${process.cwd()}`, "files", `../${doc.url}`), "binary");
        const zip = new pizzip_1.default(template);
        const iModule = new inspect_module_1.default();
        const docxtemplater = new docxtemplater_1.default(zip, {
            paragraphLoop: true,
            linebreaks: true,
            modules: [iModule],
        });
        const tags = iModule.getAllTags();
        return res
            .status(200)
            .json({ message: "Get params success!", data: tags });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getParams = getParams;
const postParams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, params } = req.body;
        const file = yield FileModel_1.FileModel.findOne({ _id: id });
        if (!file) {
            return res.status(404).json({ message: "Not Found resource" });
        }
        const template = fs_1.default.readFileSync(path_1.default.join(`${process.cwd()}`, "files", `../${file.url}`), "binary");
        const zip = new pizzip_1.default(template);
        const iModule = new inspect_module_1.default();
        const docxtemplater = new docxtemplater_1.default(zip, {
            paragraphLoop: true,
            linebreaks: true,
            modules: [iModule],
        });
        docxtemplater.render(params);
        const buf = docxtemplater.getZip().generate({
            type: "nodebuffer",
            // compression: DEFLATE adds a compression step.
            // For a 50MB output document, expect 500ms additional CPU time
            compression: "DEFLATE",
        });
        const outputPath = path_1.default.join(`${process.cwd()}`, "dist/outputs", `${file.name}`);
        console.log(outputPath);
        fs_1.default.writeFileSync(outputPath, buf);
        return res.download(outputPath);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.postParams = postParams;
