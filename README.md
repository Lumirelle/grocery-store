<h1 align="center">
  <a href="https://github.com/Lumirelle/grocery-store" rel="noopener">
</h1>

<h3 align="center">Grocery Store</h3>

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/lumirelle-grocery-store)](https://www.npmjs.com/package/lumirelle-grocery-store)
[![Status](https://img.shields.io/badge/status-active-success.svg)](.)
[![GitHub Issues](https://img.shields.io/github/issues/Lumirelle/grocery-store.svg)](https://github.com/Lumirelle/grocery-store/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Lumirelle/grocery-store.svg)](https://github.com/Lumirelle/grocery-store/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> My personal grocery store, include docs, preferences and resources.
    <br>
</p>

## 📝 Table of Content

- [About](#about)
- [Catalogs](#catalogs)
- [Usage](#usage)
  - [Manually Preference Setup](#manually_setup)
  - [Script Preference Setup](#script_setup)
- [Authors](#authors)

## 🧐 About <a name="about"></a>

My personal grocery store, include docs, preferences and resources.

## 📑 Catalogs <a name="catalogs"></a>

The directory structure under `/grocery-store`, is grouped by situation:

- `/personal`: **&lt;situation&gt;** Personal usage groceries
- `/work`: **&lt;situation&gt;** Work-only groceries (Of course, it should be ignored by git)

The directory structure under folders marked as **&lt;situation&gt;**, is grouped by category:

- `/docs`: **&lt;docs&gt;** Collection of documents, such as manuals
- `/preferences`: **&lt;preferences&gt;** Collection of preferences, such as `.gitconfig`
- `/resources`: **&lt;res&gt;** Collection of resources, such as fonts

The directory structure under folders marked as **&lt;preferences&gt;**, is grouped by use-case:

- `/deployer`: **&lt;use-case&gt;** Preferences used by deployer
- `/editor`: **&lt;use-case&gt;** Preferences used by editor
- `/formatter`: **&lt;use-case&gt;** Preferences used by formatter
- `/linter`: **&lt;use-case&gt;** Preferences used by linter
- `/package-manager`: **&lt;use-case&gt;** Preferences used by package manager
- `/terminal`: **&lt;use-case&gt;** Preferences used by terminal
- `/vcs`: **&lt;use-case&gt;** Preferences used by version control system
- `/vpn`: **&lt;use-case&gt;** Preferences used by vpn

The directory structure under folders marked as **&lt;use-case&gt;**, is grouped by program. I will not list them all here.

See total catalogs [here](CATALOGS.json).

## 🎈 Usage <a name="usage"></a>

### ✋🏼 Manually Setup <a name="manually_setup"></a>

Just download the preference under the `/<situation>/<preferences>` folder introduced above you want and put it in the right place.

### 📜 Script Setup <a name="script_setup"></a>

Install this package by node.js package manager like `npm`, `yarn`, `pnpm` and so on.

```shell
pnpm i lumirelle-grocery-store -g
```

Now, please enjoy! See the help information by using the command below:

```shell
pi --help
```

## ✍️ Authors <a name="authors"></a>

- [@Lumirelle](https://github.com/Lumirelle) - Anything
