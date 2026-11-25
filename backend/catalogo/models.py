from decimal import Decimal

from django.core.validators import MaxValueValidator
from django.db import models


class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True)

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    imagen = models.URLField(blank=True)
    stock = models.PositiveIntegerField(default=0)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name="productos")
    descuento = models.PositiveSmallIntegerField(
        default=0, validators=[MaxValueValidator(100)],
        help_text="Porcentaje de descuento (0 a 100)")
    destacado = models.BooleanField(default=False)
    stock_minimo = models.PositiveIntegerField(default=5)

    def __str__(self):
        return self.nombre

    @property
    def precio_final(self):
        return (self.precio * (100 - self.descuento) / Decimal(100)).quantize(Decimal("0.01"))

    @property
    def estado_stock(self):
        if self.stock <= 0:
            return "agotado"
        if self.stock <= self.stock_minimo:
            return "bajo"
        return "disponible"