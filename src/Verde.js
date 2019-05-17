class Verde extends Defensor {

    constructor(app, x, y) {

        super(app, x, y);
        this.vitaminas = [];
        this.chico = this.app.loadImage("/src/data/bueno0.png");
        this.sangre();

    }

    sangre() {
        this.vitaminas.push(new Esfera(this.app, this.x + (this.tamX), this.y + (this.tamY / 2)));
    }


    //metodo para pintar el defensor 2 (verde)
    pintar() {
        this.app.image(this.chico, this.x, this.y, this.tamX, this.tamY);
        for (let index = 0; index < this.vitaminas.length; index++) {
            this.vitaminas[index].pintar();
        }
    }
}