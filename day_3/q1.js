const fs = require('node:fs/promises');
const regex = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
async function getData(file) {
  try {
    const data = await fs.readFile(file , { encoding: 'utf8' });
    return formatData(data);
  } catch (err) {
    console.log(err);
  }
}

function formatData(data){
    const instruction = data.match(regex);
    return instruction;
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

