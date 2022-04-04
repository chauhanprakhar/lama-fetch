import {Sequelize} from 'sequelize'
import fetch from 'node-fetch'

// Connect to database
// const sequelize = new Sequelize('nft', 'postgres', 'prakhar', {
//   host: 'localhost',
//   port: '5432',
//   dialect: 'postgres'
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
let res;

async function main() {
  const response = await fetch('https://api.llama.fi/protocols');
  const data = await response.json();
  res = data
}
await main()

let slugs = res.map(e => {
  return e.slug
})


let chainlength;
let dataArray =[];
let resObj = {};

async function main2() {
    return Promise.all(
      slugs.map(async (item, index) => {
        setTimeout(async () => {
          const response = await fetch(`https://api.llama.fi/protocol/${item}`);
          const data = await response.json();
          // let chainlen = Object.keys(data.chainTvls)
          // Object.keys(data.chainTvls).map(e => {
          //   let k =  
          // })
          let arr = [];
          let objtvl = {}
          let finObj = {}
          let objusdarray = [];
          let objtokenarray = [];
          let k = Object.keys(data.chainTvls)
          let v = Object.values(data.chainTvls)
          console.log(item)
          for(var i = 0;i< k.length;i++){
             objtvl.name = item
             objtvl.chain = k[i]
             objtvl.category = data.category
             let len = v[i].tvl.length
             objtvl.timestamp = v[i].tvl[len -1].date
             objtvl.value = v[i].tvl[len -1].totalLiquidityUSD
             if(v[i].tokensInUsd){
             let leng = v[i].tokensInUsd.length
             if(leng > 0){
              let objUsd = {};
              let keyArray = Object.keys(v[i].tokensInUsd[leng -1].tokens)
              let valArray = Object.values(v[i].tokensInUsd[leng -1].tokens)
              for(var j =0;j < keyArray.length;j++){
                objUsd.name = item
                objUsd.chain = k[i]
                objUsd.category = data.category
                objUsd.timestamp = v[i].tokensInUsd[leng -1].date
                objUsd.token = keyArray[j]
                objUsd.value = valArray[j]
              }
              objusdarray.push(objUsd)
             }
            }
            if(v[i].tokens){
             let lengt = v[i].tokens.length
             if(lengt > 0){
              let objtokens = {};
              let keyArray = Object.keys(v[i].tokens[lengt -1].tokens)
              let valArray = Object.values(v[i].tokens[lengt -1].tokens)
              for(var j =0;j < keyArray.length;j++){
                objtokens.name = item
                objtokens.chain = k[i]
                objtokens.category = data.category
                objtokens.timestamp = v[i].tokensInUsd[lengt -1].date
                objtokens.token = keyArray[j]
                objtokens.value = valArray[j]
              }
              objtokenarray.push(objtokens)
             }
            }
             finObj.tvl = objtvl
             finObj.Usd = objusdarray? objusdarray: {}
             finObj.tokens = objtokenarray? objtokenarray: {}
          }
          console.log(finObj)
          dataArray.push(finObj)
        }, 1000*index)
      })
    )
}


async function callerFun(){
  // console.log("Caller");
  await main2()
  console.log(dataArray);
}

callerFun();


