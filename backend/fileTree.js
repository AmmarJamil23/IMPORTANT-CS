const fs = require("fs");
const path = require("path");

const IGNORED_FOLDERS = new Set([
    "node_modules",
    ".git",
    "dist",
    "build"
]);