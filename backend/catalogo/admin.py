from django.contrib import admin
from .models import Categoria, Producto


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre")


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "precio", "descuento", "stock", "estado_stock", "destacado", "categoria")
    list_editable = ("descuento", "stock", "destacado")
    list_filter = ("categoria", "destacado")
    search_fields = ("nombre", "descripcion")