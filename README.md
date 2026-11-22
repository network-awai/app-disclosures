# app-disclosures

Public disclosure pages for Awai and Itonami apps, served at **https://disclosures.awai.network/**.

A consent dialog links to these pages, for example from the `foreign-info-url` of a client-runtime operation (kotoba-lang/kotoba, `restricted-wasm-v1`, KOTOBA-159). Each page holds the information the dialog points to, such as the recipient's country, that country's data-protection regime, and the recipient's measures (施行規則 17 条 2 項).

## Layout

One folder per app, named by the app's **package id** (the Tauri `identifier`, the same as `id` in the app's `release.json`):

```
<app id>/foreign-info.html   one section per country: #us, #gb, …
```

Example: `https://disclosures.awai.network/network.itonami.koukokuscout/foreign-info.html#us`.

A web-only app with no Tauri app gets an id of the same reverse-domain form, chosen by Itonami, with no hyphen: for example `network.awai.itonami.marketweb` for the Market web app. The app names that id in its descriptor as the id of its disclosure pages.

## URLs are permanent

Apps ship these URLs inside signed builds and descriptors, so a published URL never changes and is never removed.
- Do not rename a folder, a file or a section id.
- To change the content, edit the page in place through a pull request, and keep the date line current.
- If a section stops applying, keep it and say so in its text.

## Changes

`main` is protected: pull request required, squash merge only, no force-push and no deletion. Content comes from Legal's decisions. Each PR names the Linear issue and the app's PR it belongs to.

## Licence

Apache License 2.0, as the apps. See `LICENSE`.
