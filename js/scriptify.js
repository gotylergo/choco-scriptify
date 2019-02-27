// This array is used to create the checkboxes in the html

let allPackages = [
    'powershell', 
    '7zip',
    'adobereader',
    'evernote',
    'firefox',
    'googlechrome',
    'hipchat',
    'jre8',
    'libreoffice-fresh',
    'notepadplusplus',
    'opera',
    'skype',
    'teamviewer',
]

// Setup templates

let templates = {
    'web-browsers': [
        'powershell',
        'googlechrome',
        'firefox',
        'opera',
    ],
    'office': [
        'powershell',
        'adobereader',
        'evernote',
        'libreoffice-fresh',
        ],
}

// Set a VPN client package to install

let vpn = 'openvpn'

// Create template selections from templates array

let templateOption = function(templateName) {
    return(`<option value="${templateName}">${templateName}</option>`)
}

for (let template in templates) {
    if(templates.hasOwnProperty(template)) {
        document.getElementById('template').innerHTML += templateOption(template);
    }
}

// Create checkboxes from allPackages array

let packageCheckbox = function(packageName) {
    return(`<div class="checkbox">
<label for="${packageName}"><input class="selections" type="checkbox" id="${packageName}" value="${packageName}">
${packageName}</label>
</div>`)
}

for (let pkg in allPackages) {
    document.getElementById('packages').innerHTML += packageCheckbox(allPackages[pkg]);
}

// Tick of checkboxes when a template is selected

const clearCheckboxes = function() {
    var items = document.getElementsByClassName('selections');
    for (var i = 0; i < items.length; i++) {
        if (items[i].type == 'checkbox')
            items[i].checked = false;
    }
}

document.getElementById('template').onchange = function () {
    if (this.value === '') {
        clearCheckboxes();
    } else {
        clearCheckboxes();
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
    let chocoInstaller = `@"%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\\chocolatey\\bin" && set choco=%ALLUSERSPROFILE%\\chocolatey\\bin\\choco.exe`;
    let chocoInstall = 'choco install';
    let packageList = '';
    let condExec = '&&' 
    let script = '';

    let inputElements = document.getElementsByClassName('selections');
    for (let i = 0; i < inputElements.length; ++i) {
        if (inputElements[i].checked) {
            let pkg = `${inputElements[i].value} `;
            packageList += pkg;
        }
    }

    if (!installChoco) {
        chocoInstaller = '';
        condExec = ''
    } 

    if (isLaptop) {
        packageList = `${vpn} ${packageList}`;
    }

    if (packageList.length === 0) {
        chocoInstall = '';
        condExec = '';
    } else {
        chocoInstall = `choco install ${packageList} -y`
    }

    script = `${chocoInstaller} ${condExec} ${chocoInstall}`;

    document.getElementById('command').value = script;
    document.getElementById('command').select();

})