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
    const lines = data.split('\n');
    const listA = [];
    const listB = [];

    for( let i = 0; i < lines.length; i++){
        const line = lines[i].split('   ');
        if(line[0] === ''){
            continue;
        }
        if(line[1] === ''){
            continue;
        }
        listA.push(parseInt(line[0]));
        listB.push(parseInt(line[1]));
    }
    const fData = {
        listA: listA,
        listB: listB,
    }
    return fData;
}

async function  main(){
    let data = await getData("data.txt");
    const listA = data.listA.sort();
    const listB = data.listB.sort();
    let answer = 0;
    for( let i = 0; i < listB.length; i++){

        answer += (Math.max(listA[i],listB[i]) - Math.min(listA[i],listB[i]))
    }
    console.log(answer);
}

main();

