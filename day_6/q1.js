// lost data, need to reprogram

const fs = require('node:fs/promises');
async function getData(file) {
  try {
    const data = await fs.readFile(file , { encoding: 'utf8' });
    return formatData(data);
  } catch (err) {
    console.log(err);
  }
}

function formatData(data){
    const grid = [];
    let rows = data.split('\n');
    for(let i = 0; i < rows.length; i++){
      const tempArray = rows[i].split('');
      for(let k = 0; k < tempArray.length; k++){
        if(tempArray[k] == '^'){
          tempArray[k] = {mapElem: tempArray[k], attended: true}
        }else{
          tempArray[k] = {mapElem: tempArray[k], attended: false}
        }
      }
      grid.push(tempArray)
    }
    return grid;
}



async function main(){
    let grid = await getData("test_data.txt");
    console.log(grid);
    
}
main();

