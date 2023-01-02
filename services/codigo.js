// TODO: Generar código
const generarCodigo = (longitud) => {
    
    let numeros = '0123456789';
    let letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numeros_letras = numeros + letras;

    let codigo = "";

    for (let i = 0; i < longitud; i++) {
        let aleatorio = Math.floor(Math.random() * numeros_letras.length);
        codigo += numeros_letras.charAt(aleatorio);
    }

    return codigo;
}

module.exports = {
    generarCodigo
}