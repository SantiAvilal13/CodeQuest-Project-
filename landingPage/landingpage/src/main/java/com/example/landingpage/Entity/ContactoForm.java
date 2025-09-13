package com.example.landingpage.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;

/* 
 * 
 * 
- Nombre *

- Apellido *

-Correo Electrónico *

-Teléfono (Opcional)

- ¿Qué te interesa más?

- Nivel de Experiencia

- Mensaje Adicional (Opcional)
 */
@Data
@AllArgsConstructor
public class ContactoForm {

    private String nombre;
    private String apellido;
    private String correo;
    private String telefono;
    private String interes;
    private String experiencia;
    private String mensaje;
    private Boolean notificaciones;
}
