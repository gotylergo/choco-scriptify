let allPackages = [

    'powershell', // Install Powershell first (see notes)
    '7zip',
    'adobereader',
    'chocolateypackageupdater',
    'everynote',
    'firefox',
    'flashplayerplugin',
    'googlechrome',
    'hipchat',
    'jre8',
    'libreoffice-fresh',
    'notepadplusplus',
    'skype',
    'teamviewer',
]

// Setup templates

let templates = {
    'gen': [
        'powershell', // Install Powershell first (see notes)
        'adobereader',
        'chocolateypackageupdater',
        'firefox',
        'flashplayerplugin',
        'googlechrome',
        'jre8',
        'libreoffice-fresh',
        ],
}

// Create checkboxes from allPackages array

let packageCheckbox = function(packageName) {
    return(`<div class="checkbox">
<label for="${packageName}"><input class="selections" type="checkbox" id="${packageName}" value="${packageName}">
${packageName}</label>
</div>`)
}

for (package in allPackages) {
    document.getElementById('packages').innerHTML += packageCheckbox(allPackages[package]);
}

// Tick of checkboxes when a template is selected

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
                    function (item) {
                        document.getElementById(item).checked = true;
                    }
                )
            }
        }
    };
};

// Generate Chocolatey command from script

let form = document.querySelector('#form');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let installChoco = document.getElementById('installChoco').checked;
    let isLaptop = document.getElementById('isLaptop').checked;
    let chocoInstaller = '';
    let packageList = '';
    let script = '';

    let inputElements = document.getElementsByClassName('selections');
    for (let i = 0; i < inputElements.length; ++i) {
        if (inputElements[i].checked) {
            let package = `${inputElements[i].value} `;
            packageList += package;
        }
    }

    if (installChoco) {
        chocoInstaller = `@"%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\\chocolatey\\bin"`
    } else {
        chocoInstaller = '';  
    }


    script = `${chocoInstaller} & choco install ${fortiInstaller}${packageList} -y;`;

    document.getElementById('command').value = script;
    document.getElementById('command').select();

})