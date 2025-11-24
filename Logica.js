
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
const encontrarDuplicados = (numeros) => {
    const repetidos = [];
    const yaVistos = [];
    
    for (let i = 0; i < numeros.length; i++) {
        const num = numeros[i];
        
        // Si ya vi este número antes
        if (yaVistos.includes(num)) {
            // Y todavía no lo agregué a la lista de repetidos
            if (!repetidos.includes(num)) {
                repetidos.push(num);
            }
        } else {
            // Primera vez que veo este número
            yaVistos.push(num);
        }
    }
    
    return repetidos;
}

console.log("=== Tests Contraseña ===");
console.log("Password123:", contraseñaValida("Password123")); 
console.log("hola:", contraseñaValida("hola")); 
console.log("password:", contraseñaValida("password")); 

console.log("=== Tests Duplicados ===");
console.log(encontrarDuplicados([1, 2, 3, 2, 4, 5, 3])); 
console.log(encontrarDuplicados([1, 1, 1, 2, 2]));      

