<script type="text/javascript">
    function sendEmail(){
        var str = "mailto:dmitrijs.blinkovs@something.com?subject="+"You follow"+"&body=There will be follow links";
        window.open(str);
    }


    function getFollowStuff  () {
  
        $.ajax({
            url: "https://vulcanmaster.sharepoint.com/_api/social.feed/my/Feed",

            type: "GET",
            headers: {
                "Accept": "application/json;odata=verbose",
            },

            success: function (data) {
                debugger
                document.getElementById("feedEventsTable").innerHTML = "";
                var compliant = data.d;
                
                //NewestProcessed:"2017-06-08T13:51:50Z"
                //OldestProcessed:"2017-06-06T14:30:42Z"

                document.getElementById("feedTimeRange").innerHTML = " Oldest: "+ compliant.SocialFeed.NewestProcessed.substr(0, 10) +
                                                                "<br/> Newest: "+compliant.SocialFeed.OldestProcessed.substr(0, 10);
                //compliant.SocialFeed.NewestProcessed 
                //compliant.SocialFeed.OldestProcessed 
             

                compliant.SocialFeed.Threads.results.forEach(function (element) {
                    pageFeedContenTable = document.getElementById("feedEventsTable");

                    nodeTr = document.createElement("tr");
                    nodeTd = document.createElement("td");
                    nodeTd.innerHTML = element.RootPost.ModifiedTime.substr(0, 10) + "  " + element.RootPost.ModifiedTime.substr(11, 8);
                    nodeTr.appendChild(nodeTd);
                    nodeTd = document.createElement("td");
                    nodeTd.innerHTML = element.RootPost.Text;
                    nodeTr.appendChild(nodeTd);

                    pageFeedContenTable.appendChild(nodeTr);

                    //compliant.RootPost.ModifiedTime = 
                    //compliant.RootPost.Text = 



//                    pageFeedConten = pageFeedConten + element + "<br/>";
                    console.log(element);
                });

//                document.getElementById("feedEvents").innerHTML = pageFeedConten;

                //count = compliant.query.PrimaryQueryResult.RelevantResults.TotalRows;

                //compliant.query.PrimaryQueryResult.RelevantResults.Table.Rows.forEach(function (element) {
                //    debugger
                //    console.log(element);
                //});
            },

            error: function (data) {
                debugger
                alert("Error");
            }
        });
    }




</script>