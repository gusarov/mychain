:: goto current script location
cd /d %~dp0

:: make output dirrectory
if exist out rd /s /q out
if not exist out md out

cd .\out

:: fetch node exe
where node > %tmp%\nodelocation
set /p nodelocation= < %tmp%\nodelocation
xcopy /d "%nodelocation%" .

:: fetch other files
:: xcopy /d ..\..\*.ico .
xcopy /d ..\setup.cmd .
:: xcopy /d ..\..\logo.png .

:: find winrar
if exist "%ProgramFiles%\WinRar\WinRar.exe" set winrar=%ProgramFiles%\WinRar\WinRar.exe
if exist "%ProgramFiles(x86)%\WinRar\WinRar.exe" set winrar=%ProgramFiles(x86)%\WinRar\WinRar.exe
if exist "%ProgramW6432%\WinRar\WinRar.exe" set winrar=%ProgramW6432%\WinRar\WinRar.exe
if "%WinRar%"=="" echo WinRar not found & exit 1
:: echo %winrar%

"%winrar%" a -sfx Setup -cfg- -iadm -iicon"..\..\chain.ico" -k -ma5 -r -ri15 -z"..\script.txt"
:: -iimgLogo.png -s -s1 -s2
