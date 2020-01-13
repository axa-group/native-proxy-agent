# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.4.0](http://github.axa.com/Digital/amf-commons-nodejs/compare/native-proxy-agent@2.3.2...native-proxy-agent@2.4.0) (2019-11-04)


### Features

* **native-proxy-agent:** add support for no_proxy env var ([#35](http://github.axa.com/Digital/amf-commons-nodejs/issues/35)) ([#36](http://github.axa.com/Digital/amf-commons-nodejs/issues/36)) ([0089d78](http://github.axa.com/Digital/amf-commons-nodejs/commit/0089d78))





## [2.3.2](http://github.axa.com/Digital/amf-commons-nodejs/compare/native-proxy-agent@2.3.1...native-proxy-agent@2.3.2) (2019-09-30)

**Note:** Version bump only for package native-proxy-agent





## [2.3.1](http://github.axa.com/Digital/amf-commons-nodejs/compare/native-proxy-agent@2.3.0...native-proxy-agent@2.3.1) (2019-08-22)


### Bug Fixes

* **native-proxy-agent:** the protocol for getting the agent was wrong. Correct syntax is https: or http ([#25](http://github.axa.com/Digital/amf-commons-nodejs/issues/25)) ([971a583](http://github.axa.com/Digital/amf-commons-nodejs/commit/971a583)), closes [#24](http://github.axa.com/Digital/amf-commons-nodejs/issues/24)





# [2.3.0](http://github.axa.com/Digital/amf-commons-nodejs/compare/native-proxy-agent@2.2.0...native-proxy-agent@2.3.0) (2019-07-11)


### Features

* **native-proxy-agent:** add two new methods for explicit create and http an https forever agent ([41cba08](http://github.axa.com/Digital/amf-commons-nodejs/commit/41cba08))





# [2.2.0](http://github.axa.com/Digital/amf-commons-nodejs/compare/native-proxy-agent@2.1.0...native-proxy-agent@2.2.0) (2019-07-11)


### Features

* **native-proxy-agent:** add a createForeverAgent ([e4c7ea8](http://github.axa.com/Digital/amf-commons-nodejs/commit/e4c7ea8)), closes [#19](http://github.axa.com/Digital/amf-commons-nodejs/issues/19)





# 2.1.0 (2019-07-09)


### Features

* **native-proxy-agent:** Improve http agent ([#18](http://github.axa.com/Digital/amf-commons-nodejs/issues/18)) ([553760c](http://github.axa.com/Digital/amf-commons-nodejs/commit/553760c)), closes [#17](http://github.axa.com/Digital/amf-commons-nodejs/issues/17)
* **native-proxy-agent,multipart-request-builder:** add two new modules ([#15](http://github.axa.com/Digital/amf-commons-nodejs/issues/15)) ([4d93a44](http://github.axa.com/Digital/amf-commons-nodejs/commit/4d93a44)), closes [#14](http://github.axa.com/Digital/amf-commons-nodejs/issues/14)





# 2.0.0 (2019-07-03)

### Features

- **native-proxy-agent:** first release on amf-commons-nodejs
- **native-proxy-agent:** remove keep alive agent option true by default

# [2.0.0-alpha.8](http://github.axa.com/Digital/bauta-nodejs/compare/v2.0.0-alpha.7...v2.0.0-alpha.8) (2019-06-11)

### Bug Fixes

- **bautajs, bautajs-express:** operations where exposed twice ([4b0afc8](http://github.axa.com/Digital/bauta-nodejs/commit/4b0afc8)), closes [#69](http://github.axa.com/Digital/bauta-nodejs/issues/69)

### BREAKING CHANGES

- **bautajs, bautajs-express:** dataSourceCtx parameter has becomed dataSourceStatic and can be accessed by `$static.` word inside the dataSources

* Improve express update route algorithm

# [2.0.0-alpha.7](http://github.axa.com/Digital/bauta-nodejs/compare/v2.0.0-alpha.6...v2.0.0-alpha.7) (2019-06-06)

### Bug Fixes

- **bautajs, bautajs/express:** No more crash on create documentation. Get ride of the not used schema definitions. ([1f2bf7f](http://github.axa.com/Digital/bauta-nodejs/commit/1f2bf7f)), closes [#68](http://github.axa.com/Digital/bauta-nodejs/issues/68) [#67](http://github.axa.com/Digital/bauta-nodejs/issues/67)

# [2.0.0-alpha.6](http://github.axa.com/Digital/bauta-nodejs/compare/v2.0.0-alpha.5...v2.0.0-alpha.6) (2019-06-05)

### Bug Fixes

- dataSource from operation must be a private variable ([1bb3f5d](http://github.axa.com/Digital/bauta-nodejs/commit/1bb3f5d))
- **bautajs:** ctx.data was not transmited between operations on run ([1462734](http://github.axa.com/Digital/bauta-nodejs/commit/1462734))

### Features

- **bautajs:** operation.run() req and res are not mandatory anymore ([d6bb9d4](http://github.axa.com/Digital/bauta-nodejs/commit/d6bb9d4))

### BREAKING CHANGES

- operation.dataSource(ctx).request() can not be performed anymore. DataSource is only accesible inside the operation pipeline.

Use instead operation.run()

# [2.0.0-alpha.4](http://github.axa.com/Digital/bauta-nodejs/compare/v2.0.0-alpha.3...v2.0.0-alpha.4) (2019-06-04)

### Bug Fixes

- **bautajs,bautajs-express:** pipeline decorator has an invalid type of parameter ([46e1b97](http://github.axa.com/Digital/bauta-nodejs/commit/46e1b97))

# [2.0.0-alpha.3](http://github.axa.com/Digital/bauta-nodejs/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) (2019-06-03)

### Bug Fixes

- **bautajs-decorators:** request decorator must return as TOut a non promise object ([09fb936](http://github.axa.com/Digital/bauta-nodejs/commit/09fb936))

# [2.0.0-alpha.2](http://github.axa.com/Digital/bauta-nodejs/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2019-06-03)

**Note:** Version bump only for package native-proxy-agent

# [2.0.0-alpha.1](http://github.axa.com/Digital/bauta-nodejs/compare/v2.0.0-alpha.0...v2.0.0-alpha.1) (2019-06-03)

**Note:** Version bump only for package native-proxy-agent

# [2.0.0-alpha.0](http://github.axa.com/Digital/bauta-nodejs/compare/v1.2.2...v2.0.0-alpha.0) (2019-06-03)

### Features

- move to typescript [#49](http://github.axa.com/Digital/bauta-nodejs/issues/49) ([#65](http://github.axa.com/Digital/bauta-nodejs/issues/65)) ([2fa2676](http://github.axa.com/Digital/bauta-nodejs/commit/2fa2676)), closes [#59](http://github.axa.com/Digital/bauta-nodejs/issues/59) [#62](http://github.axa.com/Digital/bauta-nodejs/issues/62)

### BREAKING CHANGES

- dataSource compilation parameters had change, now no ctx has to be passed
- dataSource url can not be changed on dataSource.request() function, request() only allow Got options.
- .push method now only accepts a function with the given signature (value, ctx) => any
- loopbackFilter dataSource option has been moved to a standalone package @bautajs/filters-decorator
- service.myService.version.operation.push has been moved to operation.setup(pipeline => pipeline.push()) to allow better code intellisense
- Step class has been removed
- service.myService.version.push has been removed
- service.myService.version.operation.exec has been replaced for operation.run
- context.req and context.res are now mandatory parameters on run the operation pipeline
- dataSource.request() now returns an object with asBody(), asStream(), asResponse()
- dataSource resolveBodyOnly has been deleted from dataSource now use only on the request, dataSource.request({ resolveBodyOnly:false })
- dataSource stream options has been removed, now use use only on the request, dataSource.request({ stream:true })
- decorators has been moved from 'bautajs/decorators/..' to an standalone package '@bautajs/decorators'
- context.req and context.res are now mandatory parameters on run the operation pipeline

## [1.2.2](http://github.axa.com/Digital/bauta-nodejs/compare/v1.2.1...v1.2.2) (2019-05-08)

### Features

- **batuajs,bautajs-express:** add strict definition filter for explorer ([#64](http://github.axa.com/Digital/bauta-nodejs/issues/64)) ([02d9a4b](http://github.axa.com/Digital/bauta-nodejs/commit/02d9a4b)), closes [#63](http://github.axa.com/Digital/bauta-nodejs/issues/63)

## [1.1.1](http://github.axa.com/Digital/bauta-nodejs/compare/v1.1.0...v1.1.1) (2019-03-22)

**Note:** Version bump only for package native-proxy-agent

## [1.0.1](http://github.axa.com/Digital/bauta-nodejs/compare/v1.0.0...v1.0.1) (2019-03-06)

**Note:** Version bump only for package native-proxy-agent

# [1.0.0](http://github.axa.com/Digital/bauta-nodejs/compare/v1.0.0-alpha.0...v1.0.0) (2019-03-06)

**Note:** Version bump only for package native-proxy-agent

# 1.0.0-alpha.0 (2019-02-26)

### Features

- **bautajs:** fixed test, move to a class aproach, removed next, previous and loaders concept. ([ffcfe6e](http://github.axa.com/Digital/bauta-nodejs/commit/ffcfe6e))
- more of before ([5e9bb66](http://github.axa.com/Digital/bauta-nodejs/commit/5e9bb66))
