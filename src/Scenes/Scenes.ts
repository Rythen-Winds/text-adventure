import { Scene } from '.';

export const SCENES: Record<string, Scene> = {
  intro: {
    description: [
      "You are a curious little fox by the name of 'Whisker'",
      'Our story begins just after your home and the surrounding grove in the forest has burned down.',
      'Your parents woke you from your afternoon nap and rushed you to the nearby river.',
      'You watch as many of the adults, woodland creatures like yourself, scramble to make sure everyone made it out alive.',
      'Around you, the grown-ups are speaking in hushed, hurried voices, their words blending into a blur of worried murmurs.',
      'You try to listen, but the sentences slip past, heavy with uncertainty. You catch bits and pieces—fragments of fear about what comes next, about the loss of the grove—but nothing that makes sense.',
      'In the distance, you see the bright pillar of flame, consuming what was once your home.',
      'Your parents seem quite busy. Would you like to search for your friends by the river, wait for your parents, or go explore the woods?',
    ],
    options: [
      {
        text: 'Search for friends',
        actions: [
          { type: 'GO_TO_SCENE', payload: 'search-for-friends' },
          {
            type: 'SET_QUEST_FLAG',
            payload: { flag: 'learned-of-north-cave', value: true },
          },
        ],
      },
      {
        text: 'Wait',
        actions: [{ type: 'GO_TO_SCENE', payload: 'wait-by-the-river' }],
      },
      {
        text: 'Explore the woods',
        actions: [
          { type: 'GO_TO_SCENE', payload: 'fire-starter' },
          {
            type: 'SET_QUEST_FLAG',
            payload: { flag: 'found-ignition-source', value: true },
          },
        ],
      },
    ],
  },
  'search-for-friends': {
    description: [
      'You search for your friends, Pebbles and Sunny, two other foxes you frequently played with, but amidst the chaos you cannot seem to find them',
      'A group of squirrels scurries up to you, their tiny feet rustling through the debris. One of them calls out, *"Hey, Whisker!"*',
      " It's Ace, a squirrel you used to see perched on the tree that overlooked your burrow. You remember the comfort of his playful chatter amidst the safety of the grove.",
      `Ace's familiar face offers a small sense of relief, but the scene around you remains overwhelming. He looks at you with a mixture of concern and curiosity. *"Have you seen Pebbles or Sunny?"* you ask urgently.`,
      '*"No,"* he pauses *"...but they might have went to the cave just north of here. I think it was closer for them. Be safe if you decide to go looking for them."*',
    ],
    options: [
      {
        text: 'Wait with Ace',
        actions: [
          { type: 'INCREASE_RELATIONS', payload: { npc: 'Ace', value: 5 } },
          { type: 'GO_TO_SCENE', payload: 'wait-with-ace' },
        ],
      },
      {
        text: 'Search for the cave',
        actions: [
          { type: 'GO_TO_SCENE', payload: 'fire-starter' },
          {
            type: 'SET_QUEST_FLAG',
            payload: { flag: 'found-ignition-source', value: true },
          },
        ],
      },
    ],
  },
  'wait-by-the-river': {
    description: [
      'You decide to wait by the river, carefully watching the families around you.',
      'As the afternoon turns into evening, your parents come to find you.',
      'Your father has a serious look on his face, while your mother looks to be fighting back tears.',
      '*"Whisker,"* your father begins. *"We are going to be staying with your cousins over in Meadowbrook. Come along now."*',
    ],
    options: [
      {
        text: 'Go with your parents',
        actions: [{ type: 'GO_TO_SCENE', payload: 'journey-to-meadowbrook' }],
      },
    ],
  },
  'fire-starter': {
    description: [
      'As you search through the nearby woods, you find yourself near the outskirts of your grove.',
      'The ground before your paws is charred and smells of lingering smoke.',
      "In the distance, flames still crackle, their dull roar a constant reminder of the destruction they've wrought.",
      'Something catches your eye near the edge of the scorched earth.',
      "At first, it's just a dark patch on the ground, blending into the blackened soil.",
      'But as you move closer, the faint glint of a sticky, black substance becomes clear.',
      'A strange, oily sheen coats the remnants of the earth, pooling in irregular shapes between the burned leaves and twisted roots.',
      'The substance is thick and viscous, oozing like sap but far darker, with an unnatural smell.',
      'It sticks to the tips of your paws, clinging stubbornly like tar.',
      'The scent that rises from it is pungent—an acrid, chemical odor that feels out of place in the forest.',
      "*This isn't something that would occur naturally here.*",
      'It almost seems like... someone used it to feed the flames.',
    ],
    options: [
      {
        text: 'Head back to the river',
        actions: [{ type: 'GO_TO_SCENE', payload: 'back-to-the-river' }],
      },
      {
        text: 'Head north',
        actions: [{ type: 'GO_TO_SCENE', payload: 'cave-of-friends' }],
        preRequirements: [
          {
            type: 'questFlag',
            flag: 'learned-of-north-cave',
            requiredState: false,
          },
        ],
      },
      {
        text: 'Look for the Cave',
        actions: [{ type: 'GO_TO_SCENE', payload: 'cave-of-friends' }],
        preRequirements: [
          {
            type: 'questFlag',
            flag: 'learned-of-north-cave',
            requiredState: true,
          },
        ],
      },
    ],
  },
  'wait-with-ace': {
    description: [
      `You decide to wait with Ace. *"That's okay, Ace. I'll just hang out with you.`,
      'Ace smiles brightly. You spend some time with the squirrels playing in the shallow part of the river',
      'As the afternoon turns into evening, your parents come to find you.',
      'Your father has a serious look on his face, while your mother looks to be fighting back tears.',
      '*"Whisker,"* your father begins. *"We are going to be staying with your cousins over in Meadowbrook. Come along now."*',
    ],
    options: [
      {
        text: 'Go with your parents',
        actions: [{ type: 'GO_TO_SCENE', payload: 'journey-to-meadowbrook' }],
      },
    ],
  },
  'journey-to-meadowbrook': {
    description: [],
    options: [],
  },
  'back-to-the-river': {
    description: [],
    options: [],
  },
  'cave-of-friends': {
    description: [
      'You find the cave north of your home grove. It appears a number of the families from the area sought refuge here.',
      'Just inside the entrance of the cave, your friends Pebbles and Sunny come running over',
      '*"Whisker!"* Pebbles calls out. *"You made it. Glad to see your okay."*',
      'Sunny looks at you with a faint bit of concern. *"Whisker, are your parents coming"*',
      '*... your parents*, you never told them you were going exploring. They are probably worried about you.',
    ],
    options: [],
  },
};
