# Choco-Scriptify

Create a chocolatey installer script from a group of selected packages.

## How to Use

Select a template or check off packages manually to generate a short Chocolatey script to install the packages.

## Customize Packages and Templates

Feel free to fork this repo and customize it for your needs.

To change:

- **the list of available packages**: modify at the allPackages array at the top of scriptify.js.
- **the templates**: modify the templates object (and the associated contained arrays within). _Make sure the packages in your template are included in allPackages as well, or the script will break!_
- **the VPN client**: modify the VPN variable.

## Technologies Used: 

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - a high-level, interpreted programming language that conforms to the ECMAScript specification.
- [Bootstrap](https://getbootstrap.com) - The most popular HTML, CSS, and JS library in the world.
- [Chocolatey](https://chocolatey.org) - The package manager for Windows

## Author:

- [GitHub](https://github.com/gotylergo)
- [Portfolio](https://dev.tylerjustyn.com)