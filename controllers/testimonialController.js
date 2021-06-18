
import {Testimonial} from '../models/Testimoniales.js'

const guardarTestimonial = async (req, res) => {
    //console.log(req.body)// los datos del formulario vienen en este objeto
   
    //validacion 
    const {nombre, correo, mensaje} = req.body;
    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje: "El nombre no puede estar vacio"})
    }

    if(correo.trim() === ''){
        errores.push({mensaje: "El correo no puede estar vacio"})
    }

    if(mensaje.trim() === ''){
        errores.push({mensaje: "El mensaje no puede estar vacio"})
    }

    if(errores.length > 0) {
        //consultar los testimoniales
        const testimoniales = await Testimonial.findAll();

        //mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Tesimoniales',
            errores,
            nombre, 
            correo, 
            mensaje,
            testimoniales
        })
    }else{
        //almacenar en la base de datos
        try {
            await Testimonial.create({
                nombre, 
                correo, 
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarTestimonial
}