const BULLET_SPEED = 10;

/*
Crea elementos html de tipo bala
*/
function bulletFactory(numberOfBullets) {
    let bullets = numberOfBullets;
    let pool = [];
    if (pool.length == 0) {
        for (let i = 0; i < bullets; i++) {
            const bala = document.createElement("div");
            bala.classList.add("bala");
            pool.push(bala);
        }
    }
    return pool;


}

/*
Crea un pool de balas para usar y ahorrar recursos
*/
function poolOfBullets(numberOfBullets) {


    let pool = false;
    if (!pool) {
        pool = bulletFactory(numberOfBullets);
    }

    return {
        pool: pool,
        numBullets: numberOfBullets,
        getBullet: function () {
            if (this.pool.length == 0) {
                this.pool = bulletFactory(this.numBullets)
            }
            return this.pool.pop();
        },
        getBulletCount: function () {
            return this.pool.length;
        }
    }
}

/**
 * 
 * @param {string en la forma "10px"} numInStrPixel 
 * retorna el valor en Number
 */
function pixelToInt(numInStrPixel) {
    return new Number(numInStrPixel.split("px")[0]);
}
/** 
 * suma un integer al valor en pixels pasado comos tring y lo devuelve como 
 * tal. Necesita que se creen try catch para valores no válidos
*/
function intToStringPixelAdder(strInPixels, numberToAdd) {

    let asNumber = pixelToInt(strInPixels);
    return `${asNumber + numberToAdd}px`;
}

/**
 * Retorna el ancho del elemento #mundo en int
 */
function getWorldWidth() {
    return document.getElementById("mundo").offsetWidth;
}

function personaje() {

    const GAME_MECHANICS = {
        VELOCIDAD_MOVIMIENTO_LATERAL: 10,
        DURACION_SALTO: 300,
        ALTURA_SALTO: "40px",
        TAMANO_PERSONAJE: "50px"

    }
    const MOVEMENT_FUNCTIONS = {
        "KeyD": movDer,
        "KeyA": movIzq,
        "Space": saltar
    }

    let movementState = {
        saltando: false,
        movLat: false,

    }
    let position = {
        left: 0
    }
    /**
     * Llegó el PJ ya al borde izq??
     */
    function checkLeftBorder() {
        return window.personaje.position.left <= 0
    }
    /**
    * Llegó el PJ ya al borde der??
    */
    function checkRightBorder() {
        // width del mundo menos width del PJ
        const anchoMundo = getWorldWidth();

        return window.personaje.position.left >= anchoMundo - pixelToInt(GAME_MECHANICS.TAMANO_PERSONAJE);
    }
    function saltar() {
        if (!movementState.saltando) {

            movementState.saltando = true;
            window.personaje.el.style.marginBottom = GAME_MECHANICS.ALTURA_SALTO
            setTimeout(function () {
                window.personaje.el.style.marginBottom = "0px";
                movementState.saltando = false;
            }, GAME_MECHANICS.DURACION_SALTO);
        }

    };
    function movDer() {

        if (!movementState.movLat && !checkRightBorder()) {
            movementState.movLat = true;
            if (!window.personaje.el.style.left) {
                window.personaje.el.style.left = "0px";
            }
            window.personaje.el.style.left = intToStringPixelAdder(window.personaje.el.style.left, GAME_MECHANICS.VELOCIDAD_MOVIMIENTO_LATERAL);
            window.personaje.position.left += GAME_MECHANICS.VELOCIDAD_MOVIMIENTO_LATERAL;
            movementState = false;
        }
    };
    function movIzq() {

        if (!movementState.movLat && !checkLeftBorder()) {
            movementState.movLat = true;
            if (!window.personaje.el.style.left) {
                window.personaje.el.style.left = "0px";
            }
            window.personaje.el.style.left = intToStringPixelAdder(window.personaje.el.style.left, -GAME_MECHANICS.VELOCIDAD_MOVIMIENTO_LATERAL);
            window.personaje.position.left -= GAME_MECHANICS.VELOCIDAD_MOVIMIENTO_LATERAL;
            movementState = false;
        }
    };


    return {
        poolOfBullets: undefined,
        el: undefined,
        position,
        MOVEMENT_FUNCTIONS,
        init: function () {
            this.poolOfBullets = poolOfBullets(1000);
            if (this.el === undefined) {

                this.el = document.getElementById("personaje");
            }
        },
        movement: function (e) {

            try {

                this.personaje.MOVEMENT_FUNCTIONS[e.code]();
            } catch (error) {
                //pass
            }
        },
        disparo: function () {

            const bala = this.personaje.poolOfBullets.getBullet();
            this.personaje.el.appendChild(bala);
            setTimeout(() => {
                this.personaje.el.removeChild(bala);
            }, 700);

        },


    }
}





function gameInit() {

    window.personaje = personaje();
    personaje.init();
    window.addEventListener("click", window.personaje.disparo);
    window.addEventListener("keydown", window.personaje.movement);


}
window.addEventListener("load", gameInit);















