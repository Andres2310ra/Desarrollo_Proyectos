import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;

public class DesencriptarFoto {

    // Método para extraer el mensaje oculto de una imagen PNG
    public static String extraerMensaje(String ruta) {
        try {
            // Leer la imagen desde el archivo
            BufferedImage imagen = ImageIO.read(new File(ruta));

            // Obtener el ancho y el alto de la imagen
            int ancho = imagen.getWidth();
            int alto = imagen.getHeight();

            // Crear una variable para almacenar el mensaje
            String mensaje = "";

            // Recorrer los píxeles de la imagen
            for (int x = 0; x < ancho; x++) {
                for (int y = 0; y < alto; y++) {
                    // Obtener el color del píxel actual
                    int color = imagen.getRGB(x, y);

                    // Obtener los bits menos significativos de cada canal RGB
                    int r = color & 1; // El último bit de rojo
                    int g = (color >> 8) & 1; // El último bit de verde
                    int b = (color >> 16) & 1; // El último bit de azul

                    // Concatenar los bits al mensaje
                    mensaje += r + "" + g + "" + b;
                }
            }

            // Convertir el mensaje binario a texto
            return binarioATexto(mensaje);

        } catch (IOException e) {
            // Si ocurre algún error, mostrar el mensaje de excepción
            return e.getMessage();
        }
    }

    // Método para convertir una cadena binaria a texto
    public static String binarioATexto(String binario) {
        // Crear una variable para almacenar el texto
        String texto = "";

        // Dividir la cadena binaria en grupos de 8 bits
        String[] bytes = binario.split("(?<=\\G.{8})");

        // Recorrer los bytes
        for (String byteActual : bytes) {
            // Convertir el byte actual a un número entero
            int numero = Integer.parseInt(byteActual, 2);

            // Si el número es cero, significa que se terminó el mensaje
            if (numero == 0) {
                break;
            }

            // Convertir el número a un carácter y concatenarlo al texto
            char caracter = (char) numero;
            texto += caracter;
        }

        // Devolver el texto obtenido
        return texto;
    }

    public static void main(String[] args) {
        // Poner la ruta de la imagen con el mensaje oculto
        String ruta = "C:\\Users\\carlo\\OneDrive\\Escritorio\\VSC\\Encriptacion_Universidad\\img";

        // Llamar al método para extraer el mensaje y mostrarlo por consola
        String mensaje = extraerMensaje(ruta);
        System.out.println("El Mensaje es: " + mensaje);
    }
}
