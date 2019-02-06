// Setup templates

let templates = {
    default: [
        'googlechrome',
        'firefox',
    ],
    alternate: [
        'libreoffice-fresh',
        'powershell',
    ],
}

// Fill out form based on templates

document.getElementById('template').onchange = function () {
    if (this.value === '') {
        // document.getElementsByClassName('selections').checked = false;
        var items = document.getElementsByClassName('selections');
        for (var i = 0; i < items.length; i++) {
            if (items[i].type == 'checkbox')
                items[i].checked = false;
        }
    } else {
        for (const key of Object.keys(templates)) {
            if (key === this.value) {
                const packageList = templates[key];
                packageList.forEach(
                    function(item) {
                        document.getElementById(item).checked = true;
                    }
                )
            }
        }
    };
};

// Generate command from script

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