// --------------------
// *** 4.4 Vieillir ***
// --------------------


var bestioles = [];
var population = 45;

let randomName;
let randomName2;




function setup() {
  createCanvas(700, 700);
  noStroke();
  backgroundColor1 = random(backgroundColor)

  for (let i = 0; i < population; i++) {
    let x = random(width);
    let y = random(height);
    bestioles[i] = new Bestiole(x, y, random(name));
  }
}

function draw() {
  background(backgroundColor1)

  // Nettoyage
  for (let b of bestioles) {
    if (!b.vivant) {
      b.mourir();
    }
  }

  // Méthodes bestioles
  for (let b of bestioles) {
    b.bouger();
    b.afficher();
    b.cloner();


    // collisions
    for (let autre of bestioles) {
      if (b.toucher(autre) && b != autre) {
        // si je suis plus grand que l'autre
        if (b.rayon > autre.rayon) {
          // l'autre meurt
          autre.vivant = false;
          // je grossis
          b.rayon += 5;
          // je rajeunis
          b.age = b.age + autre.age;
          // redeviens fertile
          b.fertile = true;
          if (frameCount % 5 === 0) {
            randomName = random(name)
            randomName2 = random(name)
          }

        }
      }
    }
  }
  if (bestioles.length === 0) {
    randomName = "Plus rien"
    randomName2 = ""
    const tempsFinal = round(millis()/1000)
    textSize(15); 
    textAlign(LEFT, TOP)
    fill("")
    text(`Il aura fallu ${tempsFinal} s pour se manger `, 200, 200)
    stop()
    
  }

  // debug
  textSize(40);
  textAlign(LEFT, TOP);
  fill("");
  text(bestioles.length, 0, 0);

  //comment
  textSize(25);

  fill("")
  text(randomName + " à mangé " + randomName2, 120, 450)
  
  // temps 
  textSize(40);
  textAlign(LEFT, TOP)
  fill("")
  text(round(millis()/1000) + " s", 400, 0)

    noStroke();
  textAlign(CENTER, CENTER);
  for (let i = 0; i < bestioles.length; i++) {
    fill("#2AC1A6");
    ellipse(bestioles[i].x, bestioles[i].y, 
    bestioles[i].r*2, bestioles[i].r*2);
    fill("#FFFFFF");
    textSize(bestioles[i].r);
    text(bestioles[i].text, bestioles[i].x, bestioles[i].y);
  }
}






//