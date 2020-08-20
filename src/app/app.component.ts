import { Component, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import * as shape from 'd3-shape';
import { Edge, Node, ClusterNode, Layout } from '@swimlane/ngx-graph';
import { netstat1,sender1, netstat2, sender2 } from './data';
import { Subject } from 'rxjs';
import {ThemePalette} from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit  {
  name = 'DistributionCenter';
  value:string = "Search here"
  task: Task = {
    name: 'Run All',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Get PSlist', completed: false, color: 'primary'},
      {name: 'Install McAfee', completed: false, color: 'accent'},
      {name: 'Disable Interface', completed: false, color: 'warn'}
    ]
  };
  opened: boolean = false;
  nodes: Node[] = [];
  clusters: ClusterNode[]  = [];

  links: Edge[]  = [];
  netstat1 = netstat1;
  netstat2 = netstat2;
  layout: String | Layout = 'dagreCluster';
  layouts: any[] = [
    {
      label: 'Dagre',
      value: 'dagre',
    },
    {
      label: 'Dagre Cluster',
      value: 'dagreCluster',
      isClustered: true,
    },
    {
      label: 'Cola Force Directed',
      value: 'colaForceDirected',
      isClustered: true,
    },
    {
      label: 'D3 Force Directed',
      value: 'd3ForceDirected',
    },
  ];


  // line interpolation
  curveType: string = 'Natural';
  curve: any = shape.curveNatural;
  interpolationTypes = [
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before'
  ];  

  draggingEnabled: boolean = true;
  panningEnabled: boolean = true;
  zoomEnabled: boolean = true;

  zoomSpeed: number = 0.1;
  minZoomLevel: number = 0.1;
  maxZoomLevel: number = 4.0;
  panOnZoom: boolean = true;

  autoZoom: boolean = false;
  autoCenter: boolean = false; 

  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();
  choosen: string;

  allComplete: boolean = false;
  tNodes:Node[];
  tEdges:Edge[];
  data: { Info: { OS: string; Administrators: string[]; RAM: string; Drives: string[]; }; "Arcsight Events": { type: string; Service: string; "Extra Data": string; }[]; Files: { Name: string; Path: string; Hash: string; }[]; Processes: { Name:String,
  Path:String,
  User:String,
  Hash:String }[]; };

  onKey(event) {
    let idsArray:string[]=[];
    let inputValue = event.target.value;
    this.tNodes= [];
    this.tEdges= [];
    this.nodes.forEach(element=>{
      if(element.id.startsWith(inputValue))
      {
        this.tNodes.push(element);
        idsArray.push(element.id);
      }
    });
    this.links.forEach(element=>{
      if(element.target.startsWith(inputValue) || element.source.startsWith(inputValue))
      {
        this.tEdges.push(element);
          if(idsArray.indexOf(element.target) == -1)
        {
          
          let tNode:Node = {
            id: element.target,
            label: element.target,
          }
          this.tNodes.push(tNode);
          idsArray.push(tNode.id);

        }
        if(idsArray.indexOf(element.source) == -1)
        {
          
          let tNode:Node = {
            id: element.source,
            label: element.source,
          }
          this.tNodes.push(tNode);
          idsArray.push(tNode.id);
        }
      }
    })
  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }
  
  getData()
  {
    this.data= {
      "Info":{"OS":"Windows 10",
      "Administrators":["Shmulik"],
      "RAM":"32GB",
      "Drives":["C", "D"]
    },
      "Arcsight Events": [{
        "type":"Virus",
        "Service":"McAfee",
        "Extra Data": "C:\\Falafel.exe"
      },
    {
      "type":"Networking",
      "Service": "FW",
      "Extra Data":"SMB TO DC"
    }],
    "Files":[{
      "Name":"NotMalware.png.exe",
      "Path":"C:\\",
      "Hash": "8743b52063cd84097a65d1633f5c74f5"
    },
    {
      "Name":"HelloWorld.exe",
      "Path":"C:\\",
      "Hash": "8743b52063cd84097a65d16qeq5c74f5"
    }
  ],
  "Processes":[{
    "Name": "HelloWorld.exe",
    "Path":"C:\\",
    "User":"Domain/Shmulik",
    "Hash":"8743b52063cd84097a65d1633f5c74f5"
  }
  ,{
    "Name": "HelloWorld.png.exe",
    "Path":"D:\\",
    "User":"./Mohamad",
    "Hash":"8743b52063cd84011a65d1633f5c74f5"
  },
  ]
    }
  }
  ngOnInit() 
  {
    this.getData();
    let id = 0;
    let sNode:Node = {
      id: sender1,
      label: sender1
    }
    let idsArray:string[] = [];
    this.nodes.push(sNode)
    this.netstat1.forEach(element => { 
      let tNode:Node = {
        id: element["ForeignAddressIP"],
        label: element["ForeignAddressIP"],
      }
      let tEdge:Edge = {
        id:"A" + id++,// "" + sender +"->"+ element["ForeignAddressIP"] + element["Process"] ,
        source: element["ForeignAddressIP"],
        target: sender1,
        label:""+element["Process"]+element["ForeignAddressPort"],
        data:{
          "Protocole": element["Protocole"],
          "state": element["State"]
        }
      }
     /* "Process":  "[ServiceHub.SettingsHost.exe]",
      "Protocole":  "TCP",
      "State":  "ESTABLISHED",
      "ForeignAddressPort":  "9354",
      "ForeignAddressIP":  "52.166.127.37"*/
      if(idsArray.indexOf(tNode.id) == -1)
      {
        this.nodes.push(tNode);
        idsArray.push(tNode.id);
      }
      this.links.push(tEdge)
    });
    sNode = {
      id: sender2,
      label: sender2
    }
    this.nodes.push(sNode)
    this.netstat2.forEach(element => { 
      let tNode:Node = {
        id: element["ForeignAddressIP"],
        label: element["ForeignAddressIP"],
      }
      let tEdge:Edge = {
        id:"A" + id++,// "" + sender +"->"+ element["ForeignAddressIP"] + element["Process"] ,
        source: element["ForeignAddressIP"],
        target: sender2,
        label:""+element["Process"]+element["ForeignAddressPort"],
        data:{
          "Protocole": element["Protocole"],
          "state": element["State"]
        }
      }
     /* "Process":  "[ServiceHub.SettingsHost.exe]",
      "Protocole":  "TCP",
      "State":  "ESTABLISHED",
      "ForeignAddressPort":  "9354",
      "ForeignAddressIP":  "52.166.127.37"*/
      if(idsArray.indexOf(tNode.id) == -1)
      {
        this.nodes.push(tNode);
        idsArray.push(tNode.id);
      }
      this.links.push(tEdge)
    });
    this.tEdges = this.links;
    this.tNodes = this.nodes;
    this.setInterpolationType(this.curveType);
  }
   
  setInterpolationType(curveType) {
    this.curveType = curveType;
    if (curveType === 'Bundle') {
      this.curve = shape.curveBundle.beta(1);
    }
    if (curveType === 'Cardinal') {
      this.curve = shape.curveCardinal;
    }
    if (curveType === 'Catmull Rom') {
      this.curve = shape.curveCatmullRom;
    }
    if (curveType === 'Linear') {
      this.curve = shape.curveLinear;
    }
    if (curveType === 'Monotone X') {
      this.curve = shape.curveMonotoneX;
    }
    if (curveType === 'Monotone Y') {
      this.curve = shape.curveMonotoneY;
    }
    if (curveType === 'Natural') {
      this.curve = shape.curveNatural;
    }
    if (curveType === 'Step') {
      this.curve = shape.curveStep;
    }
    if (curveType === 'Step After') {
      this.curve = shape.curveStepAfter;
    }
    if (curveType === 'Step Before') {
      this.curve = shape.curveStepBefore;
    }
  }

  setLayout(layoutName: string): void {
    const layout = this.layouts.find(l => l.value === layoutName);
    this.layout = layoutName;
    if (!layout.isClustered) {
      this.clusters = undefined;
    }/* else {
      this.clusters = clusters;
    }*/
  }
  openOptions(nodeID: string): void {
    this.choosen=nodeID;
    this.opened = true;
  }
}
