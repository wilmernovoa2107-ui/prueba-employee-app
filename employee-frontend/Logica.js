
//Logica para contraseña valida

const contraseñaValida = (contraseña) => {
    // 1 Aca se verifica la longitud
    if (contraseña.length < 8) {
        return false;
    }

    // 2 Aca se verifica que tenga numeros
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
    // 4 Esto es se retorna si pasa todas las validaciones
    return true;
}


//Logica para numeros duplicados en un arreglo
const numerosDuplicados = (arregloParametros) => {
    const duplicados = [];
    const vistos = new Set();
    
    for (let i = 0; i < arregloParametros.length; i++) {
        if (vistos.has(arregloParametros[i])) {
            if (!duplicados.includes(arregloParametros[i])) {
                duplicados.push(arregloParametros[i]);
            }
        } else {
            vistos.add(arregloParametros[i]);
        }
    }
    return duplicados;
}

console.log("=== Tests Contraseña ===");
console.log("Password123:", contraseñaValida("Password123")); 
console.log("hola:", contraseñaValida("hola")); 
console.log("password:", contraseñaValida("password")); 

console.log("=== Tests Duplicados ===");
console.log("[1,2,3,2,4,5,3]:", numerosDuplicados([1, 2, 3, 2, 4, 5, 3])); 
console.log("[1,1,1,2,2]:", numerosDuplicados([1, 1, 1, 2, 2]));

