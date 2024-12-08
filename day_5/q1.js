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
    let pageOrders = [];
    let rules = [];
    const temp = data.split('\n\n');
    rules = temp[0].split('\n');
    for(let i = 0; i < rules.length; i++){
      rules[i] = rules[i].split('|');
      for(let k = 0 ; k < rules[i].length; k++){
        rules[i][k] = parseInt(rules[i][k]);
      }
    }
    pageOrders = temp[1].split('\n');
    for(let i = 0; i < pageOrders.length; i++){
      pageOrders[i] = pageOrders[i].split(',');
      for(let k = 0; k < pageOrders[i].length; k++){
        pageOrders[i][k] = parseInt(pageOrders[i][k]);
      }
    }
    return {pageOrders, rules};
}

function pagesInOrder(pageOrder, rule){
  if(pageOrder.indexOf(rule[0]) >= 0 && pageOrder.indexOf(rule[1]) >= 0){
    return pageOrder.indexOf(rule[0]) < pageOrder.indexOf(rule[1]);
  }else{
    return true
  }
}

function getMiddleNumber(pageOrder){
  return pageOrder[Math.floor(pageOrder.length / 2)]
}

function checkPageOrder(pageOrder, rules){
  let check = true
  for(let i = 0; i < rules.length; i++){

    if(!pagesInOrder(pageOrder, rules[i])){
      check = false
    }
  }
  if(check){
    return getMiddleNumber(pageOrder);
  }else{
    return 0;
  }
}


async function main(){
  let total = 0;
  let data = await getData("data.txt");
  for(let i = 0; i < data.pageOrders.length; i++){
    //console.log(checkPageOrder(data.pageOrders[i], data.rules));
    total += checkPageOrder(data.pageOrders[i], data.rules);
  }
  console.log(total);
  //console.log(data)  
}
main();

