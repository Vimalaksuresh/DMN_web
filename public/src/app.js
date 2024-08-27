import DmnModeler from 'dmn-js/lib/Modeler';

// Initialize DMN Modeler
const container = document.querySelector('#canvas');
const modeler = new DmnModeler({ container });

let lastBox = null;  // Keep track of the last created box
let draggingBox = null;  // Keep track of the box being dragged
let lines = [];  // Array to keep track of lines

async function loadDiagram(diagramXML) {
  try {
    console.log("Diagram XML:", diagramXML);
    await modeler.importXML(diagramXML);
  } catch (err) {
    console.error('Failed to load DMN:', err);
    alert('Failed to load file: ' + err.message);
  }
}

async function saveDiagram() {
  try {
    const { xml } = await modeler.saveXML({ format: true });
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.dmn';
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to save DMN:', err);
  }
}

function createNewDiagram() {
  const svgCanvas = document.querySelector('svg');

  // Clear any existing content
  svgCanvas.innerHTML = '';

  // Add the SVG structure here
  const existingBox = createBox(100, 100, 'Decision 1');
  svgCanvas.appendChild(existingBox);

  lastBox = existingBox;  // Set the first box as the last created box
}

function createBox(x, y, textContent) {
  const box = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  box.classList.add('box');

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', x);
  rect.setAttribute('y', y);
  rect.setAttribute('width', 180);
  rect.setAttribute('height', 80);
  rect.setAttribute('style', 'stroke: rgb(34, 36, 42); stroke-width: 2px; fill: white;');
  box.appendChild(rect);

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', x + 20);
  text.setAttribute('y', y + 45);
  text.setAttribute('font-family', 'Arial');
  text.setAttribute('font-size', '12');
  text.setAttribute('fill', 'rgb(34, 36, 42)');
  text.textContent = textContent;
  box.appendChild(text);

  const deleteButton = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  deleteButton.setAttribute('cx', x + 170);
  deleteButton.setAttribute('cy', y - 10);
  deleteButton.setAttribute('r', 10);
  deleteButton.setAttribute('style', 'fill: red; stroke: black; stroke-width: 1px; cursor: pointer;');
  deleteButton.addEventListener('click', (event) => {
    event.stopPropagation();  // Prevent triggering box drag event
    deleteBox(box);
  });
  box.appendChild(deleteButton);

  box.addEventListener('mousedown', (event) => {
    if (event.target === deleteButton) return;  // Ignore clicks on delete button
    draggingBox = box;
    document.addEventListener('mousemove', trackMouse);
    document.addEventListener('mouseup', stopDragging);
  });

  return box;
}

function deleteBox(box) {
  const svgCanvas = document.querySelector('svg');
  
  // Remove associated lines
  lines = lines.filter(line => {
    if (line.contains(box)) {
      svgCanvas.removeChild(line);
      return false;
    }
    return true;
  });

  svgCanvas.removeChild(box);
}

function trackMouse(event) {
  const { clientX: x, clientY: y } = event;
  showPreviewBox(x, y);
}

function stopDragging(event) {
  document.removeEventListener('mousemove', trackMouse);
  document.removeEventListener('mouseup', stopDragging);

  const { clientX: x, clientY: y } = event;

  if (!draggingBox) return;  // If no box was being dragged, do nothing

  const newBox = createBox(x - 90, y - 40, 'New Decision');
  const svgCanvas = document.querySelector('svg');
  svgCanvas.appendChild(newBox);

  connectBoxes(draggingBox, newBox);

  // Reset dragging box to null
  draggingBox = null;
}

function connectBoxes(box1, box2) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  const x1 = parseInt(box1.querySelector('rect').getAttribute('x')) + 90;
  const y1 = parseInt(box1.querySelector('rect').getAttribute('y')) + 80;
  const x2 = parseInt(box2.querySelector('rect').getAttribute('x')) + 90;
  const y2 = parseInt(box2.querySelector('rect').getAttribute('y'));

  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute('style', 'stroke: rgb(34, 36, 42); stroke-width: 2px;');

  const svgCanvas = document.querySelector('svg');
  svgCanvas.appendChild(line);

  lines.push(line);  // Store line reference for future removal
}

function showPreviewBox(x, y) {
  // Implementation to show a preview box during dragging (optional)
}

// Event listeners
document.querySelector('#load').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      loadDiagram(e.target.result);
    };
    reader.readAsText(file);
  }
});

document.querySelector('#save').addEventListener('click', saveDiagram);
document.querySelector('#new').addEventListener('click', createNewDiagram);
