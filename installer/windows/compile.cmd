:: test appveyer admin
md %windir%\qq
if errorlevel 1 exit 1

:: goto current script location
set orig=%cd%
cd /d %~dp0

:: make output dirrectory
if not exist out md out

cd out

:: fetch node.exe
where node > %tmp%\nodelocation
set /p nodelocation= < %tmp%\nodelocation
xcopy /d "%nodelocation%" .

:: fetch setup files
xcopy /q /y /r /d ..\setup.cmd .

:: fetch package files
xcopy /q /y /r /d ..\nssm.exe .
xcopy /q /y /r /d ..\..\..\*.* . /exclude:..\excludes.txt+..\..\..\.gitignore

:: fetch npm module itself
call npm install npm --production

:: fetch other production modules
call npm install --production

:: fetch npm.cmd
:: where npm.cmd > %tmp%\npmlocation
:: set /p npmlocation= < %tmp%\npmlocation
:: xcopy /d "%npmlocation%" .

:: find winrar
::if exist "%ProgramFiles%\WinRar\WinRar.exe" set winrar=%ProgramFiles%\WinRar\WinRar.exe
::if exist "%ProgramFiles(x86)%\WinRar\WinRar.exe" set winrar=%ProgramFiles(x86)%\WinRar\WinRar.exe
::if exist "%ProgramW6432%\WinRar\WinRar.exe" set winrar=%ProgramW6432%\WinRar\WinRar.exe
set WinRar=..\winrar.exe
if "%WinRar%"=="" echo WinRar not found & exit 1
:: echo %winrar%

if exist Setup.exe del Setup.exe
"%winrar%" a -sfx Setup -cfg- -iadm -iicon"..\..\chain.ico" -k -ma5 -r -ri15 -z"..\script.txt"
:: -iimgLogo.png -s -s1 -s2

cd /d %orig%
