try{
Write-Host "foo bar"
1/0
} catch {
Write-Error "Error"
}

Write-Host "After error"
