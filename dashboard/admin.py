from django.contrib import admin
# REPAIR: MenuItemVariant ko bhi register karna zaroori hai variants manage karne ke liye
from .models import Table, MenuItem, StaffMember, Category, Order, OrderItem, MenuItemVariant

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'user']
    list_filter = ['user']
    search_fields = ['name']

@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_display = ['number', 'user', 'capacity', 'status', 'current_amount', 'qr_link']
    list_filter = ['status', 'user']
    ordering = ['number']
    search_fields = ['number', 'user__username']

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'user', 'price', 'has_variants']
    list_filter = ['category', 'user', 'has_variants']
    search_fields = ['name']

# NEW: MenuItemVariant registration taaki sizes admin se bhi manage ho sakein
@admin.register(MenuItemVariant)
class MenuItemVariantAdmin(admin.ModelAdmin):
    list_display = ['item', 'size_name', 'price']
    list_filter = ['item__user'] # Owner ke hisaab se filter

@admin.register(StaffMember)
class StaffMemberAdmin(admin.ModelAdmin):
    # FIXED: 'user' ko 'owner' se replace kiya gaya hai aur 'staff_user' add kiya hai
    list_display = ['name', 'owner', 'staff_user', 'role', 'status', 'shift', 'salary']
    list_filter = ['status', 'shift', 'role', 'owner'] # Sync with updated models.py
    search_fields = ['name', 'role', 'owner__username']

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'table', 'user', 'total_price', 'status', 'created_at']
    list_filter = ['status', 'user', 'created_at']
    inlines = [OrderItemInline]