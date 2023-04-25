import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import InspectModule from "docxtemplater/js/inspect-module";

import { FileModel } from "../models/FileModel";

export const getParams = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: "Not Found resource" });
        }
        const doc = await FileModel.findOne({ _id: id });
        if (!doc) {
            return res.status(404).json({ message: "Not Found resource" });
        }

        const template = fs.readFileSync(
            path.join(`${process.cwd()}`, "files", `../${doc.url}`),
            "binary"
        );
        const zip = new PizZip(template);
        const iModule = new InspectModule();
        const docxtemplater = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            modules: [iModule],
        });
        const tags = iModule.getAllTags();
        return res
            .status(200)
            .json({ message: "Get params success!", data: tags });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const postParams = async (req: Request, res: Response) => {
    try {
        const { id, params } = req.body;

        const file = await FileModel.findOne({ _id: id });
        if (!file) {
            return res.status(404).json({ message: "Not Found resource" });
        }

        const template = fs.readFileSync(
            path.join(`${process.cwd()}`, "files", `../${file.url}`),
            "binary"
        );
        const zip = new PizZip(template);
        const iModule = new InspectModule();
        const docxtemplater = new Docxtemplater(zip, {
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
        const outputPath = path.join(
            `${process.cwd()}`,
            "dist/outputs",
            `${file.name}`
        );
        console.log(outputPath);
        fs.writeFileSync(outputPath, buf);
        return res.download(outputPath);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
