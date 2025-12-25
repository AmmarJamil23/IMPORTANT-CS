const fs = require("fs");
const path = require("path");

const SUPPORTED_EXTENSIONS = new Set([
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".json"
]);

function readFileSafely(filePath) {
    const extension = path.extname(filename);

    if (!SUPPORTED_EXTENSIONS.has(extension)) {
        return null;
    }

    try {
        const content = fs.readFileSync(filePath, "utf-8");

        return {
            path: filePath,
            extension,
            content
        };

    } catch (error) {
        return {
            path: filePath,
            extension,
            error: error.message
        };
    }
}