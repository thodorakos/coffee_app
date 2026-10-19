export type CravingKey = 'dessert' | 'juicy' | 'nutty' | 'floral';
export type Accent = 'peach' | 'honey' | 'caramel' | 'matcha' | 'lavender';

export interface Craving {
  key: CravingKey | 'surprise';
  label: string;
  sub: string;
  tag: string;
  accent: Accent;
  icon: string;
}

export interface CoffeeScores {
  sweet: number;
  juice: number;
  rich: number;
}

export interface Coffee {
  id: string;
  craving: CravingKey;
  accent: Exclude<Accent, 'lavender'>;
  badge: string;
  name: string;
  words: string;
  scores: CoffeeScores;
  brew: string;
  brewIcon: string;
  steps: string[];
}

export interface QuizOption {
  icon: string;
  label: string;
  cap: string;
  pick: CravingKey;
  accent: Accent;
  /** Weighted points per coffee id. This is what makes the quiz honest. */
  scores: Record<string, number>;
}

export interface QuizStep {
  q: string;
  sub: string;
  options: QuizOption[];
}

export interface Cheat {
  t: string;
  icon: string;
  accent: Accent;
  body: string;
}

export const CRAVINGS: Craving[] = [
  { key: 'dessert', label: 'Sweet & mellow', sub: 'caramel · milk chocolate · brown sugar', tag: 'Sweet & mellow', accent: 'honey', icon: 'cookie' },
  { key: 'juicy', label: 'Bright & juicy', sub: 'berries · citrus · honey', tag: 'Fruity & bright', accent: 'peach', icon: 'berry' },
  { key: 'nutty', label: 'Bold & cozy', sub: 'cocoa · nuts · spice', tag: 'Bold & cozy', accent: 'caramel', icon: 'pie' },
  { key: 'floral', label: 'Light & floral', sub: 'jasmine · black tea · peach', tag: 'Delicate & floral', accent: 'matcha', icon: 'flower' },
  { key: 'surprise', label: 'Surprise me', sub: 'let fate decide', tag: '', accent: 'lavender', icon: 'dice' },
];

export const COFFEES: Coffee[] = [
  {
    id: 'ethiopia',
    craving: 'floral',
    accent: 'matcha',
    badge: 'jasmine',
    name: 'Ethiopia Yirgacheffe',
    words: 'Tastes like sweet black tea with jasmine, peach, and honey.',
    scores: { sweet: 3, juice: 5, rich: 2 },
    brew: 'Easiest in a pour-over or drip machine, drunk black.',
    brewIcon: 'dripper',
    steps: [
      'Pop a paper filter into the dripper and rinse it with hot water (then dump that water out).',
      'Add 3 level tablespoons of coffee, then pour just enough hot water to wet it all. Count to 30 while it puffs up.',
      'Pour the rest of the water in slow, gentle circles, let it drip through, and drink it warm — the flowers fade as it cools.',
    ],
  },
  {
    id: 'kenya',
    craving: 'juicy',
    accent: 'peach',
    badge: 'blueberry',
    name: 'Kenya AA',
    words: 'Tastes like blackcurrant juice with brown sugar and grapefruit zing.',
    scores: { sweet: 3, juice: 5, rich: 3 },
    brew: 'Easiest in a pour-over or drip machine, drunk black.',
    brewIcon: 'dripper',
    steps: [
      'Set a paper filter in your dripper and give it a quick hot-water rinse.',
      'Add 3 tablespoons of coffee and wet it with a little water — count to 30.',
      'Pour the rest in slow circles. If it tastes too zingy, grind a touch coarser next time.',
    ],
  },
  {
    id: 'rwanda',
    craving: 'floral',
    accent: 'matcha',
    badge: 'tea',
    name: 'Rwanda Nyamasheke',
    words: 'Tastes like black tea with red apple, raspberry, and honey.',
    scores: { sweet: 4, juice: 4, rich: 3 },
    brew: 'Easiest in a pour-over or drip machine.',
    brewIcon: 'dripper',
    steps: [
      'Pop a paper filter into the dripper and rinse it with hot water (then dump that water out).',
      'Add 3 level tablespoons of coffee, pour just enough hot water to wet it all, and count to 30.',
      'Pour the rest in slow circles and sip it warm — the berry notes pop as it cools a little.',
    ],
  },
  {
    id: 'colombia',
    craving: 'dessert',
    accent: 'honey',
    badge: 'honey',
    name: 'Colombia Huila',
    words: 'Tastes like red apple and caramel with a milk-chocolate finish.',
    scores: { sweet: 4, juice: 3, rich: 3 },
    brew: 'Easiest in a drip machine or pour-over.',
    brewIcon: 'dripper',
    steps: [
      'Fill your machine’s basket with 4 tablespoons of coffee.',
      'Pour water into the tank, pop your mug underneath, and press go.',
      'Pour a cup while it’s fresh — great black, happy with a splash of milk.',
    ],
  },
  {
    id: 'costa-rica',
    craving: 'juicy',
    accent: 'peach',
    badge: 'citrus',
    name: 'Costa Rica Tarrazú',
    words: 'Tastes like fresh orange and honey with milk chocolate underneath.',
    scores: { sweet: 4, juice: 4, rich: 3 },
    brew: 'Easiest in a pour-over or drip machine.',
    brewIcon: 'dripper',
    steps: [
      'Set a paper filter in your dripper and rinse it with hot water.',
      'Add 3 tablespoons of coffee, wet it with a little water, and count to 30.',
      'Pour the rest in slow circles and drink it warm — bright and clean by design.',
    ],
  },
  {
    id: 'guatemala',
    craving: 'nutty',
    accent: 'caramel',
    badge: 'cocoa',
    name: 'Guatemala Antigua',
    words: 'Tastes like toffee and cocoa with a little orange peel.',
    scores: { sweet: 4, juice: 2, rich: 4 },
    brew: 'Easiest in a drip machine or French press. Loves milk.',
    brewIcon: 'press',
    steps: [
      'Scoop 4 tablespoons of coarse-ground coffee into your French press.',
      'Pour hot water nearly to the top, give it one gentle stir, and rest the lid on top (don’t press yet).',
      'Wait 4 minutes, press down slowly, and pour. Add milk if you like — it holds up great.',
    ],
  },
  {
    id: 'honduras',
    craving: 'dessert',
    accent: 'honey',
    badge: 'caramel',
    name: 'Honduras Marcala',
    words: 'Tastes like milk chocolate and caramel with a gentle orange lift.',
    scores: { sweet: 4, juice: 2, rich: 3 },
    brew: 'Easiest in a drip machine. A true everyday cup.',
    brewIcon: 'dripper',
    steps: [
      'Fill your machine’s basket with 4 tablespoons of coffee.',
      'Pour water into the tank, pop your mug underneath, and press go.',
      'Pour it fresh. Nothing fussy here — that’s the whole charm.',
    ],
  },
  {
    id: 'peru',
    craving: 'dessert',
    accent: 'honey',
    badge: 'mountain',
    name: 'Peru Cajamarca',
    words: 'Tastes like milk chocolate and hazelnut with soft caramel sweetness.',
    scores: { sweet: 4, juice: 2, rich: 3 },
    brew: 'Easiest in a drip machine or French press.',
    brewIcon: 'dripper',
    steps: [
      'Fill your machine’s basket with 4 tablespoons of coffee.',
      'Brew as normal and pour a cup while it’s fresh.',
      'Smooth and mellow by nature — an easy one to drink every day.',
    ],
  },
  {
    id: 'brazil',
    craving: 'nutty',
    accent: 'caramel',
    badge: 'pecan',
    name: 'Brazil Cerrado',
    words: 'Tastes like peanut butter, milk chocolate, and brown sugar.',
    scores: { sweet: 4, juice: 1, rich: 4 },
    brew: 'Easiest in a drip machine. Made for milk.',
    brewIcon: 'dripper',
    steps: [
      'Fill your machine’s basket with 4 tablespoons of coffee.',
      'Pour water into the tank, pop your mug underneath, and press go.',
      'Add warm milk if you like — this is the latte champion of the list.',
    ],
  },
  {
    id: 'sumatra',
    craving: 'nutty',
    accent: 'caramel',
    badge: 'earth',
    name: 'Sumatra Mandheling',
    words: 'Tastes like dark chocolate, cedar, and warm spice. Heavy and low.',
    scores: { sweet: 2, juice: 1, rich: 5 },
    brew: 'Easiest in a French press.',
    brewIcon: 'press',
    steps: [
      'Scoop 4 tablespoons of coarse-ground coffee into your French press.',
      'Pour hot water nearly to the top, give it one gentle stir, and rest the lid on top (don’t press yet).',
      'Wait 4 minutes, press down slowly, and pour. Heavy by design — that’s Sumatra.',
    ],
  },
];

/**
 * Rebuilt quiz: 5 questions, each testing a real discriminator
 * (fruit level, sour tolerance, chocolate/weight, milk habit, intensity).
 * Every option spreads weighted points across origins — no 1:1 mapping.
 * `pick` only tints the option tile (existing look, untouched).
 */
export const QUIZ: QuizStep[] = [
  {
    q: 'How much fruit do you want in your cup?',
    sub: 'Be honest — this splits the bright Africans from everything else.',
    options: [
      { icon: 'berry', label: 'Bring on the fruit', cap: 'berries & citrus, loud', pick: 'juicy', accent: 'peach', scores: { ethiopia: 2, kenya: 2, rwanda: 1, 'costa-rica': 1 } },
      { icon: 'juice', label: 'A little, mellow fruit', cap: 'apple & peach, nothing sour', pick: 'dessert', accent: 'honey', scores: { colombia: 2, 'costa-rica': 2, rwanda: 2, honduras: 2, guatemala: 1, ethiopia: 1, peru: 1 } },
      { icon: 'cookie', label: 'No fruit, thanks', cap: 'keep it chocolatey', pick: 'nutty', accent: 'caramel', scores: { brazil: 2, sumatra: 2, peru: 2, guatemala: 1, honduras: 1 } },
    ],
  },
  {
    q: 'How do you feel about tangy and sour?',
    sub: 'Think lemonade, sour candy, tangy yogurt.',
    options: [
      { icon: 'sun', label: 'Love it — tang welcome', cap: 'lemonade person', pick: 'juicy', accent: 'peach', scores: { ethiopia: 2, kenya: 2, rwanda: 2, 'costa-rica': 2 } },
      { icon: 'mug', label: 'A little tang is fine', cap: 'balanced, not sharp', pick: 'dessert', accent: 'honey', scores: { colombia: 2, guatemala: 2, honduras: 2, ethiopia: 1, rwanda: 1, 'costa-rica': 1, peru: 1 } },
      { icon: 'croissant', label: 'No sour at all', cap: 'smooth only, please', pick: 'nutty', accent: 'caramel', scores: { brazil: 2, sumatra: 2, peru: 2, honduras: 1, guatemala: 1, colombia: 1 } },
    ],
  },
  {
    q: 'Pick your chocolate',
    sub: 'This one calls out Brazil vs. Sumatra vs. neither.',
    options: [
      { icon: 'candy', label: 'Milk chocolate & caramel', cap: 'sweet, cozy, nutty', pick: 'dessert', accent: 'honey', scores: { brazil: 2, colombia: 2, honduras: 2, peru: 2, guatemala: 1, 'costa-rica': 1 } },
      { icon: 'cake', label: 'Dark chocolate, heavy', cap: 'bold & brooding', pick: 'nutty', accent: 'caramel', scores: { sumatra: 2, guatemala: 2, brazil: 1 } },
      { icon: 'flower', label: 'Skip chocolate entirely', cap: 'flowers & tea instead', pick: 'floral', accent: 'matcha', scores: { ethiopia: 2, rwanda: 2, kenya: 1, 'costa-rica': 1 } },
    ],
  },
  {
    q: 'How do you actually drink coffee?',
    sub: 'Matters more than people admit — delicate coffees vanish in milk.',
    options: [
      { icon: 'teacup', label: 'Black', cap: 'taste everything', pick: 'floral', accent: 'matcha', scores: { ethiopia: 2, kenya: 2, rwanda: 2, 'costa-rica': 2, colombia: 1 } },
      { icon: 'mug', label: 'Splash of milk', cap: 'soften the edges', pick: 'dessert', accent: 'honey', scores: { colombia: 2, guatemala: 2, honduras: 2, peru: 2, kenya: 1, rwanda: 1, brazil: 1, 'costa-rica': 1 } },
      { icon: 'press', label: 'Lots of milk or latte', cap: 'milky & sweet', pick: 'nutty', accent: 'caramel', scores: { brazil: 2, sumatra: 2, guatemala: 1, peru: 1 } },
    ],
  },
  {
    q: 'Light and delicate, or bold and heavy?',
    sub: 'Last one — think tea vs. hot chocolate.',
    options: [
      { icon: 'flower', label: 'Light & delicate', cap: 'like sweet tea', pick: 'floral', accent: 'matcha', scores: { ethiopia: 2, rwanda: 2, 'costa-rica': 2, kenya: 1, colombia: 1 } },
      { icon: 'book', label: 'Right in the middle', cap: 'smooth all-rounder', pick: 'dessert', accent: 'honey', scores: { colombia: 2, guatemala: 2, honduras: 2, peru: 2, brazil: 1 } },
      { icon: 'nut', label: 'Bold & heavy', cap: 'coat-the-spoon stuff', pick: 'nutty', accent: 'caramel', scores: { sumatra: 2, brazil: 2, kenya: 2, guatemala: 1 } },
    ],
  },
];

export const CHEATS: Cheat[] = [
  {
    t: 'What does “single origin” actually mean?',
    icon: 'compass',
    accent: 'peach',
    body: `<p><strong>One place, one harvest.</strong> Instead of blending beans from five countries, a single origin comes from one farm, one co-op, or one valley — like apples from a single orchard.</p><p>That’s why an Ethiopia tastes nothing like a Brazil. You’re tasting the place: the soil, the altitude, and the local coffee variety.</p><p class="foot">If you only remember one thing: single origin = flavor has an address.</p>`,
  },
  {
    t: 'Why does Ethiopia taste nothing like Brazil?',
    icon: 'sun',
    accent: 'honey',
    body: `<p>Two plain reasons. <strong>Higher + cooler</strong> (Ethiopia, Kenya) means slower ripening and brighter, fruitier cups. <strong>Lower + warmer</strong> (much of Brazil) means mellower, nuttier cups.</p><p>Then there’s <strong>how it’s dried</strong>: dried inside the fruit = extra berry jam; washed clean = clearer, tea-like.</p><div class="chips"><span class="chip">High &amp; cool = fruity</span><span class="chip">Low &amp; warm = nutty</span></div>`,
  },
  {
    t: 'Why is some coffee tangy and some not?',
    icon: 'juice',
    accent: 'caramel',
    body: `<p>That zing is <strong>brightness</strong> — the same tang as an apple vs. a banana. Kenya and Ethiopia have lots of it. Brazil and Sumatra have almost none.</p><p>Neither is better. If you love lemonade and sour candy, go bright. If sour coffee sounds awful, go bold and cozy — you’ll be much happier.</p>`,
  },
  {
    t: 'Milk rule: which origins survive it?',
    icon: 'mug',
    accent: 'matcha',
    body: `<p>Delicate coffees <strong>disappear in milk</strong>. Ethiopia’s flowers won’t make it through a latte — drink it black or with just a splash.</p><p>Cozy coffees <strong>love milk</strong>. Brazil was practically built for lattes; Sumatra and Guatemala hold up great too.</p><p class="foot">Rule of thumb: bright = black, bold = milk, balanced = either.</p>`,
  },
];

export const SNOW: [string, string][] = [
  ['“Single origin”', 'All the beans are from one place — like wine from one vineyard.'],
  ['“Tasting notes: jasmine, peach”', 'It reminds someone of those flavors. There are no flowers in the bag.'],
  ['“Washed process”', 'The fruit was rinsed off before drying. Expect a cleaner, brighter cup.'],
  ['“Natural process”', 'Dried inside the fruit. Expect extra berry and jam.'],
  ['“Light roast”', 'Toasted less. The origin flavor shines — brighter and more delicate.'],
  ['“Dark roast”', 'Toasted more. Origin fades, roast takes over — bolder, smokier.'],
  ['“Kenya AA”', 'AA is just bean size — big beans. Kenyas this size are famously tangy.'],
  ['“Brazil Cerrado”', 'A low, warm region in Brazil. Expect nuts and chocolate, almost no tang.'],
  ['“Altitude 2,100m”', 'Grown high and cool. Usually brighter and more complex.'],
  ['“Full body”', 'Feels heavy in your mouth, like whole milk vs. skim.'],
  ['“Bright”', 'A pleasant tang, like apple juice. Not sour-milk sour.'],
  ['“Estate / Lot 12”', 'Which farm patch it came from. Smaller patch = more traceable.'],
];

export const WHY: Record<CravingKey, string> = {
  juicy: 'You’re drawn to bright, fruity flavors — this one’s bursting with them.',
  dessert: 'You love sweet, cozy things — and that’s a superpower.',
  nutty: 'You’re all about mellow, roasty comfort. Same.',
  floral: 'You have a soft spot for gentle, delicate flavors.',
};

/** Per-origin result line: why this one fits your answers. */
export const ORIGIN_WHY: Record<string, string> = {
  ethiopia: 'You picked light, floral, and fruity over heavy and chocolatey.',
  kenya: 'You want fruit with a real tang — and you drink it in a way that lets that shine.',
  rwanda: 'You like fruit and flowers, but sweeter and rounder than the loudest Africans.',
  colombia: 'You like a little of everything, smooth and sweet, with nothing extreme.',
  'costa-rica': 'You want brightness with honeyed sweetness — lively but clean.',
  guatemala: 'You lean sweet and cozy with depth — chocolate first, fruit second.',
  honduras: 'You want smooth, sweet comfort with nothing fussy or extreme.',
  peru: 'You want the mellowest cup here — soft chocolate, no surprises.',
  brazil: 'You want smooth, nutty comfort that loves milk — no sour surprises.',
  sumatra: 'You want bold, dark, and heavy — the opposite of light and tangy.',
};

/** Honest heads-up per origin: what it does NOT taste like. */
export const ORIGIN_HEADSUP: Record<string, string> = {
  ethiopia: 'Heads-up: delicate and tea-like, not chocolatey. Milk will bury it.',
  kenya: 'Heads-up: the tangiest coffee here — skip it if sour bugs you.',
  rwanda: 'Heads-up: fruity but gentle, not as loud as Kenya.',
  colombia: 'Heads-up: smooth and friendly, not wild or funky.',
  'costa-rica': 'Heads-up: bright and citrusy — not a mellow cup.',
  guatemala: 'Heads-up: cozy with a whisper of citrus, not a fruit bomb.',
  honduras: 'Heads-up: simple on purpose — don’t expect fireworks.',
  peru: 'Heads-up: the quietest cup here — that’s the point.',
  brazil: 'Heads-up: basically no fruit. That’s the point.',
  sumatra: 'Heads-up: dark and earthy, not bright or fruity.',
};

export const CRAVING_LABEL: Record<string, string> = Object.fromEntries(
  CRAVINGS.map((c) => [c.key, c.label]),
);
