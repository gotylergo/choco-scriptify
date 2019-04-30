'use strict'

// Warn IE users to use a modern browser

const usingIE = /Trident|MSIE/.test(navigator.userAgent);

if (usingIE) {
    document.getElementById("ifIE").style.display = "block";
} else {
    document.getElementById("ifIE").style.display = "none";
}

// Create template selections from imported JSON

let templateOption = function (templateName) {
    return (`<option value="${templateName}">${templateName}</option>`)
}
let allPackages = [];

let templates = {};

let vpn = '';

let templatesReq = new Request('./config.json');

fetch(templatesReq)
    .then(function (res) {
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res.json();
    })
    .then(function (res) {
        // Assign VPN from config, then remove from res object
        vpn = res['vpn'];
        delete res.vpn;
        return res;
    })
    .then(function (res) {
        templates = res;
        // Add templates to template drop down
        let templateArr = Object.keys(res);
        templateArr.forEach(function (template) {
            document.getElementById('template').innerHTML += templateOption(template);
        });
        return res;
    })
    .then(function (templates) {
        // Add packages to allPackages array
        const packageArray = Object.values(templates);
        packageArray.forEach(function (arr) {
            arr.forEach(function (pkg) {
                // Check if package already exists, otherwise add it
                if (allPackages.indexOf(pkg)) {
                    allPackages.push(pkg)
                }
            })
        })
        return allPackages = allPackages.sort();
    })
    .then(function (allPackages) {
        // Create checkboxes from allPackages array
        for (let pkg in allPackages) {
            document.getElementById('packages').innerHTML += packageCheckbox(allPackages[pkg]);
        }
    })
    .catch(function (error) {
        console.log(`Couldn't fetch config.json: ${error}. \nDid you create one?`);
    });

// Checkbox template

let packageCheckbox = function (packageName) {
    return (`<div class="checkbox">
<label for="${packageName}"><input class="selections" type="checkbox" id="${packageName}" value="${packageName}">
${packageName}</label>
</div>`)
}

// Tick of checkboxes when a template is selected

const clearCheckboxes = function () {
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