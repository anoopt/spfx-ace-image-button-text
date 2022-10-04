try{
Write-Host "foo bar"
1/0
} catch {
Write-Error "Error"
exit 1
}

Write-Host "After error"
