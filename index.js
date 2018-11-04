let wordCtrl = require('./controllers/wordcontroller');

if(process.argv[2]=="dict" && process.argv[3])
{
    switch(process.argv[3]) {
        case "def":
            if(process.argv[4])
                wordCtrl.getDefinition(process.argv[4]);
            else
                console.log("Invalid input")
            break;
        case "syn":
            if(process.argv[4])
                wordCtrl.getSynonyms(process.argv[4]);
            else
                console.log("Invalid input")
            break;
        case "ant":
            if(process.argv[4])
                wordCtrl.getAntonyms(process.argv[4])
            else
                console.log("Invalid input")
            break;
        case "ex":
            if(process.argv[4])
                wordCtrl.getExamplesForWord(process.argv[4]);
            else
                console.log("Invalid input")
            break;
        case "play":
                wordCtrl.playWordGame();
                break;
        case "dict":
                if(process.argv[4])
                    wordCtrl.getAllDetails(process.argv[4]);
                else
                    console.log("Invalid input");
                break;
        default:
            if(process.argv[3])
                wordCtrl.getAllDetails(process.argv[3]);
            else
                console.log("Invalid input");
            break;
    }   
}


