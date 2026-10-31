import type { ChapterId } from './game-data'

export interface StoryChoice {
  label: string
  response: string
  points: number
}

export interface StoryScene {
  setting: string
  line: string
  fact: string
  choices: StoryChoice[]
}

export interface QuizQuestion {
  question: string
  options: string[]
  answer: number
  explanation: string
}

export interface ChapterStory {
  speaker: string
  tagline: string
  scenes: StoryScene[]
  summary: {
    title: string
    paragraphs: string[]
    stats: { label: string; value: string }[]
    imageCaption: string
  }
  quiz: QuizQuestion[]
}

export const QUIZ_POINTS = 25

export const STORIES: Record<ChapterId, ChapterStory> = {
  'apollo-lrv': {
    speaker: 'LRV-1',
    tagline: 'The first car on another world',
    scenes: [
      {
        setting: 'Hadley–Apennine · Day 1',
        line: "They unfolded me from the side of the lander like a paper map. Wheels clicked into place, seats snapped open. Then two astronauts climbed aboard and I felt something I'd never felt in the factory: the Moon under my tires. Where should we drive first?",
        fact: 'The Lunar Roving Vehicle folded up small enough to ride on the outside of the Apollo Lunar Module.',
        choices: [
          { label: 'Head for the edge of Hadley Rille', response: 'A canyon carved long ago. We rolled close, slow and careful, and the astronauts took photos that scientists still study today.', points: 30 },
          { label: 'Test how fast you can go', response: 'I bounced across the dust at a few kilometers per hour. Not fast, but on the Moon every bump sends you floating!', points: 20 },
        ],
      },
      {
        setting: 'Mount Hadley Delta · Day 2',
        line: "My front steering stopped working on the first drive. My crew had to steer with the back wheels only. Today it's working again, but nobody knows why. Do we trust it?",
        fact: 'The rover had both front and rear steering, so the crew could keep driving if one set failed.',
        choices: [
          { label: 'Trust the rover and drive on', response: 'We climbed the slopes of Mount Hadley Delta. Up there, Dave and Jim found a rock that would become famous: the "Genesis Rock".', points: 30 },
          { label: 'Check the systems first', response: 'Smart thinking. Engineers back home helped run checks over the radio. Then we set off together.', points: 25 },
          { label: 'Walk instead', response: "Walking in a stiff spacesuit is exhausting. My crew was glad they didn't have to. That's why I was built.", points: 10 },
        ],
      },
      {
        setting: 'Landing site · Final day',
        line: "The mission is ending. My crew is going home, but I'm staying. They park me a little way from the lander and point my camera at it. Why do you think they did that?",
        fact: 'Three Lunar Roving Vehicles were driven on the Moon, on Apollo 15, 16 and 17. All three are still there.',
        choices: [
          { label: 'To film the launch home', response: 'Yes. People on Earth watched the lander lift off through my eyes. It was the last thing I ever saw them do.', points: 30 },
          { label: 'To keep watch over the site', response: "In a way, I still do. My tire tracks will last for millions of years, because there's no wind on the Moon to erase them.", points: 25 },
        ],
      },
    ],
    summary: {
      title: 'What happened in real life',
      paragraphs: [
        'On Apollo 15 in July 1971, astronauts David Scott and James Irwin became the first people to drive on the Moon. The rover let them travel much farther from their lander than walking ever could.',
        'Its battery-powered wheels carried them to canyon edges and mountain slopes. A TV camera on the rover later broadcast their liftoff back to Earth.',
      ],
      stats: [
        { label: 'Distance driven', value: '~28 km' },
        { label: 'Power', value: '2 batteries' },
        { label: 'Still on the Moon', value: '3 rovers' },
      ],
      imageCaption: 'Archival photo of the Apollo 15 rover at Hadley',
    },
    quiz: [
      {
        question: 'Which mission first carried the Lunar Roving Vehicle?',
        options: ['Apollo 11', 'Apollo 15', 'Apollo 13'],
        answer: 1,
        explanation: 'Apollo 15 brought the first rover to the Moon in 1971.',
      },
      {
        question: 'How did the rover travel to the Moon?',
        options: ['Folded up on the side of the lander', 'In a separate rocket', 'It was built on the Moon'],
        answer: 0,
        explanation: 'It folded compactly into a bay on the Lunar Module.',
      },
      {
        question: 'Why will the rover’s tracks last so long?',
        options: ['The dust is magnetic', 'There is no wind or rain on the Moon', 'They were painted on'],
        answer: 1,
        explanation: 'With almost no atmosphere, nothing wears the tracks away.',
      },
    ],
  },

  sojourner: {
    speaker: 'Sojourner',
    tagline: 'Small as a microwave, brave as a giant',
    scenes: [
      {
        setting: 'Ares Vallis · Sol 1',
        line: "We fell through the sky wrapped in giant airbags and bounced across Mars like a beach ball. When the petals of the lander opened, I saw rocks everywhere. I'm only about 65 centimeters long. Every one of them looks like a mountain. What should I do first?",
        fact: 'Mars Pathfinder used airbags to bounce safely onto the surface of Mars in July 1997.',
        choices: [
          { label: 'Roll down the ramp carefully', response: 'Slowly, slowly. My six wheels touched red soil. I became the first wheeled rover ever to explore another planet.', points: 30 },
          { label: 'Take a picture of the lander', response: "The lander, my partner, took pictures of me too. We were a team. I couldn't talk to Earth without it.", points: 25 },
        ],
      },
      {
        setting: 'Rock Garden · Sol 12',
        line: "Scientists gave the rocks funny names: Barnacle Bill, Yogi, Scooby-Doo. I have a special tool to sniff out what they're made of. Which one should I study?",
        fact: 'Sojourner moved at about 1 centimeter per second, slower than a garden snail on a mission.',
        choices: [
          { label: 'Barnacle Bill, the closest rock', response: 'It was rich in silica, different from what scientists expected. Mars was more complicated than anyone thought!', points: 25 },
          { label: 'Yogi, the big one', response: "Getting close took careful driving. Engineers planned every move a day ahead, because radio signals take minutes to reach me.", points: 30 },
          { label: 'Wait for better weather', response: 'Mars nights are freezing cold. Waiting saves power, but my mission only planned for about a week, so every sol counts.', points: 10 },
        ],
      },
      {
        setting: 'Near the lander · Sol 83',
        line: "Something is wrong. I keep sending, but the lander doesn't answer. Without it, my words can't reach Earth. What should I do?",
        fact: 'Sojourner was named after Sojourner Truth, a famous American abolitionist and women’s rights activist.',
        choices: [
          { label: 'Keep circling and waiting', response: 'That is what scientists believe I did, driving around the lander, waiting for a message that never came.', points: 30 },
          { label: 'Send one last message', response: "My last transmission was never received. But the data I'd already sent changed how we explore Mars.", points: 25 },
        ],
      },
    ],
    summary: {
      title: 'What happened in real life',
      paragraphs: [
        'Sojourner landed with Mars Pathfinder on July 4, 1997. It was designed to work for about a week, but it kept exploring for nearly three months.',
        'In September 1997, contact with the Pathfinder lander was lost. Without its relay, Sojourner could no longer talk to Earth. Its success paved the way for every Mars rover that followed.',
      ],
      stats: [
        { label: 'Planned mission', value: '7 sols' },
        { label: 'Actual mission', value: '83 sols' },
        { label: 'Weight', value: '10.6 kg' },
      ],
      imageCaption: 'Archival photo of Sojourner beside a rock',
    },
    quiz: [
      {
        question: 'How did Mars Pathfinder land on Mars?',
        options: ['On landing legs', 'Bouncing on airbags', 'With a parachute only'],
        answer: 1,
        explanation: 'Giant airbags cushioned the landing and bounced across the ground.',
      },
      {
        question: 'Why couldn’t Sojourner talk to Earth after the lander went silent?',
        options: ['It ran out of fuel', 'It relayed all messages through the lander', 'Its wheels broke'],
        answer: 1,
        explanation: 'Sojourner sent its signals to the lander, which sent them on to Earth.',
      },
      {
        question: 'How long was Sojourner originally designed to work?',
        options: ['About a week', 'About a year', 'About 15 years'],
        answer: 0,
        explanation: 'It was planned for 7 sols and lasted 83.',
      },
    ],
  },

  opportunity: {
    speaker: 'Opportunity',
    tagline: 'Built for 90 days. Explored for 15 years.',
    scenes: [
      {
        setting: 'Eagle Crater · Sol 1',
        line: "Hole in one! I bounced and rolled straight into a small crater. Right in front of me there's a strip of layered rock. My twin, Spirit, landed on the other side of Mars three weeks ago. What should I look at first?",
        fact: 'Opportunity had a twin rover named Spirit. They landed on opposite sides of Mars in January 2004.',
        choices: [
          { label: 'Study the layered rock', response: 'Inside, I found tiny round grains scientists nicknamed "blueberries". They are made of hematite, a mineral that often forms in water.', points: 30 },
          { label: 'Climb out and look around', response: 'Patience! The best clue was right next to me. Sometimes discovery starts close to home.', points: 15 },
        ],
      },
      {
        setting: 'Meridiani Planum · Sol 1,000',
        line: "My 90-day mission ended long ago. My solar panels are dusty, but sometimes the wind cleans them. Engineers ask: should we keep going?",
        fact: 'Opportunity drove more than 45 kilometers, longer than a marathon, the farthest of any rover at the time.',
        choices: [
          { label: 'Drive to a bigger crater', response: 'Victoria Crater, then Endeavour. Each journey took years. Every kilometer showed more signs that water once flowed here.', points: 30 },
          { label: 'Stay put and save power', response: 'Resting helps in winter. But a rover is made to roam, and the team always found a way to keep me moving.', points: 20 },
          { label: 'Send a hello to Spirit', response: "Spirit and I couldn't talk directly. But the team was family to both of us. Spirit went silent in 2010, and I kept going for both of us.", points: 25 },
        ],
      },
      {
        setting: 'Perseverance Valley · Sol 5,111',
        line: "A huge dust storm is covering the whole planet. The sky is turning dark, and my batteries are falling. I have time for one more message. What should it say?",
        fact: 'The planet-wide dust storm in 2018 was so thick it blocked most sunlight from reaching Opportunity’s solar panels.',
        choices: [
          { label: 'Send my last science data', response: 'My final transmission reported the sky, my power and my health. Engineers kept listening for months afterward.', points: 30 },
          { label: 'Say goodbye', response: 'People on Earth wrote farewell messages to me. Some said I sounded brave. I was simply doing what I was built for.', points: 25 },
        ],
      },
    ],
    summary: {
      title: 'What happened in real life',
      paragraphs: [
        'Opportunity landed at Meridiani Planum in January 2004. It found strong evidence that liquid water once existed on Mars, a big step in the search for places where life could have lived.',
        'In June 2018, a global dust storm blocked the Sun. The team sent over a thousand commands trying to wake it. In February 2019, NASA officially ended the mission.',
      ],
      stats: [
        { label: 'Planned mission', value: '90 sols' },
        { label: 'Distance driven', value: '45 km' },
        { label: 'Years active', value: '~15' },
      ],
      imageCaption: 'Archival photo of Opportunity’s tracks across Meridiani Planum',
    },
    quiz: [
      {
        question: 'What were the tiny "blueberries" Opportunity found?',
        options: ['Frozen water drops', 'Hematite grains that can form in water', 'Seeds from ancient plants'],
        answer: 1,
        explanation: 'Hematite spheres are a sign that water once soaked the rocks.',
      },
      {
        question: 'What was the name of Opportunity’s twin rover?',
        options: ['Curiosity', 'Spirit', 'Sojourner'],
        answer: 1,
        explanation: 'Spirit landed three weeks before Opportunity on the other side of Mars.',
      },
      {
        question: 'What ended Opportunity’s mission?',
        options: ['A meteor strike', 'A planet-wide dust storm', 'A broken wheel'],
        answer: 1,
        explanation: 'The 2018 dust storm blocked the sunlight its solar panels needed.',
      },
    ],
  },
}
