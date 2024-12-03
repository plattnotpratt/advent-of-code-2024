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

function runTest(report){
    isIncrease = report[0] < report[1];
    let sbl = false;
    let once = false;
    //console.log(isIncrease, report[0], report[1])
    const tempReport = report;
    for(let i = 1; i < tempReport.length; i++){
        
        if(isIncrease){
            if(tempReport[i-1] >= tempReport[i] ){
                if(!sbl){
                    tempReport.splice(i, 1);
                    sbl = true;
                }else{
                    return false
                }
            }
        }else{
            if(tempReport[i-1] <= tempReport[i] ){
                if(!sbl){
                    tempReport.splice(i, 1);
                    sbl = true;
                }else{
                    return false
                }
            }
        }

        // no increments less than 1 or greater than 3 
        if(Math.abs(tempReport[i-1] - tempReport[i]) >= 4 || Math.abs(tempReport[i-1] - tempReport[i]) <= 0){
            if(!sbl){
                tempReport.splice(i, 1);
                sbl = true;
            }else{
                return false;
            }
        }
        if(sbl && !once){
            i--;
            once = true;
        }
    }
    return true;
}

async function  main(){
    let data = await getData("data.txt");
    let count= 0; 
    
    for(let i = 0; i < data.length; i++){
        //console.log(runTest(data[i]), data[i]);
        if(runTest(data[i])){
            count++;
        }else{
            //do nothing
        }
    }
    console.log(count);
}

main();

