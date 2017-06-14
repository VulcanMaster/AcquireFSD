Install-Module SharePointPnPPowerShellOnline -SkipPublisherCheck

Get-Module SharePointPnPPowerShell* -ListAvailable | Select-Object Name,Version | Sort-Object Version -Descending


An example
Connect-PnPOnline "http://tenant" -CurrentCredentials

$myList = Get-PnPList -Identity "Pages"

$myListContentTypes = Get-PnPContentType -List "Pages"

$myListItems = Get-PnPListItem -List "Pages" 

foreach ($item in $myListItems){
		$item.Context.Load($item.ContentType)
		$item.Context.ExecuteQuery()
		$ctname = $item.ContentType.Name;
		Write-Host $ctname
}


Write-Output