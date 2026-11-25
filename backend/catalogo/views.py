from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Categoria, Producto
from .serializers import CategoriaSerializer, ProductoSerializer


class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class ProductoViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProductoSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["nombre", "descripcion", "categoria__nombre"]
    ordering_fields = ["precio", "nombre", "stock"]

    def get_queryset(self):
        qs = Producto.objects.select_related("categoria").order_by("id")
        p = self.request.query_params
        if p.get("categoria"):
            qs = qs.filter(categoria_id=p["categoria"])
        if p.get("disponible") == "true":
            qs = qs.filter(stock__gt=0)
        if p.get("en_oferta") == "true":
            qs = qs.filter(descuento__gt=0)
        if p.get("destacado") == "true":
            qs = qs.filter(destacado=True)
        return qs

    @action(detail=True, methods=["get"])
    def recomendados(self, request, pk=None):
        producto = self.get_object()
        base = (
            Producto.objects.select_related("categoria")
            .filter(stock__gt=0)
            .exclude(pk=producto.pk)
        )
        orden = ("-destacado", "-descuento", "id")
        elegidos = list(base.filter(categoria_id=producto.categoria_id).order_by(*orden)[:4])
        if len(elegidos) < 4:
            ids = [p.pk for p in elegidos]
            faltan = 4 - len(elegidos)
            elegidos += list(base.exclude(pk__in=ids).order_by(*orden)[:faltan])
        return Response(self.get_serializer(elegidos, many=True).data)