const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  category: { type: String },
  ageGroup: { type: String },
  tags: [{ type: String }],
  coverColor: { type: String },
  difficulty: { type: String },
  story: { type: String, required: true } // The actual story text
});

const Stories =  mongoose.model('stories', storySchema);

module.exports = Stories;


// {
//   id: 6,
//   title: "The Whispering Tree",
//   author: "Aarav Sen",
//   description: "In a forgotten village where nothing ever changed, a boy stumbles upon a mysterious tree that tells stories no one else can hear.",
//   duration: "45 min",
//   category: "Classic Literature",
//   ageGroup: "8-14 years",
//   tags: ["Fantasy", "Growth", "Magic", "Wisdom"],
//   coverColor: "from-teal-500 to-emerald-500",
//   difficulty: "Intermediate",
//   story: "Once upon a time, in the quiet village of Nandipur, life moved slowly. People woke with the rooster’s crow, tended to their farms, and retired when the stars painted the sky. Nothing ever changed—except for Aarush. He was a boy of twelve with a curious heart and eyes full of questions.\n\nOne evening, while chasing a kite through the wheat fields, Aarush stumbled into a part of the forest few dared to enter. There, bathed in golden sunlight, stood an ancient banyan tree. Its roots clawed deep into the earth like they had stories to tell. As Aarush sat beneath its shade to catch his breath, a soft voice whispered, “Welcome.”\n\nHe jumped up, heart pounding. \"Who said that?\"\n\n“I did,” came the calm reply. “I am the Whispering Tree.”\n\nAarush looked around—no one. \"Trees can’t talk!\"\n\n\"Most can’t,\" said the voice. \"But I carry the stories of this land. Those who listen may learn.\"\n\nCurious but skeptical, Aarush returned the next day—and the next. Over time, the tree shared tales from centuries past: of a warrior who defended the village from invaders, of a healer who used forest herbs to cure a plague, of a poet who once made the village sing.\n\nThe stories began changing Aarush. He spoke less, listened more. He started helping the old blacksmith, learning about tools. He began sketching maps of the forest, marking herbs and water sources. The village noticed: this boy who once wandered aimlessly now walked with purpose.\n\nOne day, the tree told him, “My time is ending. Trees grow, and trees fall. But stories—they live in hearts. You must become the whisperer now.”\n\nAarush felt a deep ache in his chest. He wanted the tree to last forever. But the next morning, when he came back, a lightning storm had left the banyan split in two.\n\nHe gathered pieces of its bark and carved them into small tokens. To the blacksmith, he gave one shaped like a sword. To the midwife, one like a leaf. To the village children, tokens shaped like stars.\n\nEach token came with a story. The people of Nandipur began to gather every weekend in the clearing, where Aarush now stood under the stars and told stories. Stories of courage. Of kindness. Of the past and the future.\n\nAnd whenever a breeze rustled through the trees, Aarush smiled.\n\nHe still heard the whisper.\n\nThe Whispering Tree lived on—in every word he spoke."
// }
