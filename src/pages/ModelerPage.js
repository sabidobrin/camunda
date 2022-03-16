import React, { Component } from "react";
import BpmnJS from "bpmn-js/dist/bpmn-modeler.development.js";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="3.3.5">
  <bpmn:process id="Process_1" isExecutable="true">
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

// export a modeler page component
// use the Modeler to instantiate a modeler instance
export default class ModelerPage extends Component {
    constructor(props) {
        super(props);
        this.modeler = new BpmnJS();
        this.modeler.importXML(xml, err => {
            if (err) { console.error(err); }
            const canvas = this.modeler.get("canvas");
            canvas.zoom("fit-viewport");
        });
    }

    componentDidMount() {
        this.modeler.attachTo(".modeler");
    }
    componentWillUnmount() {
        this.modeler.detach();
    }

    render() {
        return (<>
            <h1>Modeler</h1>
            <div className="modeler" />
        </>);
    }
}