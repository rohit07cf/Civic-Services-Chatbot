const fse = require('fs-extra')

const source = "./src/assets";
const target = "./dist/src/assets";
try {
  fse.copySync(source, target)
  console.log('success!')
} catch (err) {
  console.error(err)
}

console.log("Asset files successfully copied!")
