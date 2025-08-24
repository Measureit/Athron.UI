// Typy i definicje elementów boiska
export type BuilderElement =
  | { type: 'player'; id: number; x: number; y: number } // x, y: procenty
  | { type: 'ball'; x: number; y: number } // x, y: procenty
  | { type: 'goal'; x: number; y: number; width: number; height: number } // x, y, width, height: procenty
  | { type: 'cone'; x: number; y: number } // x, y: procenty
  | { type: 'pitch'; x: number; y: number; width?: number; height?: number } // x, y, width, height: procenty
  | { type: 'pass'; from: number; to: number }
  | { type: 'shot'; from: number; to: 'goal' }
  | { type: 'run'; id: number; to: { x: number; y: number } } // x, y: procenty
  | { type: 'dribble'; id: number; to: { x: number; y: number } }; // x, y: procenty
