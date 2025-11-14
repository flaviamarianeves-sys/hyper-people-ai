import { CSSProperties, useMemo } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape, { ElementDefinition, LayoutOptions, Stylesheet, EdgeSingular } from "cytoscape";
// @ts-expect-error - registro opcional do layout
import fcose from "cytoscape-fcose";

import { OrganizationalNetworkData } from "@/types";

type CytoscapeExtensionCapable = typeof cytoscape & {
  use?: (ext: unknown) => void;
  fcose?: unknown;
};

const cytoscapeWithExtensions = cytoscape as CytoscapeExtensionCapable;

if (typeof cytoscapeWithExtensions.use === "function") {
  cytoscapeWithExtensions.use(fcose);
}

type Props = {
  data: OrganizationalNetworkData;
  height?: number | string;
};

const departmentPalette: Record<string, { fill: string; stroke: string }> = {
  Diretoria: { fill: "#fde68a", stroke: "#f59e0b" },
  Tecnologia: { fill: "#e0e7ff", stroke: "#4f46e5" },
  Marketing: { fill: "#f3e8ff", stroke: "#9333ea" },
  Vendas: { fill: "#e0f2fe", stroke: "#0284c7" },
  RH: { fill: "#ccfbf1", stroke: "#0f766e" },
  Financeiro: { fill: "#fde1d3", stroke: "#d97706" },
};

const defaultNodeColors = { fill: "#e2e8f0", stroke: "#475569" };

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  const initials = `${first}${last}`.toUpperCase();
  return initials || first.toUpperCase() || "?";
}

function createAvatarDataUrl(name: string, background: string) {
  const initials = getInitials(name);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'>\n  <rect width='256' height='256' rx='128' ry='128' fill='${background}'/>\n  <text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, system-ui, sans-serif' font-size='120' font-weight='600' fill='#0f172a'>${initials}</text>\n</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function sanitizePhotoUrl(name: string, rawUrl: string | undefined, fallbackColor: string) {
  if (!rawUrl) {
    return createAvatarDataUrl(name, fallbackColor);
  }

  let cleaned = rawUrl.trim();
  if (!cleaned) {
    return createAvatarDataUrl(name, fallbackColor);
  }

  if (cleaned.startsWith("url(")) {
    cleaned = cleaned.replace(/^url\((.*)\)$/i, "$1");
  }

  cleaned = cleaned.replace(/^['"]|['"]$/g, "");

  if (cleaned.startsWith("//")) {
    cleaned = `https:${cleaned}`;
  }

  if (!cleaned.startsWith("http") && !cleaned.startsWith("data:")) {
    return createAvatarDataUrl(name, fallbackColor);
  }

  return cleaned;
}

function frequencyToEdgeWidth(frequency: number) {
  const minWidth = 1;
  const maxWidth = 7;
  const minValue = 1;
  const maxValue = 25;
  const clamped = Math.max(minValue, Math.min(maxValue, frequency));
  return minWidth + ((maxWidth - minWidth) * (clamped - minValue)) / (maxValue - minValue);
}

function frequencyToEdgeOpacity(frequency: number) {
  const minOpacity = 0.1;
  const maxOpacity = 0.95;
  const minValue = 1;
  const maxValue = 25;
  const clamped = Math.max(minValue, Math.min(maxValue, frequency));
  return minOpacity + ((maxOpacity - minOpacity) * (clamped - minValue)) / (maxValue - minValue);
}

function totalFrequencyToNodeSize(total: number) {
  const minSize = 80;
  const maxSize = 160;
  const minValue = 5;
  const maxValue = 120;
  const clamped = Math.max(minValue, Math.min(maxValue, total));
  return minSize + ((maxSize - minSize) * (clamped - minValue)) / (maxValue - minValue);
}

function frequencyToDistance(frequency: number) {
  const minDistance = 40;
  const maxDistance = 480;
  const minValue = 1;
  const maxValue = 25;
  const clamped = Math.max(minValue, Math.min(maxValue, frequency));
  return maxDistance - ((maxDistance - minDistance) * (clamped - minValue)) / (maxValue - minValue);
}

export function OrganizationalNetworkGraph({ data, height = 420 }: Props) {
  const elements = useMemo<ElementDefinition[]>(() => {
    const totalFrequencyByNode = new Map<string, number>();

    data.links.forEach((link) => {
      totalFrequencyByNode.set(
        link.source,
        (totalFrequencyByNode.get(link.source) || 0) + link.frequencyPerWeek
      );
      totalFrequencyByNode.set(
        link.target,
        (totalFrequencyByNode.get(link.target) || 0) + link.frequencyPerWeek
      );
    });

    const nodeElements = data.nodes.map((node) => {
      const colors = departmentPalette[node.department] ?? defaultNodeColors;
      const totalFrequency = totalFrequencyByNode.get(node.id) ?? 12;
      const imageSource = sanitizePhotoUrl(node.name, node.photoUrl, colors.stroke);

      return {
        data: {
          id: node.id,
          label: node.name,
          role: node.role,
          photoUrl: imageSource,
          department: node.department,
          fillColor: colors.fill,
          borderColor: colors.stroke,
          size: totalFrequencyToNodeSize(totalFrequency),
        },
      };
    });

    const edgeElements = data.links.map((link) => ({
      data: {
        id: link.id,
        source: link.source,
        target: link.target,
        frequency: link.frequencyPerWeek,
        label: `${link.frequencyPerWeek}/sem`,
        width: frequencyToEdgeWidth(link.frequencyPerWeek),
        opacity: frequencyToEdgeOpacity(link.frequencyPerWeek),
        distance: frequencyToDistance(link.frequencyPerWeek),
      },
    }));

    return [...nodeElements, ...edgeElements];
  }, [data]);

  const stylesheet = useMemo<Stylesheet[]>(
    () => [
      {
        selector: "node",
        style: {
          shape: "ellipse",
          "background-color": "data(fillColor)",
          "background-opacity": 1,
          "background-image": "data(photoUrl)",
          "background-fit": "cover",
          "background-repeat": "no-repeat",
          "background-clip": "node",
          "background-width": "88%",
          "background-height": "88%",
          "background-image-crossorigin": "anonymous",
          label: "data(label)",
          color: "#0f172a",
          "font-size": 14,
          "font-weight": 600,
          "text-wrap": "wrap",
          "text-max-width": "120px",
          "text-valign": "top",
          "text-halign": "center",
          "text-margin-y": "-22px",
          "text-outline-width": 6,
          "text-outline-color": "rgba(255,255,255,0.95)",
          "border-color": "data(borderColor)",
          "border-width": 6,
          width: "data(size)",
          height: "data(size)",
          "line-height": 1.2,
          "shadow-blur": 14,
          "shadow-color": "rgba(15,23,42,0.18)",
          "shadow-offset-x": 0,
          "shadow-offset-y": 8,
        },
      },
      {
        selector: "edge",
        style: {
          "curve-style": "bezier",
          width: "data(width)",
          "line-color": "#94a3b8",
          opacity: "data(opacity)",
          "target-arrow-shape": "triangle",
          "target-arrow-color": "#94a3b8",
          label: "data(label)",
          "font-size": 10,
          "text-background-color": "rgba(255,255,255,0.95)",
          "text-background-opacity": 0.95,
          "text-background-padding": "2px",
          "text-rotation": "autorotate",
          "text-opacity": 0,
          "arrow-scale": 0.8,
        },
      },
      {
        selector: "edge:selected",
        style: {
          "line-color": "#1d4ed8",
          "target-arrow-color": "#1d4ed8",
          "text-opacity": 1,
          "font-weight": 600,
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

  const layout = (typeof cytoscapeWithExtensions.fcose === "function"
    ? ({
        name: "fcose",
        quality: "proof",
        animate: false,
        randomize: false,
        fit: true,
        padding: 72,
        nodeDimensionsIncludeLabels: true,
        nodeRepulsion: 4200,
        nodeSeparation: 220,
        gravity: 0.3,
        gravityRange: 4,
        edgeElasticity: 0.15,
        idealEdgeLength: (edge: EdgeSingular) => edge.data("distance") ?? 160,
      } as LayoutOptions)
    : ({
        name: "cose",
        animate: false,
        gravity: 0,
        padding: 72,
      } as LayoutOptions));

  const canvasStyle: CSSProperties =
    height !== undefined
      ? { height: typeof height === "number" ? `${height}px` : height, minHeight: 320 }
      : { height: "420px", minHeight: 320 };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-muted bg-background">
      <CytoscapeComponent
        elements={elements}
        stylesheet={stylesheet}
        style={{ width: "100%", ...canvasStyle }}
        layout={layout}
        wheelSensitivity={0.2}
        minZoom={0.2}
        maxZoom={3}
      />
      <Legend />
    </div>
  );
}

function Legend() {
  return (
    <div className="border-t border-muted bg-muted/30 px-4 py-3 text-xs text-muted-foreground flex-shrink-0">
      <p className="font-medium text-foreground">Legenda</p>
      <div className="mt-2 flex flex-wrap gap-3">
        {Object.entries(departmentPalette).map(([department, colors]) => (
          <div key={department} className="flex items-center gap-2">
            <span
              className="h-3.5 w-3.5 rounded-full"
              style={{ backgroundColor: colors.fill, border: `1px solid ${colors.stroke}` }}
            />
            <span>{department}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full border border-slate-500 bg-transparent" />
          <span>Outros setores</span>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground/80">
        Conexões mais fortes indicam maior frequência de comunicação semanal.
      </p>
    </div>
  );
}
