const Stories = require("../Model/stories.js");
// const connectMongoDB = require("./connectMongoDB.js");
// connectMongoDB("mongodb://127.0.0.1:27017/murfapi")


async function handleAddStories(req , res)
{
  const stories = {
  "id": 2,
  "title": "The Whispering Star",
  "author": "Anya Sharma",
  "description": "A curious young astronomer discovers a secret message hidden in the light of a distant star, leading her on an extraordinary journey of discovery.",
  "duration": "10 min",
  "category": "Science Fiction",
  "ageGroup": "10-14 years",
  "tags": ["Space", "Mystery", "Discovery", "Stars"],
  "coverColor": "from-blue-700 via-indigo-700 to-purple-700",
  "difficulty": "Intermediate",
  "story": "Elara lived for the night sky. Her small observatory, perched on a quiet hillside, was her sanctuary. One unusually clear evening, while observing a newly discovered exoplanet, she noticed something peculiar about its star, Lyra-7. Its light seemed to flicker in an unnatural, rhythmic pattern.\n\nDays turned into nights as Elara painstakingly recorded the fluctuations. She fed the data into her ancient supercomputer, hoping for a logical explanation. The computer whirred, processing the strange pulses of light.\n\nSuddenly, a series of tones chimed, and a holographic display flickered to life. On it, geometric shapes shifted, then resolved into a sequence of symbols unlike anything Elara had ever seen. It was a message, undoubtedly. But from whom? And what did it say?\n\nDriven by insatiable curiosity, Elara delved into ancient texts and forgotten languages. Months passed in a blur of research, fueled by lukewarm tea and starry nights. Finally, a pattern emerged. The symbols correlated with an ancient, long-lost language from Earth, believed to be purely mythical.\n\nThe message slowly unveiled itself: a map. Not of stars or planets, but of frequencies, energies, and a sequence for a device. A device that could, according to the cryptic instructions, 'unveil the true song of the cosmos.'\n\nWith trembling hands and a mind buzzing with possibility, Elara began to build. Her workshop became a whirlwind of wires, crystals, and humming machinery. The local villagers, accustomed to her eccentricities, simply smiled at the strange lights emanating from her hillside.\n\nOne crisp autumn night, with the Lyra-7 star directly overhead, Elara activated her creation. A low hum filled the air, escalating into a resonant thrum. The device glowed, pulsating with the same rhythmic light as Lyra-7. Then, silence.\n\nAnd in that silence, Elara heard it. Not with her ears, but with every fiber of her being. A complex symphony of the universe, the gravitational waves of distant galaxies, the birth pangs of new stars, the quiet hum of dark matter. The 'true song' was the universe itself, communicating through its fundamental forces.\n\nOverwhelmed, Elara understood. The message wasn't a call for help or a warning, but an invitation. An invitation to listen, to truly perceive the grandeur and intricate dance of existence. She was no longer just an astronomer; she was a conductor, forever attuned to the cosmic orchestra playing beyond the veil of ordinary perception."
}
    const addStories = await Stories.create(stories);
    // const allqnos = await 
    console.log(addStories);

    if(!addStories)
    {
      return res.status(400).json({error : "Error while inserting Stories sheet!"});
    }

    return res.status(200).json({msg : "Question sheet inserted successfully!"})
}


async function handleGetStoriesSheet(req,res)
{
    const sheetName = req.params.topic;
    console.log(sheetName);
    const Storiesheet = await Stories.find({title : sheetName});
    if(!Storiesheet)
    {
        return res.status(404).json({error : "Question sheet not found in database"});
    }
    console.log(Storiesheet);
    return res.status(200).json(Storiesheet);
}


async function handleGetAllStoriesSheets(req,res)
{
    const allStories = await Stories.find({});
    if(!allStories)
    {
        return res.status(404).json({error : "Question sheet not found in database"});
    }
    console.log(allStories);
    return res.status(200).json(allStories);
}


// handleAddStories();
module.exports = {handleAddStories , handleGetStoriesSheet , handleGetAllStoriesSheets}