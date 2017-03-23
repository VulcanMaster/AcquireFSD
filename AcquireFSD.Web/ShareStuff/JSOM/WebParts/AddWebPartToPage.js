<script type="text/javascript">
    function saymehellofromfile  () {
        debugger;
        var webPartXmlForHtmlReference = "<?xml version='1.0' encoding='utf-8'?>"+
        "<WebPart xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns='http://schemas.microsoft.com/WebPart/v2'>"+
            "<Title>Content Editor for HTML Reference</Title>"+
            "<FrameType>Default</FrameType>"+
            "<Description>Allows authors to enter rich text content.</Description>"+
            "<IsIncluded>true</IsIncluded>"+
            "<ZoneID>Main</ZoneID>"+
            "<PartOrder>8</PartOrder>"+
            "<FrameState>Normal</FrameState>"+
            "<Height />"+
            "<Width />"+
            "<AllowRemove>true</AllowRemove>"+
            "<AllowZoneChange>true</AllowZoneChange>"+
            "<AllowMinimize>true</AllowMinimize>"+
            "<AllowConnect>true</AllowConnect>"+
            "<AllowEdit>true</AllowEdit>"+
            "<AllowHide>true</AllowHide>"+
            "<IsVisible>true</IsVisible>"+
            "<DetailLink />"+
            "<HelpLink />"+
            "<HelpMode>Modeless</HelpMode>"+
            "<Dir>Default</Dir>"+
            "<PartImageSmall />"+
            "<MissingAssembly>Cannot import this Web Part.</MissingAssembly>"+
            "<PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>"+
            "<IsIncludedFilter />"+
            "<Assembly>Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>"+
            "<TypeName>Microsoft.SharePoint.WebPartPages.ContentEditorWebPart</TypeName>"+
            "<ContentLink xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor'>/sites/projects/_catalogs/masterpage/itemShowTemplat.html</ContentLink>"+
            "<Content xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor' />"+
            "<PartStorage xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor' />"+
        "</WebPart>";

        var webPartXmlForJsReference = "<?xml version='1.0' encoding='utf-8'?>"+
        "<WebPart xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns='http://schemas.microsoft.com/WebPart/v2'>"+
            "<Title>Content Editor for JS Reference</Title>"+
            "<FrameType>Default</FrameType>"+
            "<Description>Allows authors to enter rich text content.</Description>"+
            "<IsIncluded>true</IsIncluded>"+
            "<ZoneID>Main</ZoneID>"+
            "<PartOrder>6</PartOrder>"+
            "<FrameState>Normal</FrameState>"+
            "<Height />"+
            "<Width />"+
            "<AllowRemove>true</AllowRemove>"+
            "<AllowZoneChange>true</AllowZoneChange>"+
            "<AllowMinimize>true</AllowMinimize>"+
            "<AllowConnect>true</AllowConnect>"+
            "<AllowEdit>true</AllowEdit>"+
            "<AllowHide>true</AllowHide>"+
            "<IsVisible>true</IsVisible>"+
            "<DetailLink />"+
            "<HelpLink />"+
            "<HelpMode>Modeless</HelpMode>"+
            "<Dir>Default</Dir>"+
            "<PartImageSmall />"+
            "<MissingAssembly>Cannot import this Web Part.</MissingAssembly>"+
            "<PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>"+
            "<IsIncludedFilter />"+
            "<Assembly>Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>"+
            "<TypeName>Microsoft.SharePoint.WebPartPages.ContentEditorWebPart</TypeName>"+
            "<ContentLink xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor'>/sites/projects/_catalogs/masterpage/itemShowTemplate.js</ContentLink>"+
            "<Content xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor' />"+
            "<PartStorage xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor' />"+
        "</WebPart>";

        var spPageUrl = "/Lists/List/DispForm.aspx";

        addWebPartToPage(spPageUrl, webPartXmlForHtmlReference, "Main", "1" );
        addWebPartToPage(spPageUrl, webPartXmlForJsReference, "Main", "2" );

        spPageUrl = "/Lists/List/EditForm.aspx";
        addWebPartToPage(spPageUrl, webPartXmlForHtmlReference, "Main", "1" );
        addWebPartToPage(spPageUrl, webPartXmlForJsReference, "Main", "2" );

    }
function addWebPartToPage(spPageRelativeUrl, webPartXml, webPartZoneName, webPartIndexInZone){

    var spSiteUrl = _spPageContextInfo.webServerRelativeUrl;
    var spClientContext = new SP.ClientContext(spSiteUrl);
    var spWeb = spClientContext.get_web();
        
    spClientContext.load(spWeb);
        
    var spFile = spWeb.getFileByServerRelativeUrl(spSiteUrl + spPageRelativeUrl);
    var spLimitedWebPartManager = spFile.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
    var theWebPartDefinition = spLimitedWebPartManager.importWebPart(webPartXml);
    var theWebPart = theWebPartDefinition.get_webPart();

    spLimitedWebPartManager.addWebPart(theWebPart, webPartZoneName, webPartIndexInZone);
    spClientContext.load(theWebPart);

    spClientContext.executeQueryAsync(
                                    Function.createDelegate(this, function () {
                                        console.log("WebPart added to page: " + spPageRelativeUrl );
                                    }),
                                    Function.createDelegate(this, function (sender, args) {
                                        console.log(args.get_message() + '\n' + args.get_stackTrace())
                                    }));
}
</script>