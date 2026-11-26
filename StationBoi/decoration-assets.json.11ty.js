
const fs = require("node:fs");
const path = require("node:path");

function findImages(directory, base = "") {
    const files = [];

    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const fullPath = path.join(directory, entry.name);
        const relativePath = path.join(base, entry.name);

        if (entry.isDirectory()) {
            if (entry.name === "backgrounds") continue;

            files.push(
                ...findImages(fullPath, relativePath)
            );
        } else if (/\.(png|jpe?g|webp|gif|avif)$/i.test(entry.name)) {
            files.push(
                "/assets/" + relativePath.replace(/\\/g, "/")
            );
        }
    }

    return files;
}

module.exports = class {
    data() {
        return {
            permalink: "/decoration-assets.json",
            eleventyExcludeFromCollections: true
        };
    }

    render() {
        const assetsDirectory = path.join(process.cwd(), "assets");
        const images = findImages(assetsDirectory);

        return JSON.stringify(images, null, 2);
    }
};
