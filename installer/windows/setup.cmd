set bin=%~dp0
cd /d %~dp0

set s=MyChain

:: sc delete MyChain

:: create windows service if it is not exists yet
sc query %s%
if errorlevel 1 sc create %s% binPath= "%bin%nssm.exe" start= delayed-auto obj= "NT Service\%s%"
:: DisplayName= "Blockchain (%s%)" error= ignore

:: configure service description
sc description %s% "Independent Blockchain Research Project"

:: configure automatic failure recovery
sc failure %s% reset= 0 actions= restart/60000

set r=HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\%s%\Parameters\
reg add %r% /v AppDirectory /t REG_SZ /d "%~dp0\" /f
reg add %r% /v Application /t REG_SZ /d "node.exe" /f
reg add %r% /v AppParameters /t REG_SZ /d "app.js svc" /f

:: grant service account full permission to folder to support automatic updates (can be disabled for better security)
icacls . /grant "NT Service\%s%":(OI)(CI)F

:: start the service
net start %s%

:: open welcoming page in the browser
if %errorlevel%==0 start http://127.0.0.1:7770/
