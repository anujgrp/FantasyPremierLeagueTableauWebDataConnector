(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "code",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "short_name",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "teams",
            alias: "Team information for the 2018/19 Premier League season",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
        $.getJSON("https://fantasy.premierleague.com/drf/teams/", function(response) {
            var tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = response.length; i < len; i++) {
                tableData.push({
                    "id": response[i].id,
                    "code": response[i].code,
                    "name": response[i].name,
                    "short_name": response[i].short_name
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Fantasy Premier League Data";
        tableau.submit();
    });
});
