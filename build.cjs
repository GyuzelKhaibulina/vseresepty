require("esbuild").build({
    entryPoints: ["index.js"],
    outfile: "public/server.js",
    bundle: true,
    platform: "node",
})
    .then(() => console.log("⚡ Done"))
    .catch(() => process.exit(1));