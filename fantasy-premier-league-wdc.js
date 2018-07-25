(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var team_cols = [{
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
        var teamTableSchema = {
            id: "teams",
            alias: "Teams",
            columns: team_cols
        };

        var event_cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "finished",
            dataType: tableau.dataTypeEnum.bool
        }];
        var eventTableSchema = {
            id: "events",
            alias: "Events",
            columns: event_cols
        };

        schemaCallback([teamTableSchema, eventTableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
        $.getJSON("https://fantasy.premierleague.com/drf/bootstrap-static", function(response) {
            var teams = response.teams,
                events = response.events,
                tableData = [];

            var i = 0;

            if (table.tableInfo.id == "teams") {
                for (i = 0, len = teams.length; i < len; i++) {
                    tableData.push({
                        "id": teams[i].id,
                        "code": teams[i].code,
                        "name": teams[i].name,
                        "short_name": teams[i].short_name
                    });
                }
            }

            if (table.tableInfo.id == "events") {
                for (i = 0, len = events.length; i < len; i++) {
                    tableData.push({
                        "id": events[i].id,
                        "name": events[i].name,
                        "finished": events[i].finished
                    });
                }
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
