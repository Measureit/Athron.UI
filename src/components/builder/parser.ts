// Parser pseudo-języka <-> elementy graficzne
import { BuilderElement } from './elements';

export function parseTextToElements(text: string): BuilderElement[] {
  // Prosty parser, obsługuje linie jak w przykładzie
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const elements: BuilderElement[] = [];
  for (const line of lines) {
    if (/^PLAYER (\d+) AT \((\d+),(\d+)\)$/i.test(line)) {
      const [, id, x, y] = line.match(/^PLAYER (\d+) AT \((\d+),(\d+)\)$/i)!;
      elements.push({ type: 'player', id: Number(id), x: Number(x), y: Number(y) });
    } else if (/^BALL AT \((\d+),(\d+)\)$/i.test(line)) {
      const [, x, y] = line.match(/^BALL AT \((\d+),(\d+)\)$/i)!;
      elements.push({ type: 'ball', x: Number(x), y: Number(y) });
    } else if (/^GOAL AT \((\d+),(\d+)\) SIZE (\d+)x(\d+)$/i.test(line)) {
      const [, x, y, w, h] = line.match(/^GOAL AT \((\d+),(\d+)\) SIZE (\d+)x(\d+)$/i)!;
      elements.push({ type: 'goal', x: Number(x), y: Number(y), width: Number(w), height: Number(h) });
    } else if (/^PASS FROM (\d+) TO (\d+)$/i.test(line)) {
      const [, from, to] = line.match(/^PASS FROM (\d+) TO (\d+)$/i)!;
      elements.push({ type: 'pass', from: Number(from), to: Number(to) });
    } else if (/^SHOT FROM (\d+) TO GOAL$/i.test(line)) {
      const [, from] = line.match(/^SHOT FROM (\d+) TO GOAL$/i)!;
      elements.push({ type: 'shot', from: Number(from), to: 'goal' });
    } else if (/^RUN (\d+) TO \((\d+),(\d+)\)$/i.test(line)) {
      const [, id, x, y] = line.match(/^RUN (\d+) TO \((\d+),(\d+)\)$/i)!;
      elements.push({ type: 'run', id: Number(id), to: { x: Number(x), y: Number(y) } });
    } else if (/^DRIBBLE (\d+) TO \((\d+),(\d+)\)$/i.test(line)) {
      const [, id, x, y] = line.match(/^DRIBBLE (\d+) TO \((\d+),(\d+)\)$/i)!;
      elements.push({ type: 'dribble', id: Number(id), to: { x: Number(x), y: Number(y) } });
    }
  }
  return elements;
}

export function elementsToText(elements: BuilderElement[]): string {
  return elements.map(el => {
    switch (el.type) {
      case 'player': return `PLAYER ${el.id} AT (${el.x},${el.y})`;
      case 'ball': return `BALL AT (${el.x},${el.y})`;
      case 'goal': return `GOAL AT (${el.x},${el.y}) SIZE ${el.width}x${el.height}`;
      case 'pass': return `PASS FROM ${el.from} TO ${el.to}`;
      case 'shot': return `SHOT FROM ${el.from} TO GOAL`;
      case 'run': return `RUN ${el.id} TO (${el.to.x},${el.to.y})`;
      case 'dribble': return `DRIBBLE ${el.id} TO (${el.to.x},${el.to.y})`;
    }
  }).join('\n');
}
