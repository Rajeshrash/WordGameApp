let wordHelper = require('../helpers/wordhelper');

let getDefinition = (word) => {
    let result={};
    wordHelper.getDefinitionHelper(word).then((response)=>{
        result.definitions=response;
        wordHelper.prettyPrint(result);
    }).catch((err)=>{
        result.definitions=[];   
        wordHelper.prettyPrint(result);     
    })
}

let getExamplesForWord = (word) => {
    let result={};
    wordHelper.getExamplesHelper(word).then((response)=>{
        result.examples =response;
        wordHelper.prettyPrint(result);
    }).catch((err)=>{
        result.examples=[];
        wordHelper.prettyPrint(result);
    })
}

let getAntonyms = (word) => {
    let result={};
    wordHelper.getAntonymHelper(word).then((response)=>{
        result.antonyms=response;
        wordHelper.prettyPrint(result);
    }).catch((err)=>{
        result.antonyms=[];
        wordHelper.prettyPrint(result);        
    })
}

let getSynonyms = (word) => {
    let result={};
    wordHelper.getSynonymHelper(word).then((response)=>{
        result.synonyms=response;
        wordHelper.prettyPrint(result);
    }).catch((err)=>{
        result.synonyms=[];
        wordHelper.prettyPrint(result);        
    })
}

let getAllDetails = async(word)=>{
   try{
    await wordHelper.getAllDetails(word);
   }
   catch(e){
       console.error(e);
   }   
}

let getWordOfTheDay =async () =>{
    try{
        await wordHelper.getWordOfTheDay();
    }
    catch(e){
        console.error(e);
    }
}

let playWordGame = () => {
    wordHelper.playWordGame();
}

module.exports ={
    getDefinition,
    getSynonyms,
    getAntonyms,
    getExamplesForWord,
    getAllDetails,
    playWordGame,
    getWordOfTheDay
}