let form = document.querySelector('#form');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let installChoco = document.getElementById('installChoco').checked;
    let chocoInstaller = `@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin;"`;
    let packageList = '';
    let script = '';

    let inputElements = document.getElementsByClassName('selections');
    for (let i = 0; i < inputElements.length; ++i) {
        if (inputElements[i].checked) {
            let package = `${inputElements[i].value} `;
            packageList += package;
        }
    }

    if (!installChoco) {
        chocoInstaller = '';
    }

    script = `${chocoInstaller}choco install ${packageList} -y;`;

    document.getElementById('command').value = script;
    document.getElementById('command').select();

})