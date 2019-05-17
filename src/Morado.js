class Morado extends Defensor {

    constructor(app, x, y) {

        super(app, x, y);
        this.vitaminas = [];
        this.chica = this.app.loadImage("./src/data/bueno1.png");
        this.sangre();

    }

    sangre() {
        this.vitaminas.push(new Corazon(this.app, this.x + (this.tamX), this.y + (this.tamY / 2)));
    }


    //metodo para pintar defensor 1 (violeta)
    pintar() {
        this.app.image(this.chica, this.x, this.y, this.tamX, this.tamY);
        for (let index = 0; index < this.vitaminas.length; index++) {
            this.vitaminas[index].pintar();
        }
    }
}