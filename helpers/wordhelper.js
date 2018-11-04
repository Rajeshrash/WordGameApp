let axios = require('axios');
let consts = require('../const');

let getDefinitionHelper = (word) => {
    return new Promise((resolve,reject)=>{
        let definitionEndPoint = consts.apiEndPoints.definition.replace('@word',word);
        axios.get(definitionEndPoint,{
            'headers': { 'app_key': consts.app_consts.app_key,'app_id':consts.app_consts.app_id,'content-type':'application/json' }
       }).then((response)=>{
        let definitions =[];
        response.data.results[0].lexicalEntries.forEach(lentry=>{
            lentry.entries.forEach(entry=>{
                entry.senses.forEach(sense => {
                    sense.definitions.forEach(x=>{
                            definitions.push(x);
                    })
                })
            })
        })
        return resolve(definitions);
       }).catch((err)=>{
        return reject({"Error":"Couldn't find definitions"});
       })
    })
}

let getExamplesHelper = (word) => {
    return new Promise((resolve, reject) => {
        let examplesEndPoint = consts.apiEndPoints.example.replace('@word',word);
        axios.get(examplesEndPoint,{
             'headers': { 'app_key': consts.app_consts.app_key,'app_id':consts.app_consts.app_id,'content-type':'application/json' }
        }).then((response) => {
            let examples =[];
            response.data.results[0].lexicalEntries.forEach(element => {
                element.sentences.forEach(x =>{
                    examples.push(x.text);
                })
            });
            return resolve(examples);    
        }).catch((err) => {
            return reject("Could not find sentences with word");
        })
    })
}

let getSynonymHelper = (word) => {
    return new Promise((resolve,reject)=>{
        let synonymEndPoint = consts.apiEndPoints.synonyms.replace('@word',word);
        axios.get(synonymEndPoint,{
            'headers': { 'app_key': consts.app_consts.app_key,'app_id':consts.app_consts.app_id,'content-type':'application/json' }
       }).then((response)=>{
        let synonyms =[];
        response.data.results[0].lexicalEntries.forEach(lentry=>{
            lentry.entries.forEach(entry=>{
                entry.senses.forEach(sense => {
                    sense.synonyms.forEach(x=>{
                            synonyms.push(x.text);
                    })
                })
            })
        })
        return resolve(synonyms);
       }).catch((err)=>{
        return reject({"Error":"Couldn't find synonyms"});
       })
    })
}

let getAntonymHelper = (word) =>{
    return new Promise((resolve,reject)=>{
        let antonymEndPoint = consts.apiEndPoints.antonyms.replace('@word',word);
        axios.get(antonymEndPoint,{
            'headers': { 'app_key': consts.app_consts.app_key,'app_id':consts.app_consts.app_id,'content-type':'application/json' }
       }).then((response)=>{
        let antonyms =[];
        response.data.results[0].lexicalEntries.forEach(lentry=>{
            lentry.entries.forEach(entry=>{
                entry.senses.forEach(sense => {
                    sense.antonyms.forEach(x=>{
                            antonyms.push(x.text);
                    })
                })
            })
        })
        return resolve(antonyms);
       }).catch((err)=>{
        return reject({"Error":"Couldn't find antonyms"});
       })
    })
}

let getRandomWord =() =>{
    return new Promise((resolve,reject)=>{
        axios.get(consts.apiEndPoints.random_words).then((response)=>{
            let idx = Math.floor(Math.random() * 40);
            resolve(Object.keys(response.data)[idx].toString().trim());
        }).catch((err)=>{
            return reject(err);
        })
    })
    
}

let displayHint= async(rand_word,type) =>{
    try{
        if(type=="0"){
            try{
                let definition = await getDefinitionHelper(rand_word);
                if(definition && definition.length!=0)
                console.log("This is the definition of the word: " + definition[Math.floor(Math.random() * Math.floor(definition.length))])
            }
            catch(e){
                let shuffledarr=shuffleArray(Array.from(rand_word));
                console.log("The scrambled form of letter is "+shuffledarr.join(''))
            }

        }
        else if(type=="1"){
            try{
                let synonyms = await getSynonymHelper(rand_word);
            if(synonyms && synonyms.length!=0)
                console.log("This is the synonym of the word: " + synonyms[Math.floor(Math.random() * Math.floor(synonyms.length))])
            }
            catch(e){
                let shuffledarr=shuffleArray(Array.from(rand_word));
                console.log("The scrambled form of letter is "+shuffledarr.join(''))
            }
        }
        else if(type=="2"){
            try{
                let antonyms = await getAntonymHelper(rand_word);
            if(antonyms && antonyms.length!=0)
                console.log("This is the antonym of the word: " + antonyms[Math.floor(Math.random() * Math.floor(antonyms.length))])
            }
            catch(e){
                let shuffledarr=shuffleArray(Array.from(rand_word));
                console.log("The scrambled form of letter is "+shuffledarr.join(''))
            }
        }
        else if(type=="3"){
            let shuffledarr=shuffleArray(Array.from(rand_word));
            console.log("The scrambled form of letter is "+shuffledarr.join(''))
        }
        console.log("Guess the word");
    }
    catch(e){
        console.log(e)
    }
}

let playWordGame = async() => {
    let rand_word = await getRandomWord();
    console.log("Answer is being printed to verify the correctness of the code and the answer is: "+rand_word); // can comment it just for debugging purposes
    let idx = Math.floor(Math.random() * Math.floor(3));
    await displayHint(rand_word,idx);   
    let stdin = process.openStdin();
    stdin.addListener("data",(d)=>{
        if(d.toString().trim()==rand_word){
            console.log("Congratulations you got it right");
            process.exit();
        }
        else if(d.toString().trim()=="1" || d.toString().trim()=="2"|| d.toString().trim()=="3" )
        {
            if(d.toString().trim()=="3"){
                console.log("The answer is: "+rand_word);
                getAllDetails(rand_word).then((response)=>{
                    process.exit();
                }).catch((err)=>{
                    console.error(err);
                })
            }
            else if(d.toString().trim()=="2"){
                let rand_option = Math.floor(Math.random() * Math.floor(4));
                displayHint(rand_word,rand_option);
            }
            else if(d.toString().trim()=="1"){
                console.log("Please enter the word again");
            }
        }
        else {
            console.log("You got it wrong");
            let idx = Math.floor(Math.random() * Math.floor(4));
            console.log("1.Would to like to try again");
            console.log("2.Need a hint");
            console.log("3.Quit");
        }
    })
}

let getAllDetails = async(word) =>{
        let dictDetails={}
        try{
            dictDetails.definitions = await getDefinitionHelper(word);
        }
        catch(e){
            dictDetails.definitions=[];
        }
        try{
            dictDetails.synonyms = await getSynonymHelper(word);
        }
        catch(e){
            dictDetails.synonyms = [];
        }
        try{
            dictDetails.antonyms = await getAntonymHelper(word);
        }
        catch(e){
            dictDetails.antonyms = [];
        }
        try{
            dictDetails.examples = await getExamplesHelper(word);
        }
        catch(e){
            dictDetails.examples = []
        }
        prettyPrint(dictDetails);
}

let prettyPrint=(result) =>{
    console.log("\n");
    let fields = Object.keys(result);
    fields.forEach(element => {
        console.log("*****************"+element.toUpperCase()+"***********************\n");
        if(result[element] && result[element].length!=0){
            if(result[element].length>8){
                for(let i=0;i<8;i++){
                    let idx = getRandomInt(result[element].length-1);
                    console.log((i+1)+". "+result[element][idx])
                    result[element].splice(idx,1);
                }
            }
            else{
                for(let i=0;i<result[element].length;i++){
                    console.log((i+1)+". "+result[element][i]);
                }
            }
        }
        //console.log("\n*************************************************\n")
        console.log("\n");
    });
}

let shuffleArray=(array)=>{
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
  }
  return array;
}

let getRandomInt=(length)=>{
    return Math.floor(Math.random() * Math.floor(length))
}

module.exports = {
    getDefinitionHelper,
    getExamplesHelper,
    getSynonymHelper,
    getAntonymHelper,
    getRandomWord,
    playWordGame,
    getAllDetails,
    prettyPrint
}