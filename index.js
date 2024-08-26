const express = require('express');
const app = express();

app.use(express.json());

let productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

app.get('/productos', (req, res) => {
    res.json(productos);
});

app.post('/productos', (req, res) => {
    const newProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio
    };
    productos.push(newProducto);
    res.status(201).json(newProducto);
});

app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    producto.nombre = req.body.nombre || producto.nombre;
    producto.precio = req.body.precio || producto.precio;

    res.json(producto);
});

app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productoIndex = productos.findIndex(p => p.id === id);

    if (productoIndex === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const deletedProducto = productos.splice(productoIndex, 1);
    res.json(deletedProducto);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
