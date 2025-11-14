import React, { CSSProperties, useMemo } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape, { ElementDefinition, LayoutOptions, Stylesheet } from "cytoscape";
// @ts-expect-error - só registre se instalou o plugin
import fcose from "cytoscape-fcose";

type CytoscapeExtensionCapable = typeof cytoscape & {
  use?: (ext: unknown) => void;
  fcose?: unknown;
};

const cytoscapeWithExtensions = cytoscape as CytoscapeExtensionCapable;

// registre o layout opcionalmente
if (typeof cytoscapeWithExtensions.use === "function") {
  cytoscapeWithExtensions.use(fcose);
}

/** Tipos */
export type EmployeeNode = {
  id: string;
  label: string;
  team?: string;
};

export type CommunicationEdge = {
  id: string;
  source: string;
  target: string;
  weightPerDay: number; // vezes por dia
};

type Props = {
  nodes: EmployeeNode[];
  edges: CommunicationEdge[];
  height?: string | number;
};

/** Helpers para mapear peso -> estilo */
function weightToWidth(w: number) {
  // ajuste os limites conforme seu dado
  const minW = 0.5, maxW = 10;
  const minVal = 1, maxVal = 50;
  const clamped = Math.max(minVal, Math.min(maxVal, w));
  return minW + (maxW - minW) * ((clamped - minVal) / (maxVal - minVal));
}

function weightToOpacity(w: number) {
  const min = 0.25, max = 1;
  const minVal = 1, maxVal = 50;
  const clamped = Math.max(minVal, Math.min(maxVal, w));
  return min + (max - min) * ((clamped - minVal) / (maxVal - minVal));
}

function weightToColor(w: number) {
  // escala simples claro->escuro (cinza); troque por uma paleta se quiser
  const minVal = 1, maxVal = 50;
  const clamped = Math.max(minVal, Math.min(maxVal, w));
  const t = (clamped - minVal) / (maxVal - minVal);
  const shade = Math.round(200 - t * 140); // 200 -> 60
  return `rgb(${shade}, ${shade}, ${shade})`;
}

/** Componente principal */
export default function GraphCommunication({ nodes, edges, height = 600 }: Props) {
  const elements = useMemo<ElementDefinition[]>(() => {
    const n = nodes.map((nd) => ({
      data: {
        id: nd.id,
        label: nd.label,
        team: nd.team ?? "N/A",
      },
    }));

    const e = edges.map((ed) => ({
      data: {
        id: ed.id,
        source: ed.source,
        target: ed.target,
        weight: ed.weightPerDay,
        label: `${ed.weightPerDay}/dia`,
        width: weightToWidth(ed.weightPerDay),
        color: weightToColor(ed.weightPerDay),
        opacity: weightToOpacity(ed.weightPerDay),
      },
    }));

    return [...n, ...e];
  }, [nodes, edges]);

  const stylesheet = useMemo<Stylesheet[]>(
    () => [
      {
        selector: "node",
        style: {
          "background-color": "#4F46E5",
          "label": "data(label)",
          "color": "#111827",
          "text-background-color": "#F9FAFB",
          "text-background-opacity": 1,
          "text-background-padding": "2px",
          "text-margin-y": "-2px",
          "font-size": 12,
          "width": 28,
          "height": 28,
          "border-color": "#111827",
          "border-width": 1,
        },
      },
      {
        selector: "edge",
        style: {
          "curve-style": "bezier",
          "line-color": "data(color)",
          "opacity": "data(opacity)",
          "width": "data(width)",
          "target-arrow-shape": "triangle",
          "target-arrow-color": "data(color)",
          "label": "data(label)",
          "font-size": 10,
          "text-rotation": "autorotate",
          "text-margin-y": -2,
        },
      },
      {
        selector: ":selected",
        style: {
          "border-width": 3,
          "border-color": "#111827",
          "line-color": "#111827",
          "target-arrow-color": "#111827",
        },
      },
    ],
    []
  );

  const layout: LayoutOptions =
    typeof cytoscapeWithExtensions.fcose !== "undefined"
      ? {
          name: "fcose",
          quality: "default",
          animate: false,
          randomize: false,
          fit: true,
          padding: 56,
          nodeDimensionsIncludeLabels: true,
          nodeRepulsion: 4200,
          nodeSeparation: 160,
          gravity: 0.3,
          gravityRange: 3,
          idealEdgeLength: 120,
          edgeElasticity: 0.25,
        }
      : {
          name: "cose",
          animate: true,
          fit: true,
          padding: 56,
        };

  const graphRegionStyle: CSSProperties =
    height !== undefined
      ? { height: typeof height === "number" ? `${height}px` : height }
      : { minHeight: 480 };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-muted bg-card text-card-foreground">
      <div className="flex-1 min-h-0" style={graphRegionStyle}>
        <CytoscapeComponent
          elements={elements}
          stylesheet={stylesheet}
          style={{ width: "100%", height: "100%" }}
          layout={layout}
          wheelSensitivity={0.2}
          minZoom={0.2}
          maxZoom={3}
        />
      </div>
      <Legend />
    </div>
  );
}

/** Legenda simples */
function Legend() {
  return (
    <div className="flex-shrink-0 border-t border-muted bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
      <p className="font-semibold text-foreground">Legenda</p>
      <p>Linhas mais espessas e escuras representam maior volume diário de comunicação.</p>
    </div>
  );
}
