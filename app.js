const notes = [
  "C", "C#", "D", "Eb", "E", "F",
  "F#", "G", "Ab", "A", "Bb", "B"
];

const modes = {
  "Mineur naturel": {
    intervals: [0, 2, 3, 5, 7, 8, 10],
    degrees: ["1", "2", "b3", "4", "5", "b6", "b7"],
    signature: "b3, b6, b7",
    color: "Sombre, mélancolique, cinématographique"
  },

  "Majeur": {
    intervals: [0, 2, 4, 5, 7, 9, 11],
    degrees: ["1", "2", "3", "4", "5", "6", "7"],
    signature: "3, 6, 7",
    color: "Lumineux, stable, ouvert"
  },

  "Dorien": {
    intervals: [0, 2, 3, 5, 7, 9, 10],
    degrees: ["1", "2", "b3", "4", "5", "6", "b7"],
    signature: "6 majeure",
    color: "Mineur noble, mélancolique mais lumineux"
  },

  "Phrygien": {
    intervals: [0, 1, 3, 5, 7, 8, 10],
    degrees: ["1", "b2", "b3", "4", "5", "b6", "b7"],
    signature: "b2",
    color: "Mystique, sombre, oriental, menaçant"
  },

  "Lydien": {
    intervals: [0, 2, 4, 6, 7, 9, 11],
    degrees: ["1", "2", "3", "#4", "5", "6", "7"],
    signature: "#4",
    color: "Magique, céleste, lumineux, flottant"
  },

  "Mixolydien": {
    intervals: [0, 2, 4, 5, 7, 9, 10],
    degrees: ["1", "2", "3", "4", "5", "6", "b7"],
    signature: "b7",
    color: "Héroïque, aventure, triomphant"
  },

  "Mineur harmonique": {
    intervals: [0, 2, 3, 5, 7, 8, 11],
    degrees: ["1", "2", "b3", "4", "5", "b6", "7"],
    signature: "7 majeure",
    color: "Dramatique, tragique, épique, tension"
  }
};

function noteAt(rootIndex, interval) {
  return notes[(rootIndex + interval) % 12];
}

function chordName(root, type) {
  if (type === "major") return root;
  if (type === "minor") return root + "m";
  if (type === "dim") return root + "dim";
  return root;
}

function seventhName(root, type) {
  if (type === "major") return root + "maj7";
  if (type === "minor") return root + "m7";
  if (type === "dominant") return root + "7";
  if (type === "halfdim") return root + "m7b5";
  if (type === "dim7") return root + "dim7";
  return root + "7";
}

function detectTriad(intervals) {
  const third = (intervals[2] - intervals[0] + 12) % 12;
  const fifth = (intervals[4] - intervals[0] + 12) % 12;

  if (third === 4 && fifth === 7) return "major";
  if (third === 3 && fifth === 7) return "minor";
  if (third === 3 && fifth === 6) return "dim";

  return "unknown";
}

function detectSeventh(intervals) {
  const third = (intervals[2] - intervals[0] + 12) % 12;
  const fifth = (intervals[4] - intervals[0] + 12) % 12;
  const seventh = (intervals[6] - intervals[0] + 12) % 12;

  if (third === 4 && fifth === 7 && seventh === 11) return "major";
  if (third === 4 && fifth === 7 && seventh === 10) return "dominant";
  if (third === 3 && fifth === 7 && seventh === 10) return "minor";
  if (third === 3 && fifth === 6 && seventh === 10) return "halfdim";
  if (third === 3 && fifth === 6 && seventh === 9) return "dim7";

  return "unknown";
}

function formulaTriad(type) {
  if (type === "major") return "0 +4 +7";
  if (type === "minor") return "0 +3 +7";
  if (type === "dim") return "0 +3 +6";
  return "à définir";
}

function formulaSeventh(type) {
  if (type === "major") return "0 +4 +7 +11";
  if (type === "dominant") return "0 +4 +7 +10";
  if (type === "minor") return "0 +3 +7 +10";
  if (type === "halfdim") return "0 +3 +6 +10";
  if (type === "dim7") return "0 +3 +6 +9";
  return "à définir";
}

function generateScale() {
  const root = document.getElementById("root").value;
  const modeName = document.getElementById("mode").value;

  const rootIndex = notes.indexOf(root);
  const mode = modes[modeName];
  const intervals = mode.intervals;

  const scale = intervals.map(interval => noteAt(rootIndex, interval));

  let chordsHtml = "";

  for (let i = 0; i < 7; i++) {
    const triadIndexes = [i, i + 2, i + 4].map(n => n % 7);
    const seventhIndexes = [i, i + 2, i + 4, i + 6].map(n => n % 7);

    const triadNotes = triadIndexes.map(index => scale[index]);
    const seventhNotes = seventhIndexes.map(index => scale[index]);

    const triadIntervals = triadIndexes.map(index => intervals[index]);
    const seventhIntervals = seventhIndexes.map(index => intervals[index]);

    const triadType = detectTriad(triadIntervals);
    const seventhType = detectSeventh(seventhIntervals);

    const triad = chordName(triadNotes[0], triadType);
    const seventh = seventhName(seventhNotes[0], seventhType);

    chordsHtml += `
      <div class="chord-card">
        <h3>${triad}</h3>
        <p><strong>Triade :</strong> ${triadNotes.join(" - ")}</p>
        <p><strong>Formule :</strong> ${formulaTriad(triadType)}</p>

        <h4>${seventh}</h4>
        <p><strong>7e :</strong> ${seventhNotes.join(" - ")}</p>
        <p><strong>Formule :</strong> ${formulaSeventh(seventhType)}</p>
      </div>
    `;
  }

  document.getElementById("result").innerHTML = `
    <h2>${root} ${modeName}</h2>

    <p><strong>Couleur :</strong> ${mode.color}</p>
    <p><strong>Note / degré signature :</strong> ${mode.signature}</p>

    <h3>Notes</h3>
    <p>${scale.join(" - ")}</p>

    <h3>Degrés</h3>
    <p>${mode.degrees.join(" - ")}</p>

    <h3>Accords de la gamme</h3>
    ${chordsHtml}
  `;
}
