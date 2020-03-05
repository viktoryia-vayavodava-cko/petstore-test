var Table = require("cli-table"),
    colors = require("colors"),
    jsonReport = require("./reports/mochawesome.json"),
    testSuites = jsonReport.suites.suites;

// Totals
var totalFeatures = [];
var totalScenarios = [];

// Create table
var table = new Table({
    head: [
        "No.".grey,
        "Feature".blue,
        "Tags".yellow,
        "Scenarios".grey,
        "Passed".green,
        "Failed".red
    ]
});

var totalFailed = getReportValues(testSuites);
// Show in the console
console.log(table.toString());
process.exit(totalFailed > 0 ? 1 : 0);

// Get the report values
function getReportValues(suites) {
    var suitesLength = suites.length;
    var i = 0;
    var totalFailed = 0;

    while (i < suitesLength) {
        //feature level
        var featureTitle = suites[i].title;
        var tempTitle = featureTitle.toLowerCase();
        var feature = featureTitle
            .split("@")[0]
            .split(":")[1];

        let tags = featureTitle.split("@")[1];
        if (tags) {
            tags = "@" + tags;
        }

        if (
            tempTitle.includes("feature:") &&
            suites[i].hasSuites &&
            totalFeatures.indexOf(tempTitle) === -1 &&
            !suites[i].hasSkipped
        ) {
            var scenario = suites[i].suites;
            var scenarioLength = suites[i].suites.length;

            var j = 0;
            var totalScenarioPassed = 0;
            var totalScenarioFail = 0;

            while (j < scenarioLength) {
                // Get the scenario titles
                tempTitle = scenario[j].title.toLowerCase();

                if (
                    tempTitle.includes("scenario:") &&
                    totalScenarios.indexOf(tempTitle) === -1 &&
                    !scenario[j].hasSkipped
                ) {

                    if (scenario[j].totalFailures == 0 && scenario[j].totalPasses > 0) {
                        totalScenarioPassed += 1;
                    }

                    if (scenario[j].totalFailures > 0) {
                        totalScenarioFail += 1;
                        totalFailed += 1;
                    }
                }
                j++;
            }

            if (totalScenarioPassed + totalScenarioFail > 0) {
                totalFeatures.push(featureTitle);
                table.push([
                    totalFeatures.length.toString().grey,
                    feature.trim().toString().blue,
                    (tags || "").toString().yellow,
                    (totalScenarioPassed + totalScenarioFail).toString().grey,
                    totalScenarioPassed.toString().green,
                    totalScenarioFail.toString().red
                    //result
                ]);
            }
        }
        i++;
    }

    return totalFailed;
}