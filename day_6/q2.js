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
    const xword = [];
    let rows = data.split('\n');
    for(let i = 0; i < rows.length; i++){
      xword.push(rows[i].split(''));
    }
    return xword;
}

function findXMas(xword){
  let total = 0;
  for(let i = 2; i < xword.length; i++){
    for(let k = 2; k < xword[i].length; k++){
    
      // North Check
      if(xword[i][k] == 'S' && xword[i-2][k] == 'M' && xword[i-2][k-2] == 'M' && xword[i][k-2] == 'S' && xword[i-1][k-1] == 'A'){
        total ++;
      }
      // South Check
      if(xword[i][k] == 'M' && xword[i-2][k] == 'S' && xword[i-2][k-2] == 'S' && xword[i][k-2] == 'M' && xword[i-1][k-1] == 'A'){
        total ++;
      }
      // East Check
      if(xword[i][k] == 'S' && xword[i-2][k] == 'S' && xword[i-2][k-2] == 'M' && xword[i][k-2] == 'M' && xword[i-1][k-1] == 'A'){
        total ++;
      }
      // West Check
      if(xword[i][k] == 'M' && xword[i-2][k] == 'M' && xword[i-2][k-2] == 'S' && xword[i][k-2] == 'S' && xword[i-1][k-1] == 'A'){
        total ++;
      }
    }
  }
  return total;
}

function search(xword){
  return findXMas(xword);
}

async function main(){
    let xword = await getData("data.txt");
    let total = search(xword)
    console.log(total);
    
}
main();

