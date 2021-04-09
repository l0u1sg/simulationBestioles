class Bestiole {
  constructor(x, y, text, overlapping = false) {
    this.x = x;
    this.y = y;
    this.rayon = random(3, 5);
    this.couleur = color(random(colorBestioles));
    this.text = text

    this.vitesse = 3;
    this.directions = [-this.vitesse, 0, this.vitesse];
    this.dx = 0;
    this.dy = 0;

    this.vivant = true;
    this.age = 200;
    this.ageInit = this.age;
    this.alpha = 255;
    this.numClone = 0
    this.mutant = false
  }

  afficher() {
    this.age--;
    // rendre l'alpha proportionnel à l'âge
    this.alpha = map(this.age, 0, this.ageInit, 0, 255);

    // Ajouter limitation de taille
    if (this.age <= 0 || this.rayon > 70) {
      this.vivant = false;
    }

    //this.couleur.setAlpha(this.age);
    this.couleur.setAlpha(this.alpha);

    fill(this.couleur)
    ellipse(this.x, this.y, this.rayon * 2);
  }

  bouger() {
    if (random(100) < 10) {
      this.dx = random(this.directions);
      this.dy = random(this.directions);
    }


    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    this.x = constrain(this.x, this.rayon, width - this.rayon);
    this.y = constrain(this.y, this.rayon, height - this.rayon);
  }

  toucher(autre) {
    let distance = dist(this.x, this.y, autre.x, autre.y);

    let touche = distance < this.rayon + autre.rayon;

    return touche;
  }

  mourir() {
    for (let i = 0; i < bestioles.length; i++) {
      if (bestioles[i] === this) {
        bestioles.splice(i, 1);
      }
    }
  }

  cloner() {
    if (this.age < this.ageInit / 2 && this.fertile) {
      this.fertile = false;
        for (let i = 0; i < 5; i++) {
          let x = this.x + (this.rayon * random(-20, 20));
          let y = this.y + (this.rayon * random(-20, 20));
          
          bestioles.push(new Bestiole(x, y));
          }
        }

    }
  }






//