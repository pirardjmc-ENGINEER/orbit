const notes = ["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"];

const modes = {
  "Mineur naturel": {
    intervals:[0,2,3,5,7,8,10],
    degrees:["1","2","b3","4","5","b6","b7"],
    chords:["m","dim","","m","m","",""]
  },
  "Majeur": {
    intervals:[0,2,4,5,7,9,11],
    degrees:["1","2","3","4","5","6","7"],
    chords:["","m","m","","","m","dim"]
  },
  "Dorien": {
    intervals:[0,2,3,5,7,9,10],
    degrees:["1","2","b3","4","5","6","b7"],
    chords:["m","m","","","m","dim",""]
  },
  "Phrygien": {
    intervals:[0,1,3,5,7,8,10],
    degrees:["1","b2","b3","4","5","b6","b7"],
    chords:["m","","","m","dim","","m"]
  },
  "Lydien": {
    intervals:[0,2,4,6,7,9,11],
    degrees:["1","2","3","#4","5","6","7"],
    chords:["","","m","dim","","m","m"]
  },
  "Mixolydien": {
    intervals:[0,2,4,5,7,9,10],
    degrees:["1","2","3","4","5","6","b7"],
    chords:["","m","dim","","m","m",""]
  },
  "Mineur harmonique": {
    intervals:[0,2,3,5,7,8,11],
    degrees:["1","2","b3","4","5","b6","7"],
    chords:["m","dim","aug","m","","","dim"]
  }
};

const bridges = {
  "E Phrygien": [
    {
      target: "A Mineur naturel",
      type: "Fluide",
      notes: ["E","F","G","A","B","C","D"],
      pivotChords: ["Am","C","Dm","Em","F","G"]
    },
    {
      target: "C Majeur",
      type: "Fluide",
      notes: ["E","F","G","A","B","C","D"],
      pivotChords: ["C","Dm","Em","F","G","Am"]
    },
    {
      target: "D Dorien",
      type: "Cinématique",
      notes: ["E","F","G","A","B","C","D"],
      pivotChords: ["Dm","Em","F","G","Am"]
    }
  ],

  "E Mineur naturel": [
    {
      target: "G Majeur",
      type: "Fluide",
      notes: ["E","F#","G","A","B","C","D"],
      pivotChords: ["Em","G","Am","Bm","C","D"]
    },
    {
      target: "A Dorien",
      type: "Cinématique",
      notes: ["E","F#","G","A","B","C","D"],
      pivotChords: ["Em","G","Am","Bm","D"]
    },
    {
      target: "B Phrygien",
      type: "Mystique",
      notes: ["E","F#","G","A","B","C","D"],
      pivotChords: ["Em","G","Am","Bm","C"]
    }
  ],

  "G Mineur naturel": [
    {
      target: "Bb Majeur",
      type: "Fluide",
      notes: ["G","A","Bb","C","D","Eb","F"],
      pivotChords: ["Gm","Bb","Cm","Dm","Eb","F"]
    },
    {
      target: "C Dorien",
      type: "Cinématique",
      notes: ["G","A","Bb","C","D","Eb","F"],
      pivotChords: ["Gm","Bb","Cm","Dm","F"]
    },
    {
      target: "D Phrygien",
      type: "Sombre",
      notes: ["G","A","Bb","C","D","Eb","F"],
      pivotChords: ["Gm","Bb","Cm","Dm","Eb"]
    }
  ]
};

function noteAt(rootIndex, interval){
  return notes[(rootIndex + interval) % 12];
}

function chordName(root, quality){
  if(quality === "m") return root + "m";
  if(quality === "dim") return root + "dim";
  if(quality === "aug") return root + "aug";
  return root;
}

function seventhName(root, quality){
  if(quality === "m") return root + "m7";
  if(quality === "dim") return root + "m7b5";
  if(quality === "aug") return root + "augMaj7";
  return root + "maj7";
}

function formulaTriad(quality){
  if(quality === "m") return "0 +3 +7";
  if(quality === "dim") return "0 +3 +6";
  if(quality === "aug") return "0 +4 +8";
  return "0 +4 +7";
}

function formulaSeventh(quality){
  if(quality === "m") return "0 +3 +7 +10";
  if(quality === "dim") return "0 +3 +6 +10";
  if(quality === "aug") return "0 +4 +8 +11";
  return "0 +4 +7 +11";
}

function generateScale(){
  const root = document.getElementById("root").value;
  const modeName = document.getElementById("mode").value;

  const rootIndex = notes.indexOf(root);
  const mode = modes[modeName];

  const scale = mode.intervals.map(interval => noteAt(rootIndex, interval));

  let chordsHTML = "";

  for(let i = 0; i < scale.length; i++){
    const quality = mode.chords[i];

    const triad = [
      scale[i],
      scale[(i+2)%7],
      scale[(i+4)%7]
    ];

    const seventh = [
      scale[i],
      scale[(i+2)%7],
      scale[(i+4)%7],
      scale[(i+6)%7]
    ];

    chordsHTML += `
      <div style="margin-bottom:18px;">
        <h3>${chordName(scale[i], quality)}</h3>
        <p><strong>Triade :</strong> ${triad.join(" - ")}</p>
        <p><strong>Formule :</strong> ${formulaTriad(quality)}</p>
        <p><strong>7e :</strong> ${seventhName(scale[i], quality)} = ${seventh.join(" - ")}</p>
        <p><strong>Formule 7e :</strong> ${formulaSeventh(quality)}</p>
      </div>
    `;
  }

  const bridgeKey = `${root} ${modeName}`;
  let bridgesHTML = "";

  if(bridges[bridgeKey]){
    bridgesHTML = `<h2>🌉 Ponts possibles</h2>`;

    bridges[bridgeKey].forEach(bridge => {
      bridgesHTML += `
        <div style="margin-bottom:18px;">
          <h3>${bridge.type} → ${bridge.target}</h3>
          <p><strong>Notes pivot :</strong> ${bridge.notes.join(" - ")}</p>
          <p><strong>Accords pivot :</strong> ${bridge.pivotChords.join(" - ")}</p>
        </div>
      `;
    });
  } else {
    bridgesHTML = `
      <h2>🌉 Ponts possibles</h2>
      <p>Pas encore défini pour cette gamme. On l'ajoutera dans ORBIT V0.4.</p>
    `;
  }

  document.getElementById("result").innerHTML = `
    <h2>${root} ${modeName}</h2>

    <p><strong>Notes :</strong></p>
    <p>${scale.join(" - ")}</p>

    <p><strong>Degrés :</strong></p>
    <p>${mode.degrees.join(" - ")}</p>

    <h2>Accords de la gamme</h2>
    ${chordsHTML}

    ${bridgesHTML}
  `;
}
