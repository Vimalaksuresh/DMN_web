import DmnModeler from 'dmn-js/lib/Modeler';

// Initialize DMN Modeler
const container = document.querySelector('#canvas');
const modeler = new DmnModeler({ container });

let diagramXML = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" xmlns:di="http://www.omg.org/spec/DMN/20180521/DI/" xmlns:camunda="http://camunda.org/schema/1.0/dmn" id="definitions_dish" name="DMN 1.3 Diagram" namespace="http://camunda.org/schema/1.0/dmn">
  <inputData id="dayType_id" name="Type of day">
    <variable id="dayType_ii" name="Type of day" typeRef="string" />
  </inputData>
  <inputData id="temperature_id" name="Weather in Celsius">
    <variable id="temperature_ii" name="Weather in Celsius" typeRef="integer" />
  </inputData>
  <knowledgeSource id="host_ks" name="Host" />
  <knowledgeSource id="guest_ks" name="Guest Type">
    <authorityRequirement id="AuthorityRequirement_04cnqj5">
      <requiredDecision href="#guestCount" />
    </authorityRequirement>
  </knowledgeSource>
  <businessKnowledgeModel id="elMenu" name="El menú" />
  <decision id="dish-decision" name="Dish Decision">
    <informationRequirement id="InformationRequirement_0tysaih">
      <requiredDecision href="#season" />
    </informationRequirement>
    <informationRequirement id="InformationRequirement_0q2n6w2">
      <requiredDecision href="#guestCount" />
    </informationRequirement>
    <authorityRequirement id="AuthorityRequirement_0gfalay">
      <requiredAuthority href="#host_ks" />
    </authorityRequirement>
    <decisionTable id="dishDecisionTable">
      <input id="seasonInput" label="Season" camunda:inputVariable="seasonInput">
        <inputExpression id="seasonInputExpression" typeRef="string" expressionLanguage="javascript">
          <text>return getSeason();</text>
        </inputExpression>
        <inputValues id="UnaryTests_0twhp5w">
          <text>"Winter","Summer","Spring"</text>
        </inputValues>
      </input>
      <input id="guestCountInput" label="How many guests">
        <inputExpression id="guestCountInputExpression" typeRef="integer">
          <text>guestCount</text>
        </inputExpression>
      </input>
      <output id="output1" label="Dish" name="desiredDish" typeRef="string">
        <outputValues id="UnaryTests_0y5qdnh">
          <text>"Spareribs","Pasta","Light salad","Beans salad","Stew","Steak"</text>
        </outputValues>
      </output>
      <rule id="row-495762709-1">
        <inputEntry id="UnaryTests_1nxcsjr">
          <text>if
  foo
then
  "Winter"
else
  "Summer"</text>
        </inputEntry>
        <inputEntry id="UnaryTests_1r9yorj">
          <text>&lt;= 8</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1mtwzqz">
          <text>"Spareribs"</text>
        </outputEntry>
      </rule>
      <rule id="row-495762709-2">
        <inputEntry id="UnaryTests_1lxjbif">
          <text>"Winter"</text>
        </inputEntry>
        <inputEntry id="UnaryTests_0nhiedb">
          <text>&gt; 8</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1h30r12" expressionLanguage="feel">
          <text>"Pasta"</text>
        </outputEntry>
      </rule>
      <rule id="row-495762709-3">
        <description></description>
        <inputEntry id="UnaryTests_0ifgmfm">
          <text>"Summer"</text>
        </inputEntry>
        <inputEntry id="UnaryTests_12cib9m">
          <text>&gt; 10</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_0wgaegy" expressionLanguage="feel">
          <description>Best for the hot season!</description>
          <text>"Light salad"</text>
        </outputEntry>
      </rule>
      <rule id="row-495762709-7">
        <inputEntry id="UnaryTests_0ozm9s7" expressionLanguage="javascript">
          <description>The "YEA" season</description>
          <text>seasonInput.endsWith("YEA")</text>
        </inputEntry>
        <inputEntry id="UnaryTests_0sesgov">
          <text>&lt;= 10</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1dvc5x3">
          <text>"Beans salad"</text>
        </outputEntry>
      </rule>
      <rule id="row-445981423-3">
        <description></description>
        <inputEntry id="UnaryTests_1er0je1">
          <text>"Spring"</text>
        </inputEntry>
        <inputEntry id="UnaryTests_1uzqner">
          <text>&lt; 10</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1pxy4g1">
          <text>"Stew"</text>
        </outputEntry>
      </rule>
      <rule id="row-445981423-4">
        <inputEntry id="UnaryTests_06or48g">
          <text>"Spring"</text>
        </inputEntry>
        <inputEntry id="UnaryTests_0wa71sy" expressionLanguage="javascript">
          <description>&lt;= 10</description>
          <text>Math.min(
  cellInput, 10
) == 10</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_09ggol9">
          <text>"Steak"</text>
        </outputEntry>
      </rule>
    </decisionTable>
  </decision>
  <decision id="season" name="Season decision">
    <informationRequirement id="InformationRequirement_1dla552">
      <requiredInput href="#temperature_id" />
    </informationRequirement>
    <decisionTable id="seasonDecisionTable">
      <input id="temperatureInput" label="Weather in Celsius">
        <inputExpression id="temperatureInputExpression" typeRef="integer">
          <text>temperature</text>
        </inputExpression>
      </input>
      <output id="seasonOutput" label="season" name="season" typeRef="string" />
      <rule id="row-495762709-5">
        <inputEntry id="UnaryTests_1fd0eqo">
          <text>&gt;30</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_0l98klb">
          <text>"Summer"</text>
        </outputEntry>
      </rule>
      <rule id="row-495762709-6">
        <inputEntry id="UnaryTests_1nz6at2">
          <text>&lt;10</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_08moy1k">
          <text>"Winter"</text>
        </outputEntry>
      </rule>
      <rule id="row-445981423-2">
        <inputEntry id="UnaryTests_1a0imxy">
          <text>[10..30]</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1poftw4">
          <text>"Spring"</text>
        </outputEntry>
      </rule>
    </decisionTable>
  </decision>
  <decision id="guestCount" name="Guest Count">
    <informationRequirement id="InformationRequirement_1w1qupa">
      <requiredInput href="#dayType_id" />
    </informationRequirement>
    <knowledgeRequirement id="KnowledgeRequirement_137wcuy">
      <requiredKnowledge href="#elMenu" />
    </knowledgeRequirement>
    <decisionTable id="guestCountDecisionTable">
      <input id="typeOfDayInput" label="Type of day">
        <inputExpression id="typeOfDayInputExpression" typeRef="string">
          <text>dayType</text>
        </inputExpression>
      </input>
      <output id="guestCountOutput" label="Guest count" name="guestCount" typeRef="integer" />
      <rule id="row-495762709-8">
        <inputEntry id="UnaryTests_0l72u8n">
          <text>"Weekday"</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_0wuwqaz">
          <text>4</text>
        </outputEntry>
      </rule>
      <rule id="row-495762709-9">
        <inputEntry id="UnaryTests_03a73o9">
          <text>"Holiday"</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1whn119">
          <text>10</text>
        </outputEntry>
      </rule>
      <rule id="row-495762709-10">
        <inputEntry id="UnaryTests_12tygwt">
          <text>"Weekend"</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1b5k9t8">
          <text>15</text>
        </outputEntry>
      </rule>
    </decisionTable>
  </decision>
  <decision id="Decision_1koag35" name="It&#39;s lit">
    <variable id="InformationItem_10cg57g" name="itsLit" typeRef="string" />
    <literalExpression id="LiteralExpression_0bhgyiw" expressionLanguage="javascript">
      <text>return "It's lit!";</text>
    </literalExpression>
  </decision>
  <textAnnotation id="TextAnnotation_1t4zaz9">
    <text>foobar</text>
  </textAnnotation>
  <association id="Association_1c4jixb">
    <sourceRef href="#dayType_id" />
    <targetRef href="#TextAnnotation_1t4zaz9" />
  </association>
  <dmndi:DMNDI>
    <dmndi:DMNDiagram>
      <dmndi:DMNShape dmnElementRef="dayType_id">
        <dc:Bounds height="45" width="125" x="240" y="270" />
      </dmndi:DMNShape>
      <dmndi:DMNShape dmnElementRef="temperature_id">
        <dc:Bounds height="45" width="125" x="5" y="270" />
      </dmndi:DMNShape>
      <dmndi:DMNShape dmnElementRef="host_ks">
        <dc:Bounds height="63" width="100" x="493" y="4" />
      </dmndi:DMNShape>
      <dmndi:DMNShape dmnElementRef="guest_ks">
        <dc:Bounds height="63" width="100" x="495" y="147" />
      </dmndi:DMNShape>
      <dmndi:DMNEdge dmnElementRef="AuthorityRequirement_04cnqj5">
        <di:waypoint x="410" y="172" />
        <di:waypoint x="495" y="172" />
      </dmndi:DMNEdge>
      <dmndi:DMNShape dmnElementRef="elMenu">
        <dc:Bounds height="46" width="135" x="450" y="250" />
      </dmndi:DMNShape>
      <dmndi:DMNShape dmnElementRef="dish-decision">
        <dc:Bounds height="80" width="180" x="140" y="5" />
      </dmndi:DMNShape>
      <dmndi:DMNEdge dmnElementRef="InformationRequirement_0tysaih">
        <di:waypoint x="80" y="132" />
        <di:waypoint x="140" y="81" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge dmnElementRef="InformationRequirement_0q2n6w2">
        <di:waypoint x="345" y="138" />
        <di:waypoint x="257" y="85" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge dmnElementRef="AuthorityRequirement_0gfalay">
        <di:waypoint x="493" y="24" />
        <di:waypoint x="320" y="25" />
      </dmndi:DMNEdge>
      <dmndi:DMNShape dmnElementRef="season">
        <dc:Bounds height="80" width="180" x="10" y="132" />
      </dmndi:DMNShape>
      <dmndi:DMNEdge dmnElementRef="InformationRequirement_1dla552">
        <di:waypoint x="80" y="270" />
        <di:waypoint x="80" y="212" />
      </dmndi:DMNEdge>
      <dmndi:DMNShape dmnElementRef="guestCount">
        <dc:Bounds height="80" width="180" x="230" y="138" />
      </dmndi:DMNShape>
      <dmndi:DMNEdge dmnElementRef="InformationRequirement_1w1qupa">
        <di:waypoint x="340" y="270" />
        <di:waypoint x="340" y="218" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge dmnElementRef="KnowledgeRequirement_137wcuy">
        <di:waypoint x="450" y="275" />
        <di:waypoint x="410" y="209" />
      </dmndi:DMNEdge>
      <dmndi:DMNShape dmnElementRef="Decision_1koag35">
        <dc:Bounds height="80" width="180" x="670" y="141" />
      </dmndi:DMNShape>
      <dmndi:DMNShape dmnElementRef="TextAnnotation_1t4zaz9">
        <dc:Bounds height="45" width="125" x="240" y="400" />
      </dmndi:DMNShape>
      <dmndi:DMNEdge dmnElementRef="Association_1c4jixb">
        <di:waypoint x="275" y="315" />
        <di:waypoint x="240" y="400" />
      </dmndi:DMNEdge>
    </dmndi:DMNDiagram>
  </dmndi:DMNDI>
</definitions>
`;

async function loadDiagram(diagramXML) {
  try {
    await modeler.importXML(diagramXML);
    setupEventListeners();
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
  loadDiagram(diagramXML);
}

document.querySelector('#new').addEventListener('click', createNewDiagram);

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

// Mouse events for drawing lines
let drawing = false;
let startElement = null;
let lineElement = null;

function setupEventListeners() {
  const canvas = document.querySelector('#canvas');
  
  canvas.addEventListener('mousedown', (event) => {
    const target = event.target;
    if (target.classList.contains('djs-shape')) {
      startElement = target;
      drawing = true;

      // Create a line element
      lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      lineElement.setAttribute('style', 'stroke: black; stroke-width: 2px;');
      lineElement.setAttribute('x1', event.clientX);
      lineElement.setAttribute('y1', event.clientY);
      canvas.querySelector('svg').appendChild(lineElement);

      document.addEventListener('mousemove', drawLine);
      document.addEventListener('mouseup', endDrawing);
    }
  });
  
  function drawLine(event) {
    if (drawing && lineElement) {
      lineElement.setAttribute('x2', event.clientX);
      lineElement.setAttribute('y2', event.clientY);
    }
  }

  function endDrawing(event) {
    if (drawing && lineElement) {
      lineElement.setAttribute('x2', event.clientX);
      lineElement.setAttribute('y2', event.clientY);
      lineElement.setAttribute('data-start-id', startElement.getAttribute('id'));
      lineElement.setAttribute('data-end-id', getClosestElement(event.clientX, event.clientY));
      
      drawing = false;
      startElement = null;
      lineElement = null;
      document.removeEventListener('mousemove', drawLine);
      document.removeEventListener('mouseup', endDrawing);
    }
  }
}

function getClosestElement(x, y) {
  const shapes = document.querySelectorAll('.djs-shape');
  let closest = null;
  let minDist = Infinity;

  shapes.forEach(shape => {
    const rect = shape.getBoundingClientRect();
    const dist = Math.hypot(rect.left - x, rect.top - y);
    if (dist < minDist) {
      minDist = dist;
      closest = shape.getAttribute('id');
    }
  });

  return closest;
}

function deleteBox(boxId) {
  const box = document.querySelector(`#${boxId}`);
  if (box) {
    // Remove box
    box.remove();

    // Remove connected lines
    const lines = document.querySelectorAll(`line[data-start-id="${boxId}"], line[data-end-id="${boxId}"]`);
    lines.forEach(line => line.remove());

    // Update diagram XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(diagramXML, "application/xml");
    const shapeToRemove = xmlDoc.getElementById(boxId.replace('Decision_', 'DMNShape_'));
    if (shapeToRemove) {
      shapeToRemove.parentNode.removeChild(shapeToRemove);
    }

    diagramXML = new XMLSerializer().serializeToString(xmlDoc);
  }
}



setupEventListeners();
