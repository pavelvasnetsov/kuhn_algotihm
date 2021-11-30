

function GET_NEW_GRAPH(numOfVertices) {
  const graph = [];
  graph.numOfVertices = numOfVertices;

  for (let i = 0; i < numOfVertices; i++) {
    graph[i] = [];

    for (let j = 0; j < numOfVertices; j++) {
      graph[i][j] = 0;
    }
  }

  let oneSide = Math.round(Math.random() * 10000) % numOfVertices;
  oneSide = oneSide ? oneSide : 1;

  graph.namOfEdges = (oneSide + 1) * (numOfVertices - oneSide - 1);

  for (let i = 0; i < numOfVertices; ++i) {
    for (let j = 0; j < numOfVertices; ++j) {
      if ((i <= oneSide && j > oneSide) || (i > oneSide && j <= oneSide)) {
        graph[i][j] = 1;
      }
    }
  }

  return graph;
}

function DFS(v, used, matching, graph, n) {
  if (used[v]) {
    return false;
  }

  used[v] = true;

  for (let to = 0; to < n; to++) {
    if (graph[v][to] === 1) {
      if (
        matching[to] === -1 ||
        DFS(matching[to], used, matching, graph, n)
      ) {
        matching[to] = v;
        return true;
      }
    }
  }

  return false;
}

let result = [];

for (let n = 100; n <= 10000; n += 100) {
  let matching = [];
  let used = [];
  let time = 0;

  for (let t = 0; t < 100; t++) {
    let graph = GET_NEW_GRAPH(n);
    let start = Date.now();
    for (let i = 0; i < n; i++) {
      matching[i] = -1;
      used[i] = false;
    }
  
    for (let i = 0; i < n; i++) {
      DFS(i, used, matching, graph, n);
    }
    let end = Date.now();
    time += end - start;
  }

  result.push([n ** 3, time / 100])
}


// return result;