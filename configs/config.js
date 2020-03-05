module.exports = getConfig();

function getConfig() {
    const fileName = getConfigFileName();
    console.log("Using configuration " + fileName);
    return require("./" + fileName);
}

function getConfigFileName() {
    const env = process.env.NODE_ENV || "local";
    return env + ".json";
}