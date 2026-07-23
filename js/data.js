// Acá se configuran los personajes fijos del escenario.
// nx, ny = posición relativa en la pantalla (0 a 1), así el juego es responsive.
// nyMobile (opcional) reemplaza a ny solo en pantallas chicas (celular), para
// no chocar con los botones táctiles de abajo.
// dialogue es un array de bloques que se muestran en orden en el popup.
// Cada bloque tiene type: "texto", "imagen", "audio" o "video"
// y content: el texto, o la ruta al archivo (imagen/audio/video)

const NPCS = [
  {
    id: 'ro',
    name: 'Ro',
    image: 'assets/personajes/Ro.png',
    nx: 0.15, ny: 0.22,
    dialogue: [
      {
        type: 'texto',
        content:
          'Aunque te fuiste hace más de un año ya, para mí no ha pasado tanto tiempo. No porque no te extrañe físicamente, sino porque siempre buscas la manera de estar presente en cada cosa.\nEstoy muy orgullosa de que estés cumpliendo tus sueños y de todas las cosas buenas que te pasan. Apura que acá te esperamos, y te vamos a esperar siempre 🤍'
      },
      { type: 'imagen', content: 'assets/mensajes/mensaje-ro.jpeg' }
    ]
  },
  {
    id: 'euge',
    name: 'Euge',
    image: 'assets/personajes/Euge.png',
    nx: 0.85, ny: 0.22,
    dialogue: [
      {
        type: 'texto',
        content:
          'Feliz cumple a la niña que cumple sus sueños\nTe espero siempre acá, para que veamos mil shows más juntas\nTe amo'
      },
      { type: 'imagen', content: 'assets/mensajes/mensaje-euge.jpeg' }
    ]
  },
  {
    id: 'agus',
    name: 'Agus',
    image: 'assets/personajes/Agus.png',
    nx: 0.15, ny: 0.82, nyMobile: 0.7,
    dialogue: [
      {
        type: 'texto',
        content:
          'Carmelita del amor: Feliz cumpleaños, amiga! 🤍✨\n\nHoy te celebro. Aunque la distancia haga que no tengamos fotos nuevas juntas, que no podamos abrazarnos seguido o compartir tantos momentos en persona, quiero que sepas que eso nunca cambió lo importante: siempre vas a tener un lugar enorme en mi corazón.\nGracias por tu amistad, por estar, por escuchar, por tu forma tan linda de ser. Sos, sin dudas, la canceriana más tierna que existe  (junto con messi AGUANTE LA SELECCION), con ese corazón gigante que hace sentir bien a todos los que tenemos la suerte de conocerte.\nTambién quiero decirte lo orgullosa que estoy de vos. Pocas personas tienen la valentía de seguir lo que realmente sueñan, y vos la tuviste. Te animaste a dejar tu zona de confort, a apostar por tus deseos. Sé que no siempre debe haber sido fácil, y justamente por eso admiro aún más la fuerza y el corazón con el que enfrentaste cada paso.\nTe extraño mucho y deseo que este nuevo año te encuentre rodeada de amor, cumpliendo sueños y siendo muy feliz, porque te lo merecés de verdad. Ojalá nos crucemos prontito.\n\nTe dejo una frase de uno de mis libros favoritos que me encantarian que todos lean alguna vez en la vida, asi que esta es mi oportunidad para recomendartelo a vos:\n"Existe un lenguaje que va más allá de las palabras. Cuando deseas algo de verdad, todo el universo conspira para que puedas realizarlo."\n-El Alquimista\n\nTe amo amiguita. Feliz cumpleaños.\nTe deseo felicidad, valentia y fuerza, hoy y siempre. '
      },
      { type: 'imagen', content: 'assets/mensajes/mensaje-agus.jpeg' }
    ]
  },
  {
    id: 'pau',
    name: 'Pau',
    image: 'assets/personajes/Pau.png',
    nx: 0.85, ny: 0.82, nyMobile: 0.7,
    dialogue: [
      {
        type: 'texto',
        content:
          'Te dejo este recuerdo, porque me hace reir siempre que lo encuentro, hacia mucho no lo veía y con la final del domingo cobra un sentido espectacular! \nAmiguita, que hayas disfrutado tu cumpleaños numero 26, espero te hayan mimado lo suficiente para que la distancia este dia se haya achicado y espero que sigas teniendo un año de exitos personales y profesionales como lo viene siendo.\nNunca dejes de ocuparte de vos, de tus sueños, de tu salud, se tu prioridad siempre. Sos los vínculos hermosos que construiste, sos la familia que te adora tanto, sos la amiga que nunca deja que la distancia se note entre nosotras. Sos graciosa, inteligente, hermosa y una gran compañera y amiga. Nunca dudes de vos.\n\nTe extraño, extraño las caminatas en las tardecitas de verano, extraño ir al cine y llorar juntas, extraño que salgamos y verte bailar a destiempo.\nNo pude encontrar registro de los inicios de esta amistad, de cuando todavía no existía un grupo, que hacíamos? Hablábamos por facebook? Ya existía instagram? No tengo fotos ni chats. Caminábamos? Tomábamos mate? Salíamos? Si tenes recuerdos así sea en tu mente de como empezó esto compartimelos, me encantaría tenerlos y llevarlos conmigo.\n\nTe amo hoy y siempre loca linda!'
      },
      { type: 'video', content: 'assets/mensajes/mensaje-pau.mp4' }
    ]
  },
  {
    id: 'cinti',
    name: 'Cinti',
    image: 'assets/personajes/Cinti.png',
    nx: 0.75, ny: 0.5, nyMobile: 0.42,
    dialogue: [
      {
        type: 'texto',
        content:
          '¡Carme amiguita hermosa! Feliz cumpleaños! De seguro estás pasándolo súper lindo, por que eso es lo que das por ende lo recibís! Todo lo lindo del mundo! Te quiero mucho amigui! Que seas súper feliz'
      },
      { type: 'imagen', content: 'assets/mensajes/mensaje-cin.jpeg' }
    ]
  },
  {
    id: 'kathy',
    name: 'Kathy',
    image: 'assets/personajes/Kathy.png',
    nx: 0.25, ny: 0.5, nyMobile: 0.42,
    dialogue: [
      {
        type: 'texto',
        content:
          'Feliz cumpleaños, amiga. ❤️\n\nEspero de corazón que hayas pasado un día hermoso, rodeada de personas maravillosas que hoy te acompañan y te hacen sentir tan querida como te merecés.\n\nNo sabés lo orgullosa que me pone verte. Me emociona muchísimo ver lo bien que te adaptaste a esta nueva vida, lo feliz que te veo y todo lo que creciste en este año. Sos gigante. De verdad. Admiro profundamente la valentía que tuviste para animarte a perseguir tus sueños, apostar por vos y construir esta etapa tan lejos de casa, hasta lo hacés parecer posible. Me encanta verte encontrándote en esta nueva era de tu vida, descubriendo nuevas versiones de vos misma y yendo siempre por más.\n\nOjalá nunca dejes de perseguir todo eso que te hace feliz, porque te lo merecés un montón.\n\nY yo sigo soñando con el día en que podamos compartir algún viajecito juntas. Nos imagino tomando un café o una cerveza en alguna ciudad de las Europas ajajaj, tengo mucha fe en que ese momento va a llegar\n\nTe extraño muchísimo (aunque siempre estas cerquita) ya quiero que sea verano para volver a tomar unos teres todas juntas y ahora con otro sobri más ajajaj 🧉\n\nTe deseo un año lleno de experiencias hermosas, personas lindas, desafíos que te hagan crecer y muchísima felicidad.  Te quiero un montón y te mando un abrazo gigante gigante 🤍'
      },
      { type: 'imagen', content: 'assets/mensajes/mensaje-kathy.jpeg' }
    ]
  }
];

const GIFT = {
  id: 'regalo',
  name: 'Regalo',
  title: 'Feliz cumple carmelita',
  image: 'assets/personajes/Regalo.png',
  nx: 0.5, ny: 0.5, nyMobile: 0.42,
  dialogue: [
    {
      type: 'texto',
      content: 'Te amamos, tus amigas desde el otro lado del globo'
    },
    { type: 'imagen', content: 'assets/mensajes/tarjeta.png' },
    {
      type: 'texto',
      content:
        'GiftCard  por 50 Euros\nSin fecha de caducidad.\nVálida en España en las tiendas y páginas web de: Zara, Pull&Bear, Massimo Dutti, Bershka, Stradivarius, Oysho, Zara Home y Lefties.'
    }
  ]
};
