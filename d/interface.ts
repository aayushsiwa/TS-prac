interface Point {
    x: number;
    y: number;
}
function logPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
}

logPoint({ x: 3, y: 4 });

const color = { x:1, y: 2 };
logPoint(color);