# app-disclosures

Public disclosure pages for Awai and Itonami apps, served at **https://disclosures.awai.network/**.

A consent dialog links to these pages, for example from the `foreign-info-url` of a client-runtime operation (kotoba-lang/kotoba, `restricted-wasm-v1`, KOTOBA-159). Each page holds the information the dialog points to, such as the recipient's country, that country's data-protection regime, and the recipient's measures (施行規則 17 条 2 項).

## Layout

One folder per app, named by the app's **Android package name**: the `identifier` in the app's `tauri.conf.json`. The Store and the APK signer use the same value. In series apps it usually equals the `id` in `release.json`, but not always (for example, `itonami-market-android` has identifier `network.awai.itonami.market`), so always take it from `tauri.conf.json`.

`scripts/check-folders.mjs` rejects a top-level folder whose name is not a valid Android package name: at least two segments separated by dots; each segment starts with a letter and holds only letters, digits and `_`; no Java keyword as a segment. CI runs it on every pull request.

```
<app id>/foreign-info.html   one section per country: #us, #gb, …
```

Example: `https://disclosures.awai.network/network.itonami.koukokuscout/foreign-info.html#us` (Koukoku Scout, `tauri.conf.json` identifier `network.itonami.koukokuscout`).

## URLs are permanent

Apps ship these URLs inside signed builds and descriptors, so a published URL never changes and is never removed.
- Do not rename a folder, a file or a section id.
- To change the content, edit the page in place through a pull request, and keep the date line current.
- If a section stops applying, keep it and say so in its text.

## Changes

`main` is protected: pull request required, squash merge only, no force-push and no deletion. Content comes from Legal's decisions. Each PR names the Linear issue and the app's PR it belongs to.

## Licence

Apache License 2.0, as the apps. See `LICENSE`.
