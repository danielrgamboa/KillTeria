class Cuadricula {
    constructor(app, x, y) {
        this.app = app;
        this.x = x;
        this.y = y;
        this.tamX = 160;
        this.tamY = 130;
    }

    pintar() {
        //this.app.fill(255, 0, 0)
        this.app.noFill()
        this.app.noStroke();
        this.app.rect(this.x, this.y, this.tamX, this.tamY);
    }


    validar(otroX, otroY) {
        if (otroX > this.x && otroX < this.x + this.tamX &&
            otroY > this.y && otroY < this.y + this.tamY) {
            return true;
        } else {
            return false;
        }
    }
}