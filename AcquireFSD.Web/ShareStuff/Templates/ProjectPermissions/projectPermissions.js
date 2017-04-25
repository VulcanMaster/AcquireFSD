var agfo = window.agfo || {};

"use strict"
agfo.projectPermissionsWebPart = agfo.projectPermissionsWebPart || {};
agfo.projectPermissionsWebPart.prepareAndShowData = function () {

    succeedGroupsAndUsers = function (sender, args) {
        try {
            var nodeul = document.getElementById("projectPermissionsOwners").appendChild(document.createElement("ul"));
            var ownersEnumerator = this.ownersUsers.getEnumerator();
            while (ownersEnumerator.moveNext()) {
                var item = ownersEnumerator.get_current();
                var node = nodeul.appendChild(document.createElement("li"));
                node.appendChild(document.createTextNode(item.get_title()));
            }
            var nodeul = document.getElementById("projectPermissionsMembers").appendChild(document.createElement("ul"));
            var membersEnumerator = this.membersUsers.getEnumerator();
            while (membersEnumerator.moveNext()) {
                var item = membersEnumerator.get_current();
                var node = nodeul.appendChild(document.createElement("li"));
                node.appendChild(document.createTextNode(item.get_title()));
            }
        } catch (err) {
            alert("succeedGroupsAndUsers exception" + err);
        }
    }

    onQueryFailed = function (sender, args) {
        alert('Request failed. ' + args.get_message() +
            '\n' + args.get_stackTrace());
    };

    execProjectPermissionsOperations = function () {
        var clientContext = new SP.ClientContext();

        this.spWeb = clientContext.get_web();
        clientContext.load(this.spWeb);

        this.owners = this.spWeb.get_associatedOwnerGroup()
        clientContext.load(this.owners);

        this.ownersUsers = this.owners.get_users()
        clientContext.load(this.ownersUsers);

        this.members = this.spWeb.get_associatedMemberGroup();
        clientContext.load(this.members);

        this.membersUsers = this.members.get_users()
        clientContext.load(this.membersUsers);

        clientContext.executeQueryAsync(
            Function.createDelegate(this, succeedGroupsAndUsers),
            Function.createDelegate(this, onQueryFailed)
        );
    }

    init = function () {
        try {
            SP.SOD.executeFunc('SP.js', 'SP.ClientContext', execProjectPermissionsOperations);
        } catch (err) {
            alert("projectPermissionsWebPart. Something went wrong, exception: "+err)
        }
    }();
}();