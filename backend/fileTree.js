const fs = require("fs");
const path = require("path");

const IGNORED_FOLDERS = new Set([
    "node_modules",
    ".git",
    "dist",
    "build"
]);


function readDirectoryTree(directoryPath) {
    const stats = fs.statSync(directoryPath);

    if (stats.isFile()) {
        return {
            type: "file",
            name: path.basename(directoryPath),
            path: directoryPath
        };
    }

    const folderName = path.basename(directoryPath);

    if (IGNORED_FOLDERS.has(folderName)) {
        return null;
    }

    const children = fs.readdirSync(directoryPath)
    .map(child => {
        const fullPath = path.join(directoryPath, child);
        return readDirectoryTree(fullPath);
    })
    .filter(Boolean);

    return {
        type: "directory",
        name: folderName,
        path: directoryPath,
        children
    }

}

const projectPath = process.argv[2];

if (!projectPath) {
    console.error("PLease provide a project path");
    process.exit(1);
}

const tree = readDirectoryTree(projectPath);
console.log(JSON.stringify(tree, null ,2));