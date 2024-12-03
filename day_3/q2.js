const fs = require('node:fs/promises');
const ddRegex = /((do\(\)).+?(don't\(\)))/g;
const mulRegex = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
async function getData(file) {
  try {
    const data = await fs.readFile(file , { encoding: 'utf8' });
    return formatData(data);
  } catch (err) {
    console.log(err);
  }
}

function formatData(data){
    let instruction = []
    //stripped newlines as it was causing issues with regex.
    data = data.replace(/(\r\n|\n|\r)/gm, "");
    const conditional = data.match(ddRegex);
    for(let i = 0; i < conditional.length; i++){
        instruction.push(conditional[i].match(mulRegex));
    }
    return instruction.flat();
}

function runMulCommand(instruction){
    nums = instruction.match(/[0-9]{1,3}/g)
    return parseInt(nums[0]) * parseInt(nums[1]);
}

async function main(){
    let instructions = await getData("data.txt");
    let total = 0;
    for(let i = 0; i < instructions.length; i++){
        total += runMulCommand(instructions[i]);
    }
    console.log(total);
}



main();

