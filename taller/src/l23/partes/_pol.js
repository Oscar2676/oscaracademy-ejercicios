/* cardioide r = 1 + cos θ y rejilla polar, comunes a las hojas polares del lote 23 */
var oaCar = { r:function(q){ return 1 + Math.cos(q); }, dr:function(q){ return -Math.sin(q); },
  x:function(q){ return (1 + Math.cos(q))*Math.cos(q); }, y:function(q){ return (1 + Math.cos(q))*Math.sin(q); },
  dx:function(q){ return -Math.sin(q)*(1 + 2*Math.cos(q)); }, dy:function(q){ return (2*Math.cos(q) - 1)*(Math.cos(q) + 1); },
  ts:function(s){ var TP = 2*Math.PI; return s < 2 ? 0.02 : s < 20 ? 0.02 + (TP - 0.02)*(s - 2)/18 : TP; } };
function oaRej(S, R){ var c = S.ctx, k, a; c.strokeStyle = S.C.grid; c.lineWidth = 1; c.setLineDash([]);
  for (k = 1; k <= R; k++){ c.beginPath(); c.arc(S.X(0), S.Y(0), Math.abs(S.X(k) - S.X(0)), 0, 6.2832); c.stroke(); }
  for (k = 0; k < 12; k++){ a = k*Math.PI/6; S.line(0, 0, R*Math.cos(a), R*Math.sin(a), {color:S.C.grid, width:1}); }
  S.line(0, 0, R + 0.25, 0, {color:S.C.ink, width:1.5}); }
function oaArco(S, q, rad, col){ var c = S.ctx; c.strokeStyle = col; c.lineWidth = 2; c.beginPath(); c.arc(S.X(0), S.Y(0), rad, 0, -q, true); c.stroke(); }
