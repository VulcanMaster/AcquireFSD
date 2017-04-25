var agfo = window.agfo || {};

"use strict"
agfo.documentsTreeWebPart = agfo.documentsTreeWebPart || {};
agfo.documentsTreeWebPart.prepareTreeAndShow = function () {

    var selectedValue_temp;
    var jstreeMostFirstRun = false;

    setSessionStorageString = function (itemNameInSessionStorage, str) {
        try {
            window.sessionStorage.setItem(itemNameInSessionStorage, str);
            return str;
        }
        catch (err) {
            return undefined
        }
    }

    getSessionStorageString = function (itemNameInSessionStorage) {
        try {
            var str = sessionStorage.getItem(itemNameInSessionStorage);
            if (str === "null") return null;
            if (str === "undefined") return undefined;
            else {
                return str
            }
        }
        catch (err) {
            return undefined
        }
    }

    setSessionStorageItem = function (itemNameInSessionStorage, item) {
        try {
            window.sessionStorage.setItem(itemNameInSessionStorage, JSON.stringify(item));
            return getSessionStorageItem(itemNameInSessionStorage);
        }
        catch (err) {
            return undefined
        }
    }

    getSessionStorageItem = function (itemNameInSessionStorage) {
        try {
            var item = JSON.parse(sessionStorage.getItem(itemNameInSessionStorage));
            if (item === "null") return null
            else {
                return JSON.parse(sessionStorage.getItem(itemNameInSessionStorage));
            }
        }
        catch (err) {
            return undefined
        }
    }

    detectedSelectedValue = function () {
        selectedValue_temp = getSessionStorageItem("documentsTreeWebPartSelectedValue_temp")
        if ((selectedValue_temp !== null) && (selectedValue_temp !== undefined)) {
            setSessionStorageItem("documentsTreeWebPartSelectedValue_temp", null)
            return true;
        } else return false;
    }

    addEvents = function () {
        $(document).on('click', '.jstree-anchor', function () {
            var urlParam = "?RootFolder=" + $(this).parent().attr("id");
            selectedValue_temp = setSessionStorageItem("documentsTreeWebPartSelectedValue_temp", $(this).parent().attr("id"));
            window.location = _spPageContextInfo.siteAbsoluteUrl + "/Shared%20Documents/Forms/AllItems.aspx" + urlParam;
        });
    }

    onQueryFailed = function (sender, args) {
        alert('Request failed. ' + args.get_message() +
            '\n' + args.get_stackTrace());
    };


    showTree = function () {
        $('#jstreeDocumentsLibrary').jstree();
        $('#jstreeDocumentsLibrary').jstree("deselect_all");
        $('#jstreeDocumentsLibrary').jstree('open_all');

        if (detectedSelectedValue()) {
            $('#jstreeDocumentsLibrary').jstree(true).select_node(selectedValue_temp);
        }

        addEvents();
    }

    collapseTree = function () {
        $('#jstreeDocumentsLibrary').jstree("close_all");
    }

    buildTreeMarkup = function (arr) {
        var root;
        var textnode;
        var node_ul;
        var node_li;
        var focusntnode;

        addItemToTree = function (element) {
            node_ul = document.createElement("ul");
            node_li = document.createElement("li");

            node_li.setAttribute("FileDirRef", element.FileDirRef);
            node_li.setAttribute("FileLeafRef", element.FileLeafRef);
            node_li.setAttribute("FileRef", element.FileRef);
            node_li.setAttribute("id", element.FileRef);

            textnode = document.createTextNode(element.FileLeafRef);
            node_li.appendChild(textnode);
            node_ul.appendChild(node_li);
            focusnode = document.getElementById(element.FileDirRef);
            focusnode.appendChild(node_ul);
        }

        var divcontainer = document.getElementById("jstreeDocumentsLibrary");
        divcontainer.innerHTML = "";

        node_ul = document.createElement("ul");
        node_ul.setAttribute("id", "main_node_ul");;
        divcontainer.appendChild(node_ul);

        arr.forEach(function (element) {
            switch (element.level) {
                case 1:
                    node_li = document.createElement("li");
                    node_li.setAttribute("FileDirRef", element.FileDirRef);
                    node_li.setAttribute("FileLeafRef", element.FileLeafRef);
                    node_li.setAttribute("FileRef", element.FileRef);
                    node_li.setAttribute("id", element.FileRef);

                    textnode = document.createTextNode(element.FileLeafRef);
                    node_li.appendChild(textnode);

                    focusnode = document.getElementById("main_node_ul");
                    focusnode.appendChild(node_li);
                    break;
                case 2: element.level = 2;
                    addItemToTree(element)
                    break;
                case 3: element.level = 3;
                    addItemToTree(element)
                    break;
                default: ;
            }
        });

        setSessionStorageString("jstreeDocumentsLibraryExtraMarkup", document.getElementById("jstreeDocumentsLibrary").innerHTML) // !!!
        if (jstreeMostFirstRun) {
            jstreeMostFirstRun = false;
            showTree();
        }
    }

    succeededFolderList = function (sender, args) {
        var arr = new Array();

        var folderEnumerator = this.allItems.getEnumerator();
        var x = 0;
        while (folderEnumerator.moveNext()) {
            var currentItem = folderEnumerator.get_current();

            var container = new Object();
            container.FileDirRef = currentItem.get_item("FileDirRef");
            container.FileLeafRef = currentItem.get_item("FileLeafRef");
            container.FileRef = currentItem.get_item("FileRef");
            arr.push(container);
        }
        arr.forEach(function (element) {
            var sitecounterslashes = _spPageContextInfo.webServerRelativeUrl.split("/").length - 1;
            if (sitecounterslashes > 1) { sitecounterslashes++; }
            var foldercounterslashes = element.FileRef.split("/").length - 1;
            var counterslashes = foldercounterslashes - sitecounterslashes;
            switch (counterslashes) {
                case 1: element.level = 1;
                    break;
                case 2: element.level = 2;
                    break;
                case 3: element.level = 3;
                    break;
                default: element.level = 66;
            }
        });

        var orderedByLevelArr = [];

        var popElementsWithLevel = 1;
        while ((popElementsWithLevel < 4)) {
            arr.forEach(function (element) {
                if (element.level === popElementsWithLevel) {
                    orderedByLevelArr.push(element);
                }
            });
            popElementsWithLevel++;
        }


        if (jstreeMostFirstRun) {
            buildTreeMarkup(orderedByLevelArr);
            jstreeMostFirstRun = false;
        }
    };

    retrieveFolderList = function () {
        var clientContext = new SP.ClientContext();
        this.oWebsite = clientContext.get_web();

        this.oList = clientContext.get_web().get_lists().getByTitle('Documents');
        var query = new SP.CamlQuery();
        query.set_viewXml('<View Scope="RecursiveAll"><Query><Where><Eq><FieldRef Name="FSObjType" /><Value Type="Integer">1</Value></Eq></Where><OrderBy><FieldRef Name="LinkFilenameNoMenu" Descending="True"></FieldRef></OrderBy></Query></View>');
        this.allItems = this.oList.getItems(query);

        clientContext.load(this.oWebsite);
        clientContext.load(this.oList);
        clientContext.load(this.allItems);

        clientContext.executeQueryAsync(
            Function.createDelegate(this, succeededFolderList),
            Function.createDelegate(this, onQueryFailed)
        );
    };

    execTreeWebPartOperations = function () {
        try {
            var superExtraMarkup = getSessionStorageString("jstreeDocumentsLibraryExtraMarkup");
            if ((superExtraMarkup === null) || (superExtraMarkup === undefined)) {
                jstreeMostFirstRun = setSessionStorageItem("jstreeMostFirstRun", true);
            }
            else {
                document.getElementById("jstreeDocumentsLibrary").innerHTML = superExtraMarkup;
                showTree();
                setSessionStorageString("jstreeDocumentsLibraryExtraMarkup", null);
            }
        } catch (err) {
            jstreeMostFirstRun = setSessionStorageItem("jstreeMostFirstRun", true);
        }
        SP.SOD.executeFunc('SP.js', 'SP.ClientContext', retrieveFolderList);
    }

    waitForJQueryAndRunDocumentsTreeWebPart = function() {
        if (!window.jQuery) {
            setTimeout(waitForJQueryAndRun, 66);
        } else {
            document.addEventListener("DOMContentLoaded", function (event) {
                execTreeWebPartOperations();
            });            
        }
    }

    init = function () {
        waitForJQueryAndRunDocumentsTreeWebPart();
    }();
}();

