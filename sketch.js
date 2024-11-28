let knit, purl;
let instructions = `
1단(겉면) : 겉뜨기 1,안뜨기1, 겉뜨기1, 안뜨기 1, 겉뜨기 1
2단(안면) : 안뜨기 1, 겉뜨기 1, 안뜨기 1, 겉뜨기 1, 안뜨기 1
1-2단 2번 더(끝까지) 반복
`;

function preload() {
  // 기호 이미지를 불러옵니다.
  knit = loadImage('겉뜨기.png');
  purl = loadImage('안뜨기.png');
}

function setup() {
  createCanvas(500, 500);
  let pattern = parseInstructions(instructions); // 텍스트를 파싱해 패턴 생성
  drawPattern(pattern); // 패턴을 그리기
}

function parseInstructions(instructions) {
  let rows = [];
  let lines = instructions.split('\n');
  
  for (let line of lines) {
    if (line.includes('겉뜨기') || line.includes('안뜨기')) {
      let row = [];
      let matches = line.match(/겉뜨기|안뜨기/g);
      for (let match of matches) {
        row.push(match === '겉뜨기' ? 'knit' : 'purl');
      }
      rows.push(row);
    }
  }
  // 반복 처리 (1-2단 반복)
  for (let i = 0; i < 2; i++) {
    rows.push(rows[0]); // 1단
    rows.push(rows[1]); // 2단
  }
  return rows;
}

function drawPattern(pattern) {
  let x = 0;
  let y = 0;
  let imgSize = 50; // 기호 크기

  for (let row of pattern) {
    for (let stitch of row) {
      if (stitch === 'knit') {
        image(knit, x, y, imgSize, imgSize);
      } else if (stitch === 'purl') {
        image(purl, x, y, imgSize, imgSize);
      }
      x += imgSize;
    }
    x = 0;
    y += imgSize;
  }
}
