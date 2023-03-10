const replace = require('replace-in-file');
const fs = require('fs');

const {execSync} = require('child_process');

execSync('npm version patch --commit-hooks false --git-tag-version false');

const pkg = JSON.parse(fs.readFileSync('./package.json'));

replace.sync({
    files: './composer.json',
    from: /("version": ")([^"]+)/ig,
    to: '$1' + pkg.version
});

replace.sync({
    files: './composer.json',
    from: /"https:\/\/github.com\/iamntz\/carbon-fields-urlpicker\/releases\/download\/v[^/]+\/carbon-fields-urlpicker.zip"/ig,
    to: `"https://github.com/iamntz/carbon-fields-urlpicker/releases/download/v${pkg.version}/carbon-fields-urlpicker.zip"`
})

const hash = execSync('git rev-parse HEAD').toString().trim();

replace.sync({
    files: './composer.json',
    from: /("reference": ")[^"]+/ig,
    to: `$1${hash}`
})

