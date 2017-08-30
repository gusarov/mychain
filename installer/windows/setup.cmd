set bin=%~dp0

:: sc delete MyChain

:: create windows service if it is not exists yet
sc query MyChain
if errorlevel 1 sc create MyChain binPath= "%bin%node.exe app.js" start= delayed-auto obj= "NT Service\MyChain"
:: DisplayName= "Blockchain (MyChain)" error= ignore

:: configure service description
sc description MyChain "Independent Blockchain Research Project"

:: configure automatic failure recovery
sc failure MyChain reset= 0 actions= restart/60000

:: start the service
net start MyChain

:: open welcoming page in the browser
if errorlevel 0 start http://127.0.0.1:7770/installed
