class Logica {
    constructor(app) {

        this.app = app;
        this.app.createCanvas(1200, 700);

        // crear texto para que el user pueda ingresar el usuario 
        this.textBox = " ";
        this.letra = this.textBox;
        this.px = 510;
        this.py = 440;
        this.contador = 0;

        //variables generales de fondos
        this.inicio = this.app.loadImage("./src/data/inicio.png");
        this.instrucciones1 = this.app.loadImage("./src/data/instrucciones1.png");
        this.instrucciones2 = this.app.loadImage("./src/data/instrucciones2.png");
        this.user = this.app.loadImage("./src/data/user.png");
        this.juego = this.app.loadImage("./src/data/juego.png");

        //variables botones de fondo 
        this.play = this.app.loadImage("./src/data/play.png");
        this.next = this.app.loadImage("./src/data/next.png");
        this.enter = this.app.loadImage("./src/data/enter.png");
        this.playagain = this.app.loadImage("./src/data/playagain.png");
        this.instruc = this.app.loadImage("./src/data/instruc.png");
        this.flecha = this.app.loadImage("./src/data/flecha.png");
        this.rewind = this.app.loadImage("./src/data/rewind.png");

        //variables defensores mini
        this.boyp = this.app.loadImage("./src/data/boyp.png");
        this.girlp = this.app.loadImage("./src/data/girlp.png");

        //variables poderes de los  defensores
        this.esfera;
        this.corazon;

        //botones para que aparezcan defensores en la pantalla 
        this.botoncito1 = false;
        this.botoncito2 = false;

        //variables generales generales
        this.pantalla = 0;

        //arreglo vitaminas
        this.vitaminas=[];

        //enemigos imagenes
        this.i = 0;
        this.app.frameRate(45);
        this.bacteria1 = this.app.loadImage("./src/data/malo1.png");
        this.bacteria2 = this.app.loadImage("./src/data/malo2.png");
        this.bacteria3 = this.app.loadImage("./src/data/malo3.png");

        //arreglos de los enemigos
        this.bacterix = [];

        // contador de tiempo/puntaje
        this.tipoPuntaje = this.app.loadFont("./src/data/Neucha.ttf");
        this.puntaje = 0;
        this.frameC = 0;

        //cuadricula
        this.cuadriculas = [];

        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 5; j++) {
                this.cuadriculas.push(new Cuadricula(this.app, ((i * 175) + 30), 190 + (j * 140)));
            }
        }
    }

    pintar() {
        switch (this.pantalla) {
            case 0:
                //pantalla de inicio
                this.app.image(this.inicio, 0, 0, 1200, 700);
                this.app.image(this.play, 570, 530, 88, 37);
                this.app.image(this.instruc, 490, 600, 251, 37);

                break;

            case 1:
                //pantalla de instrucciones 1 
                this.app.image(this.instrucciones1, 0, 0, 1200, 700);
                this.app.image(this.flecha, 966, 344, 81, 36);
                break;

            case 2:
                //pantalla de instrucciones 2 
                this.app.image(this.instrucciones2, 0, 0, 1200, 700);
                this.app.image(this.next, 1000, 630, 108, 45);
                break;

            case 3:
                //pantalla del user
                this.app.image(this.user, 0, 0, 1200, 700);
                this.app.image(this.enter, 470, 510, 287, 102);

                //pintar texto 
                this.app.textFont(this.tipoPuntaje);
                this.app.textSize(70);
                this.app.text(this.textBox, this.px, this.py);
                break;

            case 4:
                //pantalla del juego principal
                this.app.image(this.juego, 0, 0, 1200, 700);
                this.app.image(this.boyp, 155, 80, 53, 49);
                this.app.image(this.girlp, 55, 80, 53, 49);
                this.app.image(this.rewind, 1068, 80, 81, 36);

                //velocidad del tiempo 
                if (this.app.frameCount % 20 == 0) {
                    this.frameC++;
                    this.puntaje++;
                }

                //usuario en la pantalla del juego
                this.app.textFont(this.tipoPuntaje);
                this.app.textSize(50);
                this.app.text(this.textBox, 43, 39);

                //pintar el puntaje
                this.app.fill(0);
                this.app.stroke(255);
                this.app.textFont(this.tipoPuntaje, 35);
                this.app.text(+ this.puntaje, 682, 121);
                
                //pintar la cuadricula 
                for (let i = 0; i < this.cuadriculas.length; i++) {
                    this.cuadriculas[i].pintar();
                }

                //pocisiones enemigos
                if (this.app.frameCount % 98 == 0) {
                    let randomBacteria = this.app.random([1, 2, 3]);
                    let y = this.app.random([190, 323, 457, 591]);

                    if (randomBacteria == 1) {
                        this.bacterix.push(new Enemigo(this.app,1250, y, this.bacteria1));
                    }
                    if (randomBacteria == 2) {
                        this.bacterix.push(new Enemigo(this.app,1250, y, this.bacteria2));
                    }
                    if (randomBacteria == 3) {
                        this.bacterix.push(new Enemigo(this.app,1250, y, this.bacteria3));
                    }
                }

                //recorrer el arreglo
                for (this.i = 0; this.i < this.bacterix.length; this.i++) {
                    this.bacterix[this.i].mover(1);
                    this.dibujarBacteria(this.bacterix[this.i]);
                    this.bacterix[this.i].pintar();
                }
                break;

        }
        // ver pocisiones en el mouse
        //this.app.fill(0);
        //this.app.text("x:" + this.app.mouseX + "y:" + this.app.mouseY, this.app.mouseX, this.app.mouseY);

    }
    click() {
        switch (this.pantalla) {
            case 0:
                // boton para pasar de inicio a instrucciones 1 
                if (this.app.mouseX >= 490 && this.app.mouseX <= 741 && this.app.mouseY >= 600 && this.app.mouseY <= 637) {
                    this.pantalla = 1;
                    break;
                }

            case 1:
                // boton para pasar de instrucciones 1 a instrucciones 2 
                if (this.app.mouseX >= 966 && this.app.mouseX <= 1047 && this.app.mouseY >= 344 && this.app.mouseY <= 380) {
                    this.pantalla = 2;
                    break;
                }

            case 2:
                // boton para pasar de inicio a pantalla de user 
                if (this.app.mouseX >= 570 && this.app.mouseX <= 658 && this.app.mouseY >= 530 && this.app.mouseY <= 567) {
                    this.pantalla = 3;
                    break;
                }


            case 3:
                // boton para pasar de instrucciones a user 
                if (this.app.mouseX >= 1000 && this.app.mouseX <= 1108 && this.app.mouseY >= 630 && this.app.mouseY <= 675) {
                    this.pantalla = 3;
                    break;
                }


            case 4:
                // boton para pasar de user a juego
                if (this.app.mouseX >= 470 && this.app.mouseX <= 757 && this.app.mouseY >= 510 && this.app.mouseY <= 612) {
                    this.pantalla = 4;
                    break;
                }

            case 5:
                // boton para pasar de juego principal a inicio 
                if (this.app.mouseX >= 1068 && this.app.mouseX <= 1149 && this.app.mouseY >= 80 && this.app.mouseY <= 116) {
                    this.pantalla = 0;
                    this.textBox = " ";
                    break;
                }
            case 6:
                //boton para introducir los defensores a la cuadricula en la pantalla del juego principal 
                if (this.app.mouseX > 45 && this.app.mouseX < 113 && this.app.mouseY > 49 && this.app.mouseY < 152) {
                    console.log("yei");
                    this.botoncito2 = false;
                    this.botoncito1 = true;
                }
                if (this.app.mouseX > 145 && this.app.mouseX < 212 && this.app.mouseY > 50 && this.app.mouseY < 153) {
                    console.log("yetttt");
                    this.botoncito2 = true;
                    this.botoncito1 = false;
                }

                for (let i = 0; i < this.cuadriculas.length; i++) {

                    if (this.cuadriculas[i] instanceof Cuadricula && this.cuadriculas[i].validar(this.app.mouseX, this.app.mouseY)) {

                        if (this.botoncito1 == true) {
                            console.log("okur");
                            this.cuadriculas[i] = new Morado (this.app, this.cuadriculas[i].x, this.cuadriculas[i].y);
                            return;
                        }

                        if (this.botoncito2 == true) {
                            this.cuadriculas[i] = new Verde (this.app, this.cuadriculas[i].x, this.cuadriculas[i].y);
                            return;
                        }
                    }
                }
                break;

        }

    }

    //dibujar los enemigos en la pantalla de juego 
    dibujarBacteria(e) {
        this.app.image(e.tipo, e.x, e.y, 109, 106);
    }

    //mostrar texto que el usuario escriba en la pantalla del user 
    texto() {
        this.textBox += this.app.key;
        console.log(this.app.key);
    }

    //borrar texto que el usuario escriba en la pantalla del user
    eliminar() {
        if (this.app.keyCode == this.app.BACKSPACE) {
            this.contador -= 1;
            this.textBox = this.textBox.slice(0, -1);
        }

        this.contador += 1;

        if (this.app.keyCode == this.app.ENTER) {
            this.textBox = this.textBox + "\n";
            this.contador = 0;

        }
        if (this.contador == 25 &&
            this.app.keyCode != this.app.BACKSPACE &&
            this.app.keyCode != this.app.ENTER) {
            this.textBox = this.textBox + "\n";
            this.contador = 0;
        }

    }
}