class Defensor {
    //clase padre
    constructor(app, x, y,vitaminas) {
        this.app = app;
        this.x = x;
        this.y = y;

        this.tamX = 93;
        this.tamY = 85;

        this.vitaminas = vitaminas;
        this.sangre = this.sangre.bind(this);
        setInterval(this.sangre, 3000);
    }

    pintar() {

    }

    sangre(){

    }
}