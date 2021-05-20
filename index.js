const readline = require('readline')
const weather = require('weather-js')

const data = [
    {
        name: "bonjour",
        answertype: 'normal',
        words: ['salut', 'wsh', 'yo', 'bonjour', 'wesh', 'cc', 'coucou'],
        important: [],
        answers: ['bonjour', 'salut', 'yo'],
        after: [','],
        getinfoafter: [],
        minimalmatch: 1,
        minimalpercent: 0
    },
    {
        name: 'humeur',
        answertype: 'normal',
        words: ['comment', 'ça', 'sa', 'ca', 'va', 'tu', 'vas'],
        important: [],
        answers: ['je vais bien', 'ça va bien'],
        after: [],
        getinfoafter: [],
        minimalmatch: 3,
        minimalpercent: 0
    },
    {
        name: 'humeur',
        answertype: 'normal',
        words: ['quelle', 'quel', 'humeur', 'ton', 'comment'],
        important: ['humeur'],
        answers: ['je vais bien', 'ça va bien'],
        after: [],
        getinfoafter: [],
        minimalmatch: 3,
        minimalpercent: 0
    },
    {
        name: 'insultes',
        answertype: 'normal',
        words: ['connard', 'enculé', 'fdp', 'ntm', 'pute', 'con', 'tg'],
        important: [],
        answers: ['ne m\'insute pas', 'espèce de connard'],
        after: [],
        getinfoafter: [],
        minimalmatch: 1,
        minimalpercent: 0
    },
    {
        name: 'help',
        answertype: 'question',
        words: ['ai', 'aide', 'besoin', 'veux', 'je', 'aide', 'peux', 'aide'],
        important: [],
        answers: ['en quoi puis-je vous aider'],
        after: [],
        getinfoafter: [],
        minimalmatch: 3,
        minimalpercent: 0
    },
    {
        name: 'whatismyname',
        answertype: 'normal',
        words: ['est', 'quoi', 'quel', 'quelle', 'mon', 'ma', 'prénom', 'comment', 'je', 'appelle'],
        important: ['nom', 'prenom', 'appelle'],
        answers: ['ton nom est Shawiiz_z'],
        after: [],
        getinfoafter: [],
        minimalmatch: 3,
        minimalpercent: 0
    },
    {
        name: 'whatismyip',
        answertype: 'normal',
        words: ['est', 'quoi', 'quel', 'quelle', 'mon', 'ma', 'ip'],
        important: ['ip'],
        answers: ['ton ip est 92.184.112.150'],
        after: [],
        getinfoafter: [],
        minimalmatch: 3,
        minimalpercent: 0
    },
    {
        name: 'balek',
        answertype: 'normal',
        words: ['je', 'en', 'bat', 'couille', 'couilles', 'fou', 'fous', 'blc', 'osef'],
        important: [],
        answers: ['ah', 'pas cool ça', 'mais pourquoi :c', ':('],
        after: [],
        getinfoafter: [],
        minimalmatch: 2,
        minimalpercent: 0
    },
    {
        name: 'dev',
        answertype: 'normal',
        words: ['en', 'quel', 'quelle', 'langage', 'language', 'code', 'programmation', 'fait', 'été', 'codé', 'dev'],
        important: [],
        answers: ['je suis dev en javaskript'],
        after: [],
        getinfoafter: [],
        minimalmatch: 3,
        minimalpercent: 0
    },
    {
        name: 'couleur',
        answertype: 'normal',
        words: ['quel', 'quelle', 'couleur', 'pref', 'préférée', 'est', 'ta', 'quoi'],
        important: ['couleur'],
        answers: ["ma couleur préférée est le bleu", "j'aime bien le bleu", "le bleu c'est cool"],
        after: [],
        getinfoafter: [],
        minimalmatch: 3,
        minimalpercent: 0
    },
    {
        name: 'autreassistants',
        answertype: 'normal',
        words: ['tu', 'aime', 'aimes', 'siri', 'google', 'assisant', 'alexa'],
        important: [],
        answers: ["oui j'aime bien les autres assistants", "il ne faut pas le dire, mais je préfère Google Assistant à Siri et Alexa"],
        after: [],
        getinfoafter: [],
        minimalmatch: 3,
        minimalpercent: 0
    },
    {
        name: 'herue',
        answertype: 'normal',
        words: ['quelle', 'quel', 'heure', 'est', 'il', 'est-il'],
        important: ['heure'],
        answers: ["il est " + getHour(), "actuellement il est " + getHour()],
        after: [],
        getinfoafter: [],
        minimalmatch: 3,
        minimalpercent: 0
    },
    {
        name: 'temps',
        answertype: 'normal',
        words: ['quelle', 'quel', 'temps', 'fait', 'il', 'fait-il', 'a', 'à'],
        important: ['temps'],
        answers: ['il fait {0}°C à {1} aujourd\'hui à {2}'],
        after: [],
        getinfoafter: [' à ', ' a ', ' de ', ' dans '],
        function: getWeather,
        minimalmatch: 3,
        minimalpercent: 0
    },
    {
        name: 'ok',
        answertype: 'normal',
        words: ['ok', 'okay', 'dac', 'dacc', "d'accord"],
        important: [],
        answers: ['cool', "d'accord", 'ça marche'],
        after: [],
        getinfoafter: [],
        minimalmatch: 1,
        minimalpercent: 80
    }
]

function getWeather(ville) {
    return new Promise(async (resolve) => {
        weather.find({ search: ville, degreeType: 'C' }, (err, res) => {
            if (err) resolve(['inconnu', 'inconnu', 'inconnu'])
            try {
                resolve([res[0].current.temperature, res[0].location.name, res[0].current.observationtime])
            } catch (e) {
                //Peut être ici donner la météo locale ?
                resolve(['inconnu', 'inconnu', 'inconnu'])
            }
        })
    });
}

function getHour() {
    return new Date().getHours() + "h" + new Date().getMinutes()
}

async function processString(message) {
    let builtSentence = []
    let outSentence = ''

    for (const phrase of message.split(/[.?!]/).join(' et ').split(' et ')) {
        const words = removeShit(phrase.toLowerCase().replace(/,/g, '').replace(/é/g, 'e')).split(' ')

        for (const req of data) {
            const match = numberOfWordMatch(words, req.words)
            if (message.length <= 3 && req.minimalmatch >= 3) req.minimalmatch--
            if (match < req.minimalmatch || (match < req.minimalmatch && req.minimalpercent > 0 && (message.split(' ').length / 100 * match) < req.minimalpercent) || (req.important.length > 0 && numberOfWordMatch(words, req.important) < 1)) continue

            builtSentence.push(req)
        }
    }

    if (builtSentence.length > 0) {
        let i = 0
        let add = ''
        for (const data of builtSentence) {
            i++

            const up = ['?', '.', '!'].includes(outSentence.slice(-2).replace(/ /g, '')) || (outSentence.length < 2)

            if (builtSentence.length === i)
                add = data.answertype === 'normal' ? ran(['.', ' !']) : ' ?'
            else
                if ([3, 6, 9, 12, 15, 18].includes(i))
                    add = data.answertype === 'normal' ? '. ' : ' ? '
                else
                    add = data.after.length > 0 ? ran(data.after) + ' ' : (up && ((builtSentence.length - i + 1) >= 3)) || add.includes('et') ? ', ' : ' et '

            let rndm = ran(data.answers)

            const resultsData = stringContainsList(message, data.getinfoafter)

            if (data.getinfoafter.length > 0 && resultsData.length > 0) {
                for (const result of resultsData) {
                    const parsedData = message.split(result)[1].split(" ")[0]
                    const answer = await data.function(parsedData)
                    rndm = ran(data.answers).format(...answer)
                }
            }

            outSentence += (up ? rndm.charAt(0).toUpperCase() + rndm.slice(1) : rndm) + add
        }

    } else outSentence = "Je n'ai pas compris"

    return outSentence
}

String.prototype.format = function () {
    let args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
};

function stringContainsList(s, l) {
    let results = []
    for (const a of l)
        if (s.includes(a))
            results.push(a)
    return results
}

function ran(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function numberOfWordMatch(words, dataword) {
    let numberMatch = 0
    for (const word of words)
        if (dataword.includes(word))
            numberMatch++
    return numberMatch
}

function removeShit(s) {
    let b = ''
    s.split('\'').forEach(e => b += e.slice(0, -1))
    b += s.slice(-1)
    return b
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask() {
    rl.question('Message : ', async (answer) => {
        console.log((await processString(answer)));
        ask()
    });
}
ask()
