import DmnModeler from 'dmn-js/lib/Modeler';

const container = document.querySelector('#canvas');
const modeler = new DmnModeler({ container });

async function loadDiagram(diagramXML) {
  try {
    await modeler.importXML(diagramXML);
  } catch (err) {
    console.error('Failed to load DMN:', err);
    alert("Failed to load file: " + err);
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
    // Define a minimal DMN XML in DMN 1.3 format
    const emptyDiagramXML = `<?xml version="1.0" encoding="UTF-8"?>
    <dmn:definitions xmlns:dmn="http://www.omg.org/spec/DMN/20180521/dmn.xsd"
                     xmlns:dmndi="http://www.omg.org/spec/DMN/20180521/dmnndi.xsd"
                     xmlns:dc="http://www.omg.org/spec/DD/20140101/dc.xsd"
                     xmlns:di="http://www.omg.org/spec/DD/20140101/di.xsd"
                     id="Definitions_1"
                     name="Definitions"
                     namespace="http://www.omg.org/spec/DMN/20180521/dmn">
      <dmn:decision id="Decision_1" name="Decision 1">
        <dmn:decisionTable id="DecisionTable_1">
          <dmn:input id="Input_1" label="Input 1">
            <dmn:inputExpression id="InputExpression_1" typeRef="string">
              <dmn:text>Input 1</dmn:text>
            </dmn:inputExpression>
          </dmn:input>
          <dmn:output id="Output_1" label="Output 1" name="Output 1" typeRef="string"/>
          <dmn:rule id="Rule_1">
            <dmn:inputEntry id="InputEntry_1">
              <dmn:text>"A"</dmn:text>
            </dmn:inputEntry>
            <dmn:outputEntry id="OutputEntry_1">
              <dmn:text>"Result"</dmn:text>
            </dmn:outputEntry>
          </dmn:rule>
        </dmn:decisionTable>
      </dmn:decision>
    </dmn:definitions>`;
  
    loadDiagram(emptyDiagramXML);
}

// Event listener for file load
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

// Event listener for save button
document.querySelector('#save').addEventListener('click', saveDiagram);
document.querySelector('#new').addEventListener('click', createNewDiagram);
