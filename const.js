let apiEndPoints = {
    "antonyms":"https://od-api.oxforddictionaries.com:443/api/v1/entries/en/@word/antonyms",
    "synonyms":"https://od-api.oxforddictionaries.com:443/api/v1/entries/en/@word/synonyms",
    "definition":"https://od-api.oxforddictionaries.com:443/api/v1/entries/en/@word",
    "example":"https://od-api.oxforddictionaries.com/api/v1/entries/en/@word/sentences",
    "random_words":"https://s3.ap-south-1.amazonaws.com/automatebucketrajesh/randomwords.json"
}

let app_consts ={
    "app_key":"5da1677c1afa8f65a9619f401868ca5d",
    "app_id":"f7cb4589"
}

let random_words = [
"seat",
"half",
"elderly",
"screeching",
"fixed",
"expert",
"astonishing",
"blushing",
"kick",
"ball",
"best",
"machine",
"anger",
"abstracted",
"lame",
"plan",
"nondescript",
"flavor",
"rings",
"solid",
"handy",
"trade",
"bomb",
"coordinated",
"scattered",
"vase",
"need",
"disapprove",
"undesirable",
"cactus",
"picture",
"hallowed",
"fretful",
"incredible",
"tasty",
"succinct",
"allow",
"tough",
"motionless",
"near",
"curvy",
"uttermost",
"cherry",
"underwear",
"committee",
"screw",
"dreary",
"hospital",
"tin",
"electric",
]

module.exports ={
    apiEndPoints,
    app_consts,
    random_words
}

