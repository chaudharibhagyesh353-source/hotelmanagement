from rest_framework import serializers
from .models import (
    RestaurantProfile, Category, Table, 
    MenuItem, MenuItemVariant, Order, OrderItem
)

# 1. Restaurant Profile Serializer (For App Settings)
class RestaurantProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantProfile
        fields = ['restaurant_name', 'phone', 'address', 'gst_percentage', 'currency_symbol']

# 2. Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

# 3. Menu Item Variant Serializer (Nested in Menu Items)
class MenuItemVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItemVariant
        fields = ['id', 'size_name', 'price']

# 4. Menu Item Serializer
class MenuItemSerializer(serializers.ModelSerializer):
    # Variants ko nest kar rahe hain taaki ek hi request mein sab mil jaye
    variants = MenuItemVariantSerializer(many=True, read_only=True)
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = MenuItem
        fields = ['id', 'name', 'category', 'category_name', 'price', 'has_variants', 'image', 'description', 'variants']

# 5. Table Serializer (For Floor Plan)
class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ['id', 'name', 'capacity', 'status', 'qr_link', 'current_amount']

# 6. Order Item Serializer (Nested in Orders)
class OrderItemSerializer(serializers.ModelSerializer):
    menu_item_name = serializers.ReadOnlyField(source='menu_item.name')
    variant_name = serializers.ReadOnlyField(source='variant.size_name')

    class Meta:
        model = OrderItem
        fields = ['id', 'menu_item', 'menu_item_name', 'variant_name', 'quantity']

# 7. Full Order Serializer (For KDS and Waiter App)
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    table_name = serializers.ReadOnlyField(source='table.name')
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'table', 'table_name', 'total_price', 'status', 'status_display', 'created_at', 'items', 'items_json']