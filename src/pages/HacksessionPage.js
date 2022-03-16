import React, { useState, useEffect} from 'react';
import BpmnJS from "bpmn-js/dist/bpmn-modeler.development.js";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

export default function HackSessionPage () {

    const [xml, setXml] = useState(`<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="3.3.5">
      <bpmn:process id="Process_1" isExecutable="true">
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>`);

    const [overlayData, setOverlayData] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const fetchData = async () => {
        let id = document.getElementById('searchInput').value;

        try {
            const url = 'https://n35ro2ic4d.execute-api.eu-central-1.amazonaws.com/prod/engine-rest/process-instance';
            const response = await fetch(url + '/' + id, { method: 'get' });
            if(response.ok) {
                const responseData = await response.json();
                let definitionId = responseData.definitionId;

                try {
                    const nestedUrl = 'https://n35ro2ic4d.execute-api.eu-central-1.amazonaws.com/prod/engine-rest';
                    const nestedResponse = await fetch(nestedUrl + '/process-definition/' + definitionId + '/xml');
                    if(nestedResponse.ok) {
                        const nestedData = await nestedResponse.json();
                        setHasLoaded(true);
                        setXml(nestedData.bpmn20Xml);

                        try {
                            const url2 = 'https://n35ro2ic4d.execute-api.eu-central-1.amazonaws.com/prod/engine-rest';
                            const response2 = await fetch(url2 + '/history/activity-instance?processInstanceId=' + id);
                            if (response2.ok) {
                                const data2 = await response2.json();
                                setOverlayData(data2);
                            }

                        } catch (error) { console.log(error) }
                    }
                }
                catch (error) { console.log(error) }
            }
        } catch (error) { console.log(error) }
    }

    const [xmlView, setXmlView] = useState(new BpmnJS());
    useEffect(() => {
        xmlView.importXML(xml, err => {
            if (err) { console.error(err); }
            const canvas = xmlView.get("canvas");
            const overlays = xmlView.get("overlays");
            canvas.zoom("fit-viewport");

            for(let i=0; i<overlayData.length; i++) {
                if(overlayData[i].endTime !== null) {
                    overlays.add(overlayData[i].activityId, {
                        position: {
                            bottom: 0,
                            right: 0
                        },
                        html: '<div>{}{}</div>'
                    })
                }    
            }
        });
    }, [xml, hasLoaded]);

    useEffect(() => {
        xmlView.attachTo('.modeler');
        return function cleanup() {
            xmlView.detach();
        };
    }, []);

    return (<>
        <input id="searchInput" type="text"placeholder={'Process instance ID'} />
        <button type="button" id="button-search" onClick={fetchData} >GO</button>
        <div className="modeler" hidden={!hasLoaded} />
    </>);
}