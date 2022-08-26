import { dagreLayout, layoutFromGraph } from './dagre-layout';
import { DagreRelation } from "./dagre-relation";

describe('feakinExporter', () => {
  it('layout', () => {
    const relations: DagreRelation[] = [
      { source: { name: 'A' } },
      { source: { name: 'B' } },
      { source: { name: 'B' }, target: { name: 'C' } },
    ]

    const layout = dagreLayout(relations);

    expect(layout.nodes.length).toBe(3);
    expect(layout.nodes[0].width).toBe(100);
    expect(layout.nodes[0].height).toBe(40);
    expect(layout.edges.length).toBe(1);
  });

  it('target should have width and height', () => {
    const relations: DagreRelation[] = [
      { source: { name: 'A' } },
      { source: { name: 'B' } },
      { source: { name: 'B' }, target: { name: 'C' } },
    ]

    const layout = dagreLayout(relations);

    expect(layout.nodes[2].width).toBe(100);
    expect(layout.nodes[2].height).toBe(40);
  });

  it('layout from graph', () => {
    const graph = {
      nodes: [{
        id: "U2jQUtbIudP6mcK3m-h9A",
        label: "a",
        data: { parentId: "cluster0" }
      }, {
        id: "JPFSADS0a2-_DbCe-BJzh",
        label: "b",
        data: { parentId: "cluster0" }
      }, {
        id: "6BVXEC_zSMj8rPgkNQE2i",
        label: "c",
        data: { parentId: "cluster0" }
      }, {
        id: "m-p9n0ia2PnhlhsCjHtGk",
        label: "d",
        data: { parentId: "cluster0" }
      }, {
        id: "hyltjdnianpoY2tBk9ggQ",
        label: "e",
        data: { parentId: "cluster1" }
      }, {
        id: "I3NI2pRPZ3qxeLGisnPQi",
        label: "g",
        data: { parentId: "cluster1" }
      }, {
        id: "q3Aid1wx-BvJ8OYln2qoQ",
        label: "f",
        data: { parentId: "cluster1" }
      }],
      edges: [{
        id: "4igViy95Vk8Q3zLxeIeF1",
        points: [],
        data: {
          parentId: "cluster0",
          source: "a",
          target: "b",
          sourceId: "U2jQUtbIudP6mcK3m-h9A",
          targetId: "JPFSADS0a2-_DbCe-BJzh"
        }
      }, {
        id: "irWxJLrENUzqdzKB7t7fU",
        points: [],
        data: {
          parentId: "cluster0",
          source: "c",
          target: "d",
          sourceId: "6BVXEC_zSMj8rPgkNQE2i",
          targetId: "m-p9n0ia2PnhlhsCjHtGk"
        }
      }, {
        id: "EJGah1KZgp9T7L30bLtVQ",
        points: [],
        data: {
          parentId: "cluster1",
          source: "e",
          target: "g",
          sourceId: "hyltjdnianpoY2tBk9ggQ",
          targetId: "I3NI2pRPZ3qxeLGisnPQi"
        }
      }, {
        id: "FWSdeKwJAvAfYQu80s_La",
        points: [],
        data: {
          parentId: "cluster1",
          source: "e",
          target: "f",
          sourceId: "hyltjdnianpoY2tBk9ggQ",
          targetId: "q3Aid1wx-BvJ8OYln2qoQ"
        }
      }]
    }
    const layout = layoutFromGraph(graph);

    expect(layout.nodes.length).toBe(9);
    const subgraph = layout.nodes.filter(node => node.label === 'cluster0');
    expect(subgraph.length).toBe(1);
    expect(subgraph[0].subgraph).toBeTruthy();
  });
});
