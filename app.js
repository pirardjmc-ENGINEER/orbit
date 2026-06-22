const notes = [
"C","C#","D","Eb","E","F",
"F#","G","Ab","A","Bb","B"
];

const modes = {

"Mineur naturel":[0,2,3,5,7,8,10],

"Majeur":[0,2,4,5,7,9,11],

"Dorien":[0,2,3,5,7,9,10],

"Phrygien":[0,1,3,5,7,8,10],

"Lydien":[0,2,4,6,7,9,11],

"Mixolydien":[0,2,4,5,7,9,10],

"Mineur harmonique":[0,2,3,5,7,8,11]

};

function generateScale(){

const root =
document.getElementById("root").value;

const mode =
document.getElementById("mode").value;

const rootIndex =
notes.indexOf(root);

const intervals =
modes[mode];

let scale = [];

intervals.forEach(interval=>{

scale.push(
notes[(rootIndex+interval)%12]
);

});

document.getElementById("result").innerHTML=
`
<h2>${root} ${mode}</h2>

<p><strong>Notes :</strong></p>

<p>${scale.join(" - ")}</p>
`;

}
