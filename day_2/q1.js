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
    const reports = [];
    const lines = data.split('\n');
    for(let i = 0; i < lines.length; i++){
        temp = lines[i].split(' ');
        let tempArray = []
        for(let k = 0; k < temp.length; k++){
            tempArray.push(parseInt(temp[k]));
        }
        reports.push(tempArray);
    }
    //console.log(reports);
    return reports;
}

function isIncreaseOrDecrease(report){
    isIncrease = report[0] < report[1];
    //console.log(isIncrease, report[0], report[1])
    for(let i = 1; i < report.length; i++){
        if(isIncrease){
            if(report[i-1] >= report[i]){
                return false;
            }
        }else{
            if(report[i-1] <= report[i]){
                return false;
            }
        }
    }
    return true;
}

function isWithinThree(report){
    for(let i = 1; i < report.length; i++){
        //console.log(Math.max(report[i-1], report[i]) - Math.min(report[i-1], report[i]))
        if((Math.max(report[i-1], report[i]) - Math.min(report[i-1], report[i])) >= 4){
            return false;
        }
    }
    return true;
}

async function  main(){
    let data = await getData("data.txt");
    let count= 0; 
    
    for(let i = 0; i < data.length; i++){
        console.log(isIncreaseOrDecrease(data[i]), isWithinThree(data[i]), data[i]);
        if(isIncreaseOrDecrease(data[i]) && isWithinThree(data[i])){
            count++;
        }else{
            //do nothing
        }
    }
    console.log(count);
}

main();

