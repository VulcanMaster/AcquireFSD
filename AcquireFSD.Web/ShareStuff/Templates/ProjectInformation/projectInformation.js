var agfo = window.agfo || {};

"use strict"
agfo.projectInformationWebPart = agfo.projectInformationWebPart || {};
agfo.projectInformationWebPart.prepareAndShowData = function () {

    onQueryFailed = function (sender, args) {
        alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }

    showModalEditDialog = function (url) {
        var options = SP.UI.$create_DialogOptions();
        options.url = url;
        SP.UI.ModalDialog.showModalDialog(options);
    }

    buildMarkupAndShow = function (listItem, editItemProjectInformationUrl, documentsCount, overduedTasksCount, unCompletedTaskCount) {
        var parentDiv = document.getElementById("projectInformation");

        var node = document.createElement("p");

        var value = listItem.get_item('Description');
        node.innerHTML = node.innerHTML + value;

        parentDiv.appendChild(node);

        node = document.createElement("br");
        parentDiv.appendChild(node);

        node = document.createElement("p");
        node.innerHTML = "Projektstart: ";
        value = listItem.get_item('ProjectStartDate');
        value = value.format('dd.MM.yyyy');
        textnode = document.createTextNode(value);;
        node.appendChild(textnode);
        parentDiv.appendChild(node);
 
        node = document.createElement("p");
        node.innerHTML = "Projektende: ";
        value = listItem.get_item('ProjectEndDate');
        value = value.format('dd.MM.yyyy');
        modified = listItem.get_item('ProjectEndDate');
        textnode = document.createTextNode(value);
        node.appendChild(textnode);
        parentDiv.appendChild(node);

        node = document.createElement("br");
        parentDiv.appendChild(node);

        node = document.createElement("p");
        node.innerHTML = "Dokumente: ";
        value = documentsCount
        textnode = document.createTextNode(value);;
        node.appendChild(textnode);
        parentDiv.appendChild(node);

        node = document.createElement("p");
        node.innerHTML = "Aufgaben: ";
        value = overduedTasksCount;
        textnode = document.createTextNode(value);;
        node.appendChild(textnode);
        parentDiv.appendChild(node);

        node = document.createElement("p");
        node.innerHTML = "Überfällige Aufgaben: ";
        value = unCompletedTaskCount;
        textnode = document.createTextNode(value);;
        node.appendChild(textnode);
        parentDiv.appendChild(node);

        node = document.createElement("br");
        parentDiv.appendChild(node);

        document.getElementById("editItemProjectInformation").onclick = function () {
            showModalEditDialog(editItemProjectInformationUrl);
        }
    }

    agregateAndShowSiteQuota = function (siteUsageInfo) {
//        var siteUsageInfo = this.site.get_usage();
        var quotapercentageFormatted = Math.round(siteUsageInfo.get_storagePercentageUsed() * 100)
        var quotaStorageTotal;
        var quotaUsed;
        var quotaDisplayString = "X / XXX MB";

        if (quotapercentageFormatted === 0) {
            quotaUsed = Math.round(siteUsageInfo.get_storage() / 1048576);
            quotaDisplayString = quotaUsed + " / ∞ MB"
        } else {

            quotaStorageTotal = Math.round(siteUsageInfo.get_storage() / siteUsageInfo.get_storagePercentageUsed() / 1048576);
            quotaUsed = Math.round(siteUsageInfo.get_storage() / 1048576);

            quotaDisplayString = quotaUsed + " / " + quotaStorageTotal + " MB";
            if (quotapercentageFormatted < 40) {
                document.getElementById("projectInformationSiteQuotaUsage").style.width = "40%";
            } else {
                document.getElementById("projectInformationSiteQuotaUsage").style.width = quotapercentageFormatted + "%";
            }
        }

        document.getElementById("projectInformationSiteQuotaUsage").innerHTML = quotaDisplayString;
    }

    onSucceededQueryProjectInformation = function () {
        var overduedTasksCount = this.ItemTasksOverdued.get_count();
        var unCompletedTaskCount = this.ItemTasksNotCompleted.get_count();
        var documentsCount = this.DocumentsLibraryItems.get_count();

        var editItemProjectInformationUrl = _spPageContextInfo.siteAbsoluteUrl + "/Lists/ProjectInformation/EditForm.aspx";

        listItemEnumerator = this.ItemCollProjectInformation.getEnumerator();
        while (listItemEnumerator.moveNext()) {
            var spListItemProjectInformation = listItemEnumerator.get_current();
            editItemProjectInformationUrl = editItemProjectInformationUrl + "?ID=" + spListItemProjectInformation.get_id();
            buildMarkupAndShow(spListItemProjectInformation, editItemProjectInformationUrl, documentsCount, overduedTasksCount, unCompletedTaskCount);
            break;
        }
        agregateAndShowSiteQuota(this.site.get_usage());
    }

    retrieveProjectInformationData = function () {
        var clientContext = new SP.ClientContext.get_current();

        this.spListProjectInformation = clientContext.get_web().get_lists().getByTitle('ProjectInformation');
        clientContext.load(this.spListProjectInformation);

        var camlQueryProjectInformation = new SP.CamlQuery.createAllItemsQuery(); 
        this.ItemCollProjectInformation = this.spListProjectInformation.getItems(camlQueryProjectInformation);
        clientContext.load(this.ItemCollProjectInformation, 'Include(Id, DisplayName, Title, Description, ProjectType, ProjectStartDate, ProjectEndDate, ProjectOwner, ProjectContributors)');

        this.spListDocuments = clientContext.get_web().get_lists().getByTitle('Documents');
        clientContext.load(this.spListDocuments);

        var camlQueryDocuments = new SP.CamlQuery();
        camlQueryDocuments.set_viewXml('<View Scope="RecursiveAll"><Query><Where><Neq><FieldRef Name="FSObjType" /><Value Type="Integer">1</Value></Neq></Where></Query></View>');
        this.DocumentsLibraryItems = this.spListDocuments.getItems(camlQueryDocuments);
       clientContext.load(this.DocumentsLibraryItems);

        this.spListTasks = clientContext.get_web().get_lists().getByTitle('Tasks');

        var camlQueryTasksNotCompleted = new SP.CamlQuery();
        camlQueryTasksNotCompleted.set_viewXml('<View Scope="RecursiveAll"><Query><Where><Eq><FieldRef Name="Checkmark" /><Value Type="Integer">0</Value></Eq></Where></Query></View>');
        this.ItemTasksNotCompleted = this.spListTasks.getItems(camlQueryTasksNotCompleted);
        clientContext.load(this.ItemTasksNotCompleted);

     
        var dueDate = new Date();
        var dueDate = dueDate.getFullYear() + "-" + (dueDate.getMonth() + 1) + "-" + (dueDate.getDate()) + 'T00:00:01Z';
        var queryStr = "<View Scope='RecursiveAll'><Query><Where><Lt><FieldRef Name='DueDate'/><Value Type='DateTime' IncludeTimeValue='FALSE'>" + dueDate + "</Value></Lt></Where></Query></View>";
        var camlQueryTasksOverdued = new SP.CamlQuery();
        camlQueryTasksOverdued.set_viewXml(queryStr);
        this.ItemTasksOverdued = this.spListTasks.getItems(camlQueryTasksOverdued);
        clientContext.load(this.ItemTasksOverdued, 'Include(Id, Title, DueDate)');

        this.site = clientContext.get_site();
        clientContext.load(this.site, 'Usage');
        
        clientContext.executeQueryAsync(Function.createDelegate(this, onSucceededQueryProjectInformation), Function.createDelegate(this, onQueryFailed));
    }

    init = function () {
        try {
            SP.SOD.executeFunc('SP.js', 'SP.ClientContext', retrieveProjectInformationData);
        }
        catch(err){
            alert("projectInformationWebPart. Something went wrong, exception: "+err);
        }
    }();
}();

