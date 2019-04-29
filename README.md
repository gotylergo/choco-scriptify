# Choco-Scriptify

[Live demo](https://choco-scriptify.tylerjustyn.com)

Original Javascript web app to create a Chocolatey installer script from a group of selected packages.

**Important Update:** _To make updating the script easier and prevent merge conflicts, allPackages, templates, and vpn choices have been moved out of script.js and require a config.json file. allPackages will be automatically generated from the arrays in the JSON. See the config.json.example file for reference._

![Choco-Scriptify Screenshot](http://i65.tinypic.com/20pob3t.png)

## How to Use

1. First, rename config.json.example to config.json.
2. Open the index.html file in a web browser.
3. Select a template or check off packages manually to generate a short Chocolatey script to install the packages.

## Customize Packages and Templates

Feel free to fork this repo and customize it for your needs.

To change:

- **the VPN client**: Modify the value of the VPN key in the config.json file.
- **the templates**: Update/add arrays in your config.json file. Any packages within the templates will get checkboxes in the HTML as well.

## Technologies Used: 

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - a high-level, interpreted programming language that conforms to the ECMAScript specification.
- [Bootstrap](https://getbootstrap.com) - The most popular HTML, CSS, and JS library in the world.
- [Chocolatey](https://chocolatey.org) - The package manager for Windows

## Author:

- [GitHub](https://github.com/gotylergo)
- [Portfolio](https://dev.tylerjustyn.com)