

module.exports = getConfig();

function getConfig() {
    const fileName = getConfigFileName();
    console.log("*** Using this configuration *** " + fileName);
    return require("./" + fileName);
}

function getConfigFileName() {
    const env = process.env.NODE_ENV || "qa";
    return env + ".json";
}

