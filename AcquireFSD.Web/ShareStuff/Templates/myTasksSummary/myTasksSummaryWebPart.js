var agfo = window.agfo || {};

function giveMeSearchResults() {
    debugger
    $.ajax({
        url: "http://sps/_api/search/query?querytext='ContentTypeId:0x0108*'&selectproperties='Title,PercentComplete'",
        type: "GET",
        headers: {
            "Accept": "application/json;odata=verbose",
        },

        success: function (data) {
            debugger
            var compliant = data.d;
            count = compliant.query.PrimaryQueryResult.RelevantResults.TotalRows;

            compliant.query.PrimaryQueryResult.RelevantResults.Table.Rows.forEach(function (element) {
                debugger
                console.log(element);
            });
        },

        error: function (data) {
            debugger
            alert("Error");
        }
    });
}
"use strict"
agfo.myTasksSummaryWebPart = agfo.myTasksSummaryWebPart || {};
agfo.myTasksSummaryWebPart.prepareAndShowData = function () {

    showModalEditDialog = function () {
        var element = document.createElement("div")

        element.innerHTML = document.getElementById('myTaskListTable').innerHTML;
        SP.UI.ModalDialog.showModalDialog({
            html: element,
            title: "Meine Aufgaben"
        });

        document.getElementById('dialogTitleSpan').innerHTML = document.getElementById('myTaskListDialogTitle').innerHTML
    }

    onQueryFailed = function (sender, args) {
        alert('Request failed. ' + args.get_message() +
            '\n' + args.get_stackTrace());
    };

    execGetAndShowMyTasksSummary = function () {
        debugger;
        var d = $.Deferred();

        SP.SOD.executeFunc("SP.Search.js", "Microsoft.SharePoint.Client.Search.Query.KeywordQuery", function () {
            var clientContext = SP.ClientContext.get_current();
            var keywordQuery = new Microsoft.SharePoint.Client.Search.Query.KeywordQuery(clientContext);
            keywordQuery.set_trimDuplicates(false);
            keywordQuery.set_queryText("ContentTypeId:0x0108*");
            var properties = keywordQuery.get_selectProperties();

            properties.add('PercentComplete');
            properties.add('DueDate');

            var searchExecutor = new Microsoft.SharePoint.Client.Search.Query.SearchExecutor(clientContext);
            results = searchExecutor.executeQuery(keywordQuery);
            clientContext.executeQueryAsync(
                function () {
                    debugger
                    d.resolve(results);
                    var x = results;
                    var z = x.m_value.ResultTables
                    var count = z["0"].RowCount
                    document.getElementById("controlCounterFigureTasks").innerHTML = count;

                    $.each(results.m_value.ResultTables[0].ResultRows, function () {
                        debugger

                        var tr = document.createElement("tr");
                        var td = document.createElement("td");
                        td.style.verticalAlign = "top";
                        td.innerHTML = this.PercentComplete * 100 + "%";
                        tr.appendChild(td);

                        td = document.createElement("td");
                        td.style.paddingLeft = "20px";
                        td.style.verticalAlign = "top";
                        td.setAttribute("colspan", 2);
                        var node = document.createElement("span")
                        node.innerHTML = "<b>" + this.Title + "</b>"
                        td.appendChild(node);

                        node = document.createElement("br")
                        td.appendChild(node);

                        node = document.createElement("span")
                        node.innerHTML = "Fällig am: " + this.DueDate.format("dd.MM.yyyy") + "          Project Name";
                        td.appendChild(node);

                        tr.appendChild(td);

                        document.getElementById("myTaskSummaryTableTBody").appendChild(tr)

                    });

                },
                function (err) {
                    d.reject(null);
                }
            );
        });
    }

    init = function () {
        try {
            SP.SOD.executeFunc('SP.js', 'SP.ClientContext', execGetAndShowMyTasksSummary);
            document.getElementById("controlCounterImageTasks").onclick = function () {
                showModalEditDialog();
            }
        } catch (err) {
            alert("myTasksSummaryWebPart. Something went wrong, exception: " + err)
        }
    }();
}();