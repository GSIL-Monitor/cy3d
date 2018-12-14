var fse = require('fs-extra')
var path = require('path')

var baseFolder = path.join(__dirname, '../')
var publishFloder = path.join(baseFolder, 'publish')
var buildFloder = path.join(baseFolder, 'build')

// copy package.json
fse.copySync(path.join(baseFolder, 'package.json'),
			path.join(publishFloder, 'package.json'))

// copy readme.md
fse.copySync(path.join(baseFolder, 'README_PUBLISH.md'),
			path.join(publishFloder, 'README.md'))

// copy build
fse.copySync(buildFloder, path.join(publishFloder, 'build'))
