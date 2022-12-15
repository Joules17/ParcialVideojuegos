# ParcialVideojuegos
__Flappy Bird__ 

Hecho con el framework para juegos de JavaScript, Phaser 3 y siguiendo la guía del campus. 

__Link del video del juego__: https://youtu.be/f5pAtp_xnKU
## Estudiante:
> Julian Andres Salamanca Tellez __1841654-3743__ 🤓

## NOTA IMPORTANTE
En las secciones de __preload__ se tiene en cuenta la carpeta WWW en donde esta ubicado el WampServer, es decir, se tiene una carpeta /Flappy/, en caso de tener errores, elimine esa parte de la ruta. 

Por ejemplo, aqui se carga una imagen desde Flappy: 

```
> preload() {
      // images
      this.load.image('bg_image', '../Flappy/assets/images/city.jpg');
    }
```

En caso de errores, omita __/Flappy/__ de la ruta de la imagen: 

```
> preload() {
      // images
      this.load.image('bg_image', '../assets/images/city.jpg');
    }
```
