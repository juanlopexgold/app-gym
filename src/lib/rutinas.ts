import { FaseRutina } from "@/types/rutina"

export const rutinaLunes: FaseRutina[] = [
    {
        nombre: "🔥 Calentamiento",
        preparacion: 20,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Jumping Jacks", descripcion: "30 segundos" },
            { numeroEjercicio: 2, nombre: "Rotaciones de brazos (Adelante)", descripcion: "30 segundos" },
            { numeroEjercicio: 3, nombre: "Rotaciones de brazos (Atras)", descripcion: "30 segundos" },
            { numeroEjercicio: 4, nombre: "Flexiones con rodillas", descripcion: "30 segundos" },
            { numeroEjercicio: 5, nombre: "Plancha alta", descripcion: "30 segundos" },
        ],
        repeticiones: 30, descanso: 15, series: 3,
    },
    {
        nombre: "💪 Bloque 1 – Pecho (fuerza + volumen)",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Flexiones estándar", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Flexiones inclinadas (manos sobre silla)", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "Flexiones declinadas (pies sobre silla)", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "Flexiones diamante", descripcion: "15 repeticiones minimo" },
            { numeroEjercicio: 5, nombre: "Flexiones lentas (3 s bajando, 1 s subiendo)", descripcion: "15 repeticiones minimo" },
        ],
        repeticiones: 60, descanso: 30, series: 4,
    },
    {
        nombre: "💥 Bloque 2 – Tríceps (aislamiento + bombeo)",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Fondos en silla", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Extensiones de tríceps con mochila o botella", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "Tríceps kickback (con botella o mochila)", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "Plancha con toques de hombro", descripcion: "60 segundos" },
        ],
        repeticiones: 60, descanso: 20, series: 4,
    },
    {
        nombre: "🧨 Bloque 3 – Superserie final",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Flexiones estándar", descripcion: "10 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Fondos en silla", descripcion: "10 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "flexiones diamante", descripcion: "10 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "plancha", descripcion: "30 segundos" },
        ],
        repeticiones: 30, descanso: 5, series: 3,
    },
    {
        nombre: "⚡ Opcional Mini circuito quema grasa",
        preparacion: 20,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Burpees", descripcion: "10 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Mountain climbers", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "Flexiones", descripcion: "10 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "plancha", descripcion: "30 segundos" },
        ],
        repeticiones: 30, descanso: 15, series: 4,
    },
    {
        nombre: "🧘 Estiramiento",
        preparacion: 20,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Estiramiento de pecho (manos entrelazadas detrás)", descripcion: "20 segundos" },
            { numeroEjercicio: 2, nombre: "Estiramiento tríceps por brazo (R)", descripcion: "20 segundos" },
            { numeroEjercicio: 3, nombre: "Estiramiento tríceps por brazo (L)", descripcion: "20 segundos" },
            { numeroEjercicio: 4, nombre: "Plancha ligera o “cobra pose”", descripcion: "20 segundos" },
            { numeroEjercicio: 5, nombre: "Respiración profunda", descripcion: "2 minuto ala ultima serie" },
        ],
        repeticiones: 20, descanso: 15, series: 2,
    },
]

export const rutinaMartes: FaseRutina[] = [
    {
        nombre: "🔥 Calentamiento",
        preparacion: 20,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Jumping Jacks", descripcion: "30 segundos" },
            { numeroEjercicio: 2, nombre: "Sentadillas al aire (rápidas, sin pausa)", descripcion: "30 segundos" },
            { numeroEjercicio: 3, nombre: "Zancadas alternadas (controladas, espalda recta)", descripcion: "30 segundos" },
            { numeroEjercicio: 4, nombre: "Puente de glúteo con elevación de talones", descripcion: "30 segundos" },
            { numeroEjercicio: 5, nombre: "Mountain climbers", descripcion: "30 segundos" },
        ],
        repeticiones: 30, descanso: 15, series: 3,
    },
    {
        nombre: "💪 Bloque 1 – Fuerza Base",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Sentadilla profunda con peso", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Zancadas caminando (con peso)", descripcion: "12 c/pierna minimo" },
            { numeroEjercicio: 3, nombre: "Peso muerto rumano (piernas semirrígidas)", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "Puente de glúteo con peso + isometría 3 s arriba", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 5, nombre: "Elevaciones de talones (calf raises) con salto final", descripcion: "30 + 10 saltos" },
        ],
        repeticiones: 60, descanso: 30, series: 5,
    },
    {
        nombre: "⚡ Bloque 2 – Explosivo / Potencia",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Jump squats profundos", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Zancadas con salto alternado", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "Skaters laterales (rápidos)", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "Sentadilla isométrica (mantén 90° de ángulo)", descripcion: "40 segundos" },
        ],
        repeticiones: 40, descanso: 20, series: 4,
    },
    {
        nombre: "🧨 Bloque 3 – Finisher Infernal",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Sentadillas normales (controladas)", descripcion: "15 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Jump squats", descripcion: "10 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "Mountain climbers", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "Puentes de glúteo rápidos", descripcion: "16 repeticiones minimo" },
            { numeroEjercicio: 5, nombre: "Plancha con elevación de pierna alternada", descripcion: "30 segundos" },
        ],
        repeticiones: 30, descanso: 5, series: 3,
    },
    {
        nombre: "⚡ Opcional Mini circuito quema grasa",
        preparacion: 30,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Burpees", descripcion: "10 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Mountain climbers", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "Flexiones", descripcion: "10 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "plancha", descripcion: "30 segundos" },
        ],
        repeticiones: 30, descanso: 15, series: 4,
    },
    {
        nombre: "🧘 Estiramiento",
        preparacion: 20,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "De pie, sujeta un pie hacia atrás (talón al glúteo).", descripcion: "Aprieta glúteos y mantén torso erguido." },
            { numeroEjercicio: 2, nombre: "Sentado, cruza una pierna sobre la otra y tira de la rodilla al pecho.", descripcion: "Siente el estiramiento en el lateral." },
            { numeroEjercicio: 3, nombre: "Sentado, piernas extendidas, inclínate hacia adelante sin encorvar la espalda.", descripcion: "Puedes usar una toalla para tirar suavemente." },
            { numeroEjercicio: 4, nombre: "Posición de zancada con rodilla trasera apoyada, empuja la pelvis al frente.", descripcion: "Cambia de pierna." },
            { numeroEjercicio: 5, nombre: "Con manos en la pared, pierna trasera extendida, talón apoyado.", descripcion: "Mantén la pierna recta." },
            { numeroEjercicio: 6, nombre: "Sentado en el suelo, piernas abiertas en V, inclínate al centro.", descripcion: "Mantén 40 s." },
            { numeroEjercicio: 7, nombre: "Estira la espalda, luego pasa a cobra y abre el pecho.", descripcion: "20 s cada una." },
        ],
        repeticiones: 40, descanso: 3, series: 2,
    },
]

export const rutinaMiercoles: FaseRutina[] = [
    {
        nombre: "🔥 Calentamiento",
        preparacion: 20,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Jumping Jacks", descripcion: "30 segundos" },
            { numeroEjercicio: 2, nombre: "Rotaciones de brazos (Adelante)", descripcion: "30 segundos" },
            { numeroEjercicio: 3, nombre: "Rotaciones de brazos (Atras)", descripcion: "30 segundos" },
            { numeroEjercicio: 4, nombre: "Remo sin peso (mueve los codos hacia atrás apretando la espalda R)", descripcion: "30 segundos" },
            { numeroEjercicio: 5, nombre: "Remo sin peso (mueve los codos hacia atrás apretando la espalda L)", descripcion: "30 segundos" },
            { numeroEjercicio: 6, nombre: "Plancha alta", descripcion: "30 segundos" },
            { numeroEjercicio: 7, nombre: "Flexiones con manos separadas (para activar dorsal y hombros)", descripcion: "15 repeticiones minimo" },
        ],
        repeticiones: 30, descanso: 10, series: 3,
    },
    {
        nombre: "💪 Bloque 1 – Fuerza de Espalda",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Remo con mochila o banda elástica", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Superman hold (espalda baja)", descripcion: "60 segundos" },
            { numeroEjercicio: 3, nombre: "Plancha con remo (sin peso o con botellas)", descripcion: "12 c/lado" },
            { numeroEjercicio: 4, nombre: "Reverse fly (brazos extendidos)", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 5, nombre: "Remo invertido en mesa (opcional si tienes soporte)", descripcion: "15 repeticiones minimo" },
        ],
        repeticiones: 60, descanso: 30, series: 5,
    },
    {
        nombre: "⚡ Bloque 2 – Bíceps",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Curls de bíceps con peso", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Curls martillo (agarre neutro)", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "Curls concentrados (sentado, un brazo a la vez)", descripcion: "20 c/brazo" },
            { numeroEjercicio: 4, nombre: "Curls parciales (solo mitad superior del movimiento)", descripcion: "20 repeticiones minimo" },
        ],
        repeticiones: 40, descanso: 20, series: 4,
    },
    {
        nombre: "🧨 Bloque 3 – Core + Estabilidad",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Superman extensiones (levanta y baja lentamente)", descripcion: "15 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Mountain climbers", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "Plancha con toques de hombro", descripcion: "15 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "Flexiones cerradas", descripcion: "15 repeticiones minimo" },
        ],
        repeticiones: 30, descanso: 5, series: 3,
    },
    {
        nombre: "⚡ Opcional Espalda y brazos al fallo",
        preparacion: 30,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Burpees", descripcion: "10 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Curls rápidos", descripcion: "15 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "Mountain climbers", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "plancha alta", descripcion: "30 segundos" },
        ],
        repeticiones: 30, descanso: 5, series: 4,
    },
    {
        nombre: "🧘 Estiramiento",
        preparacion: 20,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Cruza un brazo frente al pecho y jálalo con el otro.", descripcion: "Siente entre omóplatos." },
            { numeroEjercicio: 2, nombre: "Siéntate y estira los brazos al frente (como si abrazaras un árbol).", descripcion: "Mantén la espalda redondeada." },
            { numeroEjercicio: 3, nombre: "Postura del niño (rodillas al suelo, brazos al frente).", descripcion: "Respira profundo." },
            { numeroEjercicio: 4, nombre: "Apoya la mano en la pared con el brazo extendido, gira el torso hacia el lado contrario.", descripcion: "Siente la apertura del brazo." },
            { numeroEjercicio: 5, nombre: "Entrelaza las manos detrás y estira hacia atrás.", descripcion: "Abre el pecho." },
            { numeroEjercicio: 6, nombre: "Inclina la cabeza hacia un lado y presiona suavemente.", descripcion: "Cambia de lado." },
        ],
        repeticiones: 40, descanso: 3, series: 2,
    },
]

export const rutinaJueves: FaseRutina[] = [
    {
        nombre: "🔥 Calentamiento",
        preparacion: 20,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Jumping jacks", descripcion: "30 segundos" },
            { numeroEjercicio: 2, nombre: "Sentadillas al aire (rápidas, sin pausa)", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "Mountain climbers lentos", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "Desplantes alternados", descripcion: "15 repeticiones minimo" },
            { numeroEjercicio: 5, nombre: "Plancha alta con toque de hombros", descripcion: "30 segundos" },
        ],
        repeticiones: 30, descanso: 15, series: 3,
    },
    {
        nombre: "💪 Bloque 1 – HIIT Total Body",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Jumping jacks", descripcion: "40 segundos" },
            { numeroEjercicio: 2, nombre: "Burpees", descripcion: "40 segundos" },
            { numeroEjercicio: 3, nombre: "Mountain climbers", descripcion: "40 segundos" },
            { numeroEjercicio: 4, nombre: "Sentadilla con salto", descripcion: "40 segundos" },
            { numeroEjercicio: 5, nombre: "Plancha con toques de hombro", descripcion: "40 segundos" },
        ],
        repeticiones: 40, descanso: 20, series: 5,
    },
    {
        nombre: "⚡ Bloque 2 – Cardio Funcional + Fuerza",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "High knees (rodillas arriba)", descripcion: "40 segundos" },
            { numeroEjercicio: 2, nombre: "Step-up en silla (alternado)", descripcion: "40 segundos" },
            { numeroEjercicio: 3, nombre: "Skaters laterales (rápidos)", descripcion: "40 segundos" },
            { numeroEjercicio: 4, nombre: "Burpee + salto alto", descripcion: "40 segundos" },
        ],
        repeticiones: 40, descanso: 20, series: 4,
    },
    {
        nombre: "🧨 Bloque 3 – Core Intenso",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Crunches", descripcion: "60 segundos" },
            { numeroEjercicio: 2, nombre: "Elevaciones de piernas", descripcion: "60 segundos" },
            { numeroEjercicio: 3, nombre: "Plancha frontal", descripcion: "60 segundos" },
            { numeroEjercicio: 4, nombre: "Plancha lateral c/pierna elevada", descripcion: "60 segundos" },
            { numeroEjercicio: 5, nombre: "Russian twists (con peso o sin peso)", descripcion: "60 segundos" },
        ],
        repeticiones: 60, descanso: 5, series: 3,
    },
    {
        nombre: "⚡ Opcional Cardio Largo + Core Dinámico",
        preparacion: 30,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "salto normal", descripcion: "1 minuto" },
            { numeroEjercicio: 2, nombre: "salto doble o alto", descripcion: "1 minuto" },
            { numeroEjercicio: 3, nombre: "jumping jacks", descripcion: "1 minuto" },
            { numeroEjercicio: 1, nombre: "burpees", descripcion: "1 minuto" },
        ],
        repeticiones: 60, descanso: 15, series: 5,
    },
    {
        nombre: "🧘 Estiramiento",
        preparacion: 20,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Estiramiento sentado (toca la punta de los pies)", descripcion: "Mantén la espalda recta" },
            { numeroEjercicio: 2, nombre: "Acostado, cruza una pierna sobre la otra y tira hacia el pecho", descripcion: "Mantén 20 s por lado" },
            { numeroEjercicio: 3, nombre: "De pie, toma un pie y llévalo hacia glúteos", descripcion: "Mantén las rodillas juntas" },
            { numeroEjercicio: 4, nombre: "Postura “cobra” (boca abajo, empuja con brazos)", descripcion: "Respira profundo" },
            { numeroEjercicio: 5, nombre: "Postura del niño (rodillas al suelo, brazos extendidos al frente)", descripcion: "40 s" },
            { numeroEjercicio: 6, nombre: "De pie, inclínate lateralmente con el brazo extendido", descripcion: "20 s cada una." },
        ],
        repeticiones: 40, descanso: 3, series: 2,
    },
]

export const rutinaViernes: FaseRutina[] = [
    {
        nombre: "🔥 Calentamiento",
        preparacion: 20,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Jumping Jacks", descripcion: "30 segundos" },
            { numeroEjercicio: 2, nombre: "Rotaciones de hombro", descripcion: "30 segundos" },
            { numeroEjercicio: 3, nombre: "Flexiones con rodillas", descripcion: "30 segundos" },
            { numeroEjercicio: 4, nombre: "Fondos cortos en silla", descripcion: "30 segundos" },
        ],
        repeticiones: 30, descanso: 15, series: 3,
    },
    {
        nombre: "💪 Bloque 1 – Fuerza pura",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Flexiones cerradas (tríceps)", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Fondos en silla", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "Curls con mochila o botellas", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "Pike push-ups (hombros)", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 5, nombre: "Curl martillo + giro de muñeca", descripcion: "20 repeticiones minimo" },
        ],
        repeticiones: 60, descanso: 30, series: 5,
    },
    {
        nombre: "⚡ Bloque 2 – Superserie controlada",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "flexiones estándar", descripcion: "15 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "curls rápidos", descripcion: "15 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "fondos en silla", descripcion: "15 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "plancha", descripcion: "40 segundos" },
        ],
        repeticiones: 40, descanso: 15, series: 4,
    },
    {
        nombre: "🧨 Bloque 3 – Finisher",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "burpees", descripcion: "15 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "flexiones diamante", descripcion: "10 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "Mountain climbers", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "plancha frontal", descripcion: "30 segundos" },
            { numeroEjercicio: 5, nombre: "Plancha con elevación de pierna alternada", descripcion: "30 segundos" },
        ],
        repeticiones: 30, descanso: 5, series: 4,
    },
    {
        nombre: "⚡ Opcional Mini circuito quema grasa",
        preparacion: 30,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Burpees", descripcion: "10 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Mountain climbers", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "Flexiones", descripcion: "10 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "plancha", descripcion: "30 segundos" },
        ],
        repeticiones: 30, descanso: 15, series: 4,
    },
    {
        nombre: "🧘 Estiramiento",
        preparacion: 20,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Estiramiento de pecho (manos entrelazadas detrás)", descripcion: "20 segundos" },
            { numeroEjercicio: 2, nombre: "Estiramiento tríceps por brazo (R)", descripcion: "20 segundos" },
            { numeroEjercicio: 3, nombre: "Estiramiento tríceps por brazo (L)", descripcion: "20 segundos" },
            { numeroEjercicio: 4, nombre: "Plancha ligera o “cobra pose”", descripcion: "20 segundos" },
            { numeroEjercicio: 5, nombre: "Respiración profunda", descripcion: "2 minuto ala ultima serie" },
        ],
        repeticiones: 20, descanso: 15, series: 2,
    },
]

export const rutinaSabado: FaseRutina[] = [
    {
        nombre: "🔥 Calentamiento",
        preparacion: 20,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Jumping Jacks", descripcion: "30 segundos" },
            { numeroEjercicio: 2, nombre: "Sentadillas al aire (baja profundo)", descripcion: "30 segundos" },
            { numeroEjercicio: 3, nombre: "Zancadas alternadas con giro de torso", descripcion: "30 segundos" },
            { numeroEjercicio: 4, nombre: "Puente de glúteo + patada alternada", descripcion: "30 segundos" },
            { numeroEjercicio: 5, nombre: "Mountain climbers", descripcion: "30 segundos" },
        ],
        repeticiones: 30, descanso: 15, series: 3,
    },
    {
        nombre: "💪 Bloque 1 – Fuerza Base",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Sentadillas con salto (profundas y explosivas)", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Zancadas caminando (con peso)", descripcion: "12 c/pierna minimo" },
            { numeroEjercicio: 3, nombre: "Peso muerto rumano (piernas semirrígidas)", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "Puentes de glúteo con una pierna (isométrico arriba 2 s)", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 5, nombre: "Calf raises lentos (mantén 2 s arriba)", descripcion: "30 minimo" },
        ],
        repeticiones: 60, descanso: 30, series: 4,
    },
    {
        nombre: "⚡ Bloque 2 – Explosivo / Potencia",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Jump squats profundos", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Skaters laterales (amplios y rápidos)", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "Burpees completos (sin salto si te fatigas demasiado)", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "Step-up en silla (o escalón firme, alternando piernas)", descripcion: "20 C pierna" },
        ],
        repeticiones: 40, descanso: 20, series: 4,
    },
    {
        nombre: "🧨 Bloque 3 – Finisher Infernal",
        preparacion: 40,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Squats controlados", descripcion: "15 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "Jump squats explosivos", descripcion: "10 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "Lunges (5 por pierna, controlados)", descripcion: "10 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "Puentes de glúteo rápidos", descripcion: "15 repeticiones minimo" },
            { numeroEjercicio: 5, nombre: "Plancha con elevación de pierna alternada", descripcion: "30 segundos" },
        ],
        repeticiones: 40, descanso: 5, series: 4,
    },
    {
        nombre: "⚡ Opcional Mini circuito quema grasa",
        preparacion: 30,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "squats", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 2, nombre: "puentes", descripcion: "20 repeticiones minimo" },
            { numeroEjercicio: 3, nombre: "saltos verticales", descripcion: "10 repeticiones minimo" },
            { numeroEjercicio: 4, nombre: "sentadilla isométrica", descripcion: "40 segundos" },
            { numeroEjercicio: 5, nombre: "Jump squats", descripcion: "20 repeticiones minimo" },
        ],
        repeticiones: 40, descanso: 5, series: 3,
    },
    {
        nombre: "🧘 Estiramiento",
        preparacion: 20,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "De pie, lleva un pie hacia el glúteo.", descripcion: "Mantén rodillas juntas y empuja la pelvis hacia adelante." },
            { numeroEjercicio: 2, nombre: "Sentado, cruza una pierna sobre la otra y tira suavemente de la rodilla al pecho.", descripcion: "Siente el estiramiento lateral profundo." },
            { numeroEjercicio: 3, nombre: "De pie, apoya el talón sobre una silla o escalón y flexiona el torso hacia la pierna.", descripcion: "Mantén la espalda recta." },
            { numeroEjercicio: 4, nombre: "Posición de zancada con rodilla trasera apoyada, pelvis hacia adelante.", descripcion: "Cambia de pierna." },
            { numeroEjercicio: 5, nombre: "Con manos en la pared, pierna trasera extendida, talón apoyado.", descripcion: "Mantén la pierna recta." },
            { numeroEjercicio: 6, nombre: "Sentado en el suelo, piernas abiertas en V, inclínate al centro.", descripcion: "Mantén 40 s." },
            { numeroEjercicio: 7, nombre: "Estira la espalda, luego pasa a cobra y abre el pecho.", descripcion: "20 s cada una." },
        ],
        repeticiones: 40, descanso: 3, series: 2,
    },
]

export const rutinaDomingo: FaseRutina[] = [
    {
        nombre: "Calentamiento",
        preparacion: 20,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Caminata ligera", descripcion: "3 minutos" },
            { numeroEjercicio: 2, nombre: "Caminata rápida", descripcion: "3 minutos" },
            { numeroEjercicio: 3, nombre: "Círculos de brazos + movilidad de cadera", descripcion: "3 minutos" },
            { numeroEjercicio: 4, nombre: "Caminata con elevación de rodillas", descripcion: "3 minutos" },
        ],
        repeticiones: 180, descanso: 15, series: 1,
    },
    {
        nombre: "Bloque 1 - Caminata + Trote por intervalos",
        preparacion: 10,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Caminata rápida", descripcion: "2 minutos" },
            { numeroEjercicio: 2, nombre: "Trote suave", descripcion: "2 minutos" },
            { numeroEjercicio: 3, nombre: "Caminata ligera", descripcion: "2 minutos" },
        ],
        repeticiones: 120, descanso: 20, series: 6,
    },
    {
        nombre: "Bloque 2 - Aceleración final",
        preparacion: 10,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "trote rápido", descripcion: "30 segundos" },
            { numeroEjercicio: 2, nombre: "caminata", descripcion: "30 segundos" },
        ],
        repeticiones: 30, descanso: 20, series: 6,
    },
    {
        nombre: "Estiramiento",
        preparacion: 10,
        ejercicios: [
            { numeroEjercicio: 1, nombre: "Estiramiento de bíceps", descripcion: "20 segundos" },
            { numeroEjercicio: 2, nombre: "Estiramiento de tríceps", descripcion: "20 segundos" },
            { numeroEjercicio: 3, nombre: "Estiramiento de hombros", descripcion: "20 segundos" },
            { numeroEjercicio: 4, nombre: "Estiramiento de espalda", descripcion: "20 segundos" },
            { numeroEjercicio: 5, nombre: "Respiración profunda", descripcion: "1 minuto" },
        ],
        repeticiones: 10, descanso: 15, series: 4,
    },
]