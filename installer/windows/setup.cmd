set bin=%~dp0
cd /d %~dp0

:: install mychain sources from package manager
:: This is removed, because default setup.exe must bring all the files
:: call npm install mychain

:: sc delete MyChain

:: create windows service if it is not exists yet
sc query MyChain
if errorlevel 1 sc create MyChain binPath= "%bin%node.exe app.js" start= delayed-auto obj= "NT Service\MyChain"
:: DisplayName= "Blockchain (MyChain)" error= ignore

:: configure service description
sc description MyChain "Independent Blockchain Research Project"

:: configure automatic failure recovery
sc failure MyChain reset= 0 actions= restart/60000

:: grant service account full permission to folder to support automatic updates (can be disabled for better security)
icacls . /grant "NT Service\MyChain":(OI)(CI)F /T

:: start the service
net start MyChain

:: open welcoming page in the browser
if %errorlevel%==0 start http://127.0.0.1:7770/installed
