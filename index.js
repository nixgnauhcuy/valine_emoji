const fs = require('fs')
const path = require('path')

const dirs = fs.readdirSync('./')
let faces = {}
for(let dir of dirs){
  if(fs.statSync(dir).isDirectory() && dir !== '.git'){
    let face = {}
    const files = fs.readdirSync(dir)
    if(files.includes('valine.json')){
      faceJson = JSON.parse(fs.readFileSync(path.join(dir,'valine.json')))
      for(let file of Object.keys(faceJson)){
        face[file] = `${dir}/${faceJson[file]}`
      }
    }else{
      for (let file of files) {
        face[file.reolace(/\.(jpg|png|jpeg|webp)$/, "")] = `${dir}/${file}`
      }
    }
    faces = {...faces, ...face}
  }
}
fs.writeFileSync('valine.json', JSON.stringify(faces, null, 4))