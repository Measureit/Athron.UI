export interface Skill {
  id: number;
  name: string;
  description: string;
  category: 'attack' | 'defense';
  pair?: string; // group key to pair attack/defense equivalents
  details?: string;
}

export const SKILLS: Skill[] = [
  // Pair: 1v1 duel <-> defending player with ball
  { id: 1, name: '1v1 Duel', description: 'Drill for dribbling and defending in one-on-one situations.', category: 'attack', pair: 'duel', details: 'Close control, feints, and beating a defender.' },
  { id: 2, name: 'Defend Player With Ball', description: 'Techniques to stop an opponent who has the ball.', category: 'defense', pair: 'duel', details: 'Body position, jockeying and forcing the attacker away from goal.' },

  // Pair: Acceleration after pass <-> Defensive recovery (czarna obrona)
  { id: 3, name: 'Acceleration After Pass', description: 'Explosive first steps and timing after releasing the ball.', category: 'attack', pair: 'accel', details: 'Work on reaction and sprinting after pass to exploit space.' },
  { id: 4, name: 'Defensive Recovery (Czarna Obrona)', description: 'High-intensity defensive recovery and covering runs.', category: 'defense', pair: 'accel', details: 'Quick recovery positioning and intercepting runs.' },

  // Other skills (unpaired)
  { id: 5, name: 'Passing', description: 'Short and long passing techniques and drills.', category: 'attack', details: 'Work on accuracy, weight and timing of passes. Includes one-touch passing drills.' },
  { id: 6, name: 'Shooting', description: 'Finishing techniques and accuracy drills.', category: 'attack', details: 'Shooting from different angles, volleys and placement.' },
  { id: 7, name: 'Tackling', description: 'Individual tackling and recovery techniques.', category: 'defense', details: 'Timing of tackles, body position and recovery runs.' },
  { id: 8, name: 'Marking', description: 'Player and zonal marking principles.', category: 'defense', details: 'Positioning, awareness, and communication while marking.' },
];
