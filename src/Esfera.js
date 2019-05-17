class Esfera {
    constructor(app, x, y) {
        this.app = app;
        this.x = x;
        this.y = y;
        this.tam = 30;

        this.vel = 5;
        this.daño = 5;

        this.mover = this.mover.bind(this);
        setInterval(this.mover, 50);


        this.esfe = this.app.loadImage("./src/data/poderbueno0.png");
    }

    pintar() {
        this.app.image(this.esfe, this.x, this.y, this.tam, this.tam);
    }
    mover() {
        this.x += this.vel;
    }
    validar(otroX, otroY) {
        if (this.app.dist(this.x, this.y, otroX, otroY) < this.tam / 2) {
            return true;
        } else {
            return false;
        }
    }
}