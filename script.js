$(function(){ // on dom ready

var cy = cytoscape({
  container: document.getElementById('cy'),

  boxSelectionEnabled: true,
  autounselectify: true,

  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'content': 'data(id)'
      })
    .selector('edge')
      .css({
        'target-arrow-shape': 'triangle',
        'width': 4,
        'line-color': '#ddd',
        'target-arrow-color': '#ddd',
        'curve-style': 'bezier'
      })
    .selector('.highlighted')
      .css({
        'background-color': '#61bffc',
        'line-color': '#61bffc',
        'target-arrow-color': '#61bffc',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s'
      }),
  
  elements: {
      nodes: [
        { data: { id: 'a' } },
        { data: { id: 'b' } },
        { data: { id: 'c' } },
        { data: { id: 'e' } },
        { data: { id: 'H' } },
        { data: { id: 'I' } },
      ], 
      edges: [
        { data: { id: 'a"e', weight: 1, source: 'a', target: 'e' } },
        { data: { id: 'ab', weight: 2, source: 'a', target: 'b' } },
        { data: { id: 'bc', weight: 3, source: 'b', target: 'c' } },
        { data: { id: 'ce', weight: 4, source: 'e', target: 'c' } },
        { data: { id: 'Ha', weight: 5, source: 'H', target: 'a' } },
        { data: { id: 'cI', weight: 6, source: 'c', target: 'I' } }
      ]
    },
  
  layout: {
    name: 'breadthfirst',
    directed: true,
    roots: '#H',
    padding: 10
  }
});
  
var bfs = cy.elements().bfs('#H', function(){}, false);

var i = 0;
var highlightNextEle = function(){
  if( i < bfs.path.length ){
    bfs.path[i].addClass('highlighted');
    
    i++;
    setTimeout(highlightNextEle, 1000);
  }
};

// kick off first highlight
highlightNextEle();

}); // on dom ready