/* L24 H03 · el triángulo de coeficientes, fila por fila: bordes 1, cada interior es la suma de los dos de arriba; y por qué (de (a+b)² a (a+b)³, por b y por a) */
OA.scene('bn-pascal', (function(){
  var N = 7, CX = 170, SP = 38, Y0 = 120, DY = 32, COL = [118, 178, 238, 298], PASO = [1, 2, 3, 5, 6]; /* PASO[n]: paso en que aparece la fila n */
  function tx(n, j){ return CX + (j - n/2)*SP; } function ty(n){ return Y0 + DY*n; }
  var PZ = [['Q', '(a+b)^{4}=\\ ?', '(a+b)⁴ = ?', 'pt'], ['F', '\\Longrightarrow\\ \\text{coeficientes }1,\\ 4,\\ 6,\\ 4,\\ 1', '⟹ coeficientes 1, 4, 6, 4, 1', 'diff'],
    ['E0', '(a+b)^{0}', '(a+b)⁰', 'c-tan'], ['E1', '(a+b)^{1}', '(a+b)¹', 'c-tan'], ['E2', '(a+b)^{2}', '(a+b)²', 'c-tan'], ['E3', '(a+b)^{3}', '(a+b)³', 'c-tan'], ['E4', '(a+b)^{4}', '(a+b)⁴', 'c-tan'],
    ['TB', '(a+b)^{2}\\cdot b=', '(a+b)²·b =', ''], ['TA', '(a+b)^{2}\\cdot a=', '(a+b)²·a =', ''], ['TS', '(a+b)^{3}=', '(a+b)³ =', 'c-tan'],
    ['B1', '1a^{2}b', '1a²b', ''], ['B2', '+\\,2ab^{2}', '+ 2ab²', ''], ['B3', '+\\,1b^{3}', '+ 1b³', ''],
    ['A0', '1a^{3}', '1a³', ''], ['A1', '+\\,2a^{2}b', '+ 2a²b', ''], ['A2', '+\\,1ab^{2}', '+ 1ab²', ''],
    ['S0', '1a^{3}', '1a³', 'c-tan'], ['S1', '+\\,3a^{2}b', '+ 3a²b', 'c-tan'], ['S2', '+\\,3ab^{2}', '+ 3ab²', 'c-tan'], ['S3', '+\\,1b^{3}', '+ 1b³', 'c-tan'],
    ['C0', '1', '1', 'c-alt'], ['C1', '1+2=3', '1 + 2 = 3', 'diff'], ['C2', '2+1=3', '2 + 1 = 3', 'diff'], ['C3', '1', '1', 'c-alt'],
    ['R1', '(a+b)^{0}=1\\ \\Rightarrow\\ \\text{fila 0: }1', '(a+b)⁰ = 1 ⟹ fila 0: 1', ''],
    ['R2', '(a+b)^{1}=1a+1b\\ \\Rightarrow\\ \\text{fila 1: }1,\\ 1', '(a+b)¹ = 1a + 1b ⟹ fila 1: 1, 1', ''],
    ['R3', '(a+b)^{2}=1a^{2}+2ab+1b^{2},\\quad 1+1=2', '(a+b)² = 1a² + 2ab + 1b², 1 + 1 = 2', ''],
    ['R4', '(a+b)^{3}=(a+b)^{2}\\cdot b+(a+b)^{2}\\cdot a', '(a+b)³ = (a+b)²·b + (a+b)²·a', ''],
    ['R5', '1+2=3,\\ \\ 2+1=3\\ \\Rightarrow\\ \\text{fila 3: }1,\\ 3,\\ 3,\\ 1', '1 + 2 = 3, 2 + 1 = 3 ⟹ fila 3: 1, 3, 3, 1', ''],
    ['R6', '\\text{fila 4: }1,\\ \\ 1+3=4,\\ \\ 3+3=6,\\ \\ 3+1=4,\\ \\ 1', 'fila 4: 1, 1 + 3 = 4, 3 + 3 = 6, 3 + 1 = 4, 1', ''],
    ['R7', '(a+b)^{4}=a^{4}+4a^{3}b+6a^{2}b^{2}+4ab^{3}+b^{4}', '(a+b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴', 'diff']];
  var TXT = [['Fila 0: un solo coeficiente, el 1.', 'Es el del binomio elevado a 0.'],
    ['Fila 1: dos coeficientes, 1 y 1.', 'Son los bordes: en cada fila valen 1.'],
    ['Fila 2: bordes 1 y 1. El interior, 2,', 'es la suma de los dos de arriba: 1 + 1.'],
    ['¿Por qué se suma? Para subir el exponente', 'se multiplica por b y por a: dos renglones.'],
    ['En cada columna hay términos semejantes:', 'sus coeficientes se suman. Sale la fila 3.'],
    ['Fila 4, igual: bordes 1; cada interior,', 'la suma de los dos números de arriba.'],
    ['La fila 4 da los coeficientes pedidos.', 'Respuesta arriba; desarrollo en el paso 7.']];
  return {
    world:{x0:0, x1:340, y0:-624, y1:0}, aspect:624/340,
    aria:'Animación en siete pasos. Uno: la fila 0 del triángulo, un solo 1, el coeficiente de a más b elevado a 0. Dos: la fila 1, con dos unos, los bordes. Tres: la fila 2, 1, 2, 1; el 2 interior se une con dos líneas a los dos unos de arriba, porque es su suma. Cuatro: bajo el triángulo, a más b al cuadrado se multiplica por b y por a, en dos renglones ordenados por columnas de términos semejantes. Cinco: en cada columna se suman los coeficientes, 1 más 2 igual 3 y 2 más 1 igual 3, y aparece la fila 3: 1, 3, 3, 1. Seis: la fila 4, con 1 más 3 igual 4, 3 más 3 igual 6 y 3 más 1 igual 4, entre dos unos. Siete: la fila 4 da el desarrollo de a más b elevado a 4. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw alt"></i> bordes de cada fila: siempre 1</span><span><i class="sw rise"></i> número interior: suma de los dos de arriba</span><span><i class="sw sec"></i> líneas: unen cada interior con los dos que se suman</span><span><i class="sw tan"></i> binomio al que pertenece cada fila</span>',
    anim:{run:38000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', MU = C.muted || '#6b6b6b', n, j, a, e, q;
      function X(x){ return S.X(x); } function Y(y){ return S.Y(-y); }
      function ap(m){ return k > m ? 1 : (k === m ? u : 0); } /* cuánto ha aparecido lo del paso m; después queda hasta el final */
      function L(id, x, y, ax){ T.L(id, x, -y, ax); }
      function txt(t, x, y, col, al, f, alpha){ c.globalAlpha = alpha == null ? 1 : alpha; c.font = (f || '600 12.5px ') + F; c.fillStyle = col; c.textAlign = al || 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); c.globalAlpha = 1; }
      /* pregunta arriba; al final, a su lado, la respuesta */
      L('Q', 6, 65, 0); if (ap(7) > 0.5) L('F', 82, 65, 0);
      /* los dos nombres: borde e interior */
      if (ap(2) > 0) txt('borde: siempre 1', 6, 85, C.alt, 'left', '600 11px ', ap(2));
      if (ap(3) > 0) txt('interior: suma de los dos de arriba', 334, 85, C.rise, 'right', '600 11px ', ap(3));
      txt('coeficientes de', 334, 101, MU, 'right', '600 10.5px ', ap(1));
      /* el triángulo: cada fila queda; las líneas unen cada interior con los dos de arriba */
      for (n = 0; n <= 4; n++){ a = ap(PASO[n]); if (a <= 0){ continue; }
        txt('fila ' + n, 6, ty(n), MU, 'left', '600 11px ', a);
        if (a > 0.5) L('E' + n, 304, ty(n));
        for (j = 0; j <= n; j++){ e = j === 0 || j === n;
          if (!e){ c.strokeStyle = C.sec; c.lineWidth = 1.1; c.setLineDash([]); c.beginPath();
            for (q = j - 1; q <= j; q++){ c.moveTo(X(tx(n - 1, q)), Y(ty(n - 1) + 9)); c.lineTo(X(tx(n - 1, q) + (tx(n, j) - tx(n - 1, q))*a), Y(ty(n - 1) + 9 + (DY - 19)*a)); }
            c.stroke(); }
          txt('' + bnC(n, j), tx(n, j), ty(n), e ? C.alt : C.rise, 'center', '700 14px ', a); } }
      /* paso 7: la fila 4, la pedida, queda enmarcada */
      a = ap(7); if (a > 0){ c.globalAlpha = a; c.strokeStyle = C.tan; c.lineWidth = 1.3; c.strokeRect(X(tx(4, 0) - 15), Y(ty(4) - 9.5), X(tx(4, 4) + 15) - X(tx(4, 0) - 15), Y(ty(4) + 9.5) - Y(ty(4) - 9.5)); c.globalAlpha = 1; }
      /* paso 4: (a+b)² por b y por a, en columnas de términos semejantes */
      a = ap(4);
      if (a > 0.3){ L('TB', 6, 276, 0); L('B1', COL[1], 276); L('B2', COL[2], 276); L('B3', COL[3], 276); }
      if (a > 0.65){ L('TA', 6, 298, 0); L('A0', COL[0], 298); L('A1', COL[1], 298); L('A2', COL[2], 298); }
      /* paso 5: en cada columna se suman los semejantes; sale la fila 3 */
      a = ap(5);
      if (a > 0){ c.globalAlpha = a; for (j = 1; j <= 2; j++){ c.fillStyle = 'rgba(200,110,20,0.10)'; c.fillRect(X(COL[j] - 28), Y(264), X(COL[j] + 28) - X(COL[j] - 28), Y(310) - Y(264)); c.strokeStyle = C.rise; c.lineWidth = 1.1; c.strokeRect(X(COL[j] - 28), Y(264), X(COL[j] + 28) - X(COL[j] - 28), Y(310) - Y(264)); }
        c.globalAlpha = 1; c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(88), Y(312)); c.lineTo(X(88 + 246*a), Y(312)); c.stroke(); }
      if (a > 0.4){ L('TS', 6, 325, 0); L('S0', COL[0], 325); L('S1', COL[1], 325); L('S2', COL[2], 325); L('S3', COL[3], 325); }
      if (a > 0.7){ txt('fila 3:', 6, 347, MU, 'left', '600 11px '); L('C0', COL[0], 347); L('C1', COL[1], 347); L('C2', COL[2], 347); L('C3', COL[3], 347); }
      /* frase del paso (su contenido queda también en el registro) */
      txt(TXT[k - 1][0], 6, 371, C.ink); txt(TXT[k - 1][1], 6, 389, C.ink);
      txt('paso ' + k + ' de ' + N, 334, 412, MU, 'right', '600 11px ');
      dtQue(S, 'cada fila sale de la fila anterior:', 'borde 1; adentro, suma de los dos de arriba.');
      T.fin();
      oaReg(S, k, N, 6, -438, [0, 28, 56, 84, 112, 140, 168]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '(a+b)^{0}=1\\quad\\Rightarrow\\quad\\text{fila 0: }1',
      '(a+b)^{1}=1a+1b\\quad\\Rightarrow\\quad\\text{fila 1: }1,\\ 1\\\\ &\\qquad\\text{los dos son bordes}',
      '(a+b)^{2}=1a^{2}+2ab+1b^{2}\\\\ &\\qquad\\Rightarrow\\ \\text{fila 2: }1,\\ 2,\\ 1\\\\ &\\qquad\\text{bordes: }1\\text{ y }1;\\quad\\text{interior: }1+1=2',
      '(a+b)^{3}=(a+b)^{2}\\cdot(a+b)\\\\ &\\qquad\\ \\ \\,=(a+b)^{2}\\cdot b+(a+b)^{2}\\cdot a\\\\ &\\qquad\\left(1a^{2}+2ab+1b^{2}\\right)\\cdot b=1a^{2}b+2ab^{2}+1b^{3}\\\\ &\\qquad\\left(1a^{2}+2ab+1b^{2}\\right)\\cdot a=1a^{3}+2a^{2}b+1ab^{2}',
      '\\text{semejantes: }1a^{2}b+2a^{2}b=(1+2)\\,a^{2}b=3a^{2}b\\\\ &\\qquad\\text{semejantes: }2ab^{2}+1ab^{2}=(2+1)\\,ab^{2}=3ab^{2}\\\\ &\\qquad\\text{sin pareja: }1a^{3}\\ \\text{ y }\\ 1b^{3}\\quad\\text{(los bordes)}\\\\ &\\qquad (a+b)^{3}=1a^{3}+3a^{2}b+3ab^{2}+1b^{3}\\\\ &\\qquad\\Rightarrow\\ \\text{fila 3: }1,\\ 3,\\ 3,\\ 1',
      '\\text{fila 4, desde la fila 3 }(1,\\ 3,\\ 3,\\ 1):\\\\ &\\qquad\\text{borde: }1\\\\ &\\qquad 1+3=4\\\\ &\\qquad 3+3=6\\\\ &\\qquad 3+1=4\\\\ &\\qquad\\text{borde: }1',
      '\\text{fila 4: }1,\\ 4,\\ 6,\\ 4,\\ 1\\quad\\Rightarrow\\\\ &\\qquad (a+b)^{4}=1a^{4}+4a^{3}b+6a^{2}b^{2}+4ab^{3}+1b^{4}']; return dtPasos(R.slice(0, k)); }
  };
})());
