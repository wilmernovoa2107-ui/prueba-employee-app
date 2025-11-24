

const contraseñaValida = (contraseña) => {
    // 1. Aca se verifica la longitud
    if (contraseña.length < 8) {
        return false;
    }

    // 2. Aca se verifica que tenga numeros
    let tieneNumero = false;
    for (let i = 0; i < contraseña.length; i++) {
        if (contraseña[i] >= '0' && contraseña[i] <= '9') {
            tieneNumero = true;
            break;
        }
    }
    if (!tieneNumero) return false;
    // 3. Aca se verifica que tenga mayusculas
    if (!/[A-Z]/.test(contraseña)) {
        return false;
    }
    // 4. Esto es se retorna si pasa todas las validaciones
    return true;
}

const numerosDuplicados = (arregloParametros) =>{

    for (let i = 0; i < arregloParametros.length; i++) {
        if (arregloParametros.slice(0, i).incluides(arregloParametros[i])){

            return arregloParametros[i]
        }
    }
    return undefined; //No se encuentran duplicados
} 

export default logica