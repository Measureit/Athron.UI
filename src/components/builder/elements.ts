// Typy i definicje elementów boiska
export type BuilderElement =
  | { type: 'player'; id: number; x: number; y: number }
  | { type: 'ball'; x: number; y: number }
  | { type: 'goal'; x: number; y: number; width: number; height: number }
  | { type: 'cone'; x: number; y: number }
  | { type: 'whistle'; x: number; y: number }
  | { type: 'arrow'; x: number; y: number; length: number }
  | { type: 'pass'; from: number; to: number }
  | { type: 'shot'; from: number; to: 'goal' }
  | { type: 'run'; id: number; to: { x: number; y: number } }
  | { type: 'dribble'; id: number; to: { x: number; y: number } };
