# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.2.0] - 2017-08-02
### Added
- Added `TODO.md` file.
- Argument sanitization and validation methods are now run on `MqVis` instantiation/update.
- `SFCO_MQ_VIS_UPDATE_COMPLETE` now dispatched from `window` on successful update.
- `SFCO_MQ_VIS_UPDATE_FAILED` now dispatched from `window` on failed update.

### Changed
- Fixed typo in component documentation.

## [0.1.1] - 2017-07-31
### Changed
- Added 'Caveats' section to `README.md`

## [0.1.0] - 2017-07-28
### Added
- Completed first pass of `Media Query Visualizer` JavaScript package.
- Exposed `MqVis` function via `index.js`.
- Built out `Media Query Visualizer` demo (`/demo`).
- Added setup, configuration, and supporting files: `CHANGELOG.md`; `README.md`; `.babelrc`; `.eslintrc.js`; `.editorconfig`; `.gitignore`; `gulpfile.js`; `package.json`; `package-lock.json`.
- Completed first pass of `README` file.
- Added initial notes to `CHANGELOG` file.
