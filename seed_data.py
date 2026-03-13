"""Seed sample data for the Hotel Management Dashboard."""
import os
import sys
import django

# Set up Django environment
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hotelapp.settings')
django.setup()

from dashboard.models import Table, MenuItem, InventoryItem, StaffMember

# ── Tables ──
tables = [
    (1, 4, 'available'), (2, 2, 'occupied'), (3, 6, 'available'),
    (4, 4, 'occupied'),  (5, 4, 'occupied'), (6, 2, 'billed'),
    (7, 4, 'available'), (8, 8, 'occupied'), (9, 4, 'available'),
    (10, 2, 'available'),(11, 4, 'occupied'),(12, 6, 'billed'),
    (13, 4, 'available'),(14, 2, 'occupied'),(15, 4, 'available'),
    (16, 8, 'available'),(17, 4, 'occupied'),(18, 2, 'available'),
    (19, 4, 'available'),(20, 6, 'available'),
]
occupied_data = {
    2: (2, 1200, '25 mins', 4),
    4: (3, 850, '12 mins', 3),
    5: (4, 2450, '45 mins', 8),
    6: (2, 680, '55 mins', 2),
    8: (6, 3200, '38 mins', 12),
    11: (4, 1580, '20 mins', 5),
    12: (5, 2100, '1h 5m', 7),
    14: (2, 420, '8 mins', 2),
    17: (3, 950, '15 mins', 3),
}

Table.objects.all().delete()
for num, cap, status in tables:
    extra = {}
    if num in occupied_data:
        g, amt, dur, itms = occupied_data[num]
        extra = {'current_guests': g, 'current_amount': amt, 'duration': dur, 'items_count': itms}
    Table.objects.create(number=num, capacity=cap, status=status, **extra)
print(f"Created {Table.objects.count()} tables.")

# ── Menu Items ──
MenuItem.objects.all().delete()
menu_items = [
    ('Paneer Butter Masala', 'Mains', 280, True),
    ('Butter Chicken', 'Mains', 320, True),
    ('Dal Makhani', 'Mains', 220, True),
    ('Veg Biryani', 'Mains', 250, False),
    ('Chicken Biryani', 'Mains', 300, True),
    ('Garlic Naan', 'Breads', 60, True),
    ('Butter Naan', 'Breads', 50, True),
    ('Tandoori Roti', 'Breads', 35, True),
    ('Paneer Tikka', 'Starters', 240, True),
    ('Chicken Tikka', 'Starters', 280, True),
    ('Veg Spring Roll', 'Starters', 180, True),
    ('Fish Tikka', 'Starters', 320, False),
    ('Coke', 'Beverages', 60, True),
    ('Fresh Lime Soda', 'Beverages', 80, True),
    ('Masala Chai', 'Beverages', 40, True),
    ('Mango Lassi', 'Beverages', 90, True),
    ('Gulab Jamun', 'Desserts', 80, True),
    ('Ice Cream', 'Desserts', 100, True),
]
for name, cat, price, in_stock in menu_items:
    MenuItem.objects.create(name=name, category=cat, price=price, in_stock=in_stock)
print(f"Created {MenuItem.objects.count()} menu items.")

# ── Inventory ──
InventoryItem.objects.all().delete()
inventory = [
    ('Paneer', 'Dairy', 5, 'kg', 10, 50, '2 days ago', 'critical'),
    ('Chicken', 'Meat', 15, 'kg', 10, 40, '1 day ago', 'low'),
    ('Basmati Rice', 'Grains', 80, 'kg', 20, 100, '5 days ago', 'good'),
    ('Tomatoes', 'Vegetables', 25, 'kg', 15, 50, '1 day ago', 'good'),
    ('Onions', 'Vegetables', 30, 'kg', 20, 60, '2 days ago', 'good'),
    ('Cooking Oil', 'Cooking', 8, 'liters', 10, 30, '3 days ago', 'low'),
    ('Wheat Flour', 'Grains', 45, 'kg', 15, 50, '4 days ago', 'good'),
    ('Butter', 'Dairy', 12, 'kg', 5, 20, '1 day ago', 'good'),
]
for name, cat, stock, unit, mn, mx, last, status in inventory:
    InventoryItem.objects.create(
        name=name, category=cat, current_stock=stock, unit=unit,
        min_stock=mn, max_stock=mx, last_restocked=last, status=status
    )
print(f"Created {InventoryItem.objects.count()} inventory items.")

# ── Staff ──
StaffMember.objects.all().delete()
staff = [
    ('Amit Kumar', 'Chef', 'active', 'Morning', 35000, '09:00 AM'),
    ('Priya Sharma', 'Waiter', 'active', 'Morning', 18000, '09:15 AM'),
    ('Rahul Singh', 'Kitchen Helper', 'active', 'Morning', 15000, '08:45 AM'),
    ('Sunita Devi', 'Cleaner', 'active', 'Morning', 12000, '08:30 AM'),
    ('Vikram Patel', 'Waiter', 'off', 'Evening', 18000, None),
]
for name, role, status, shift, salary, checkin in staff:
    StaffMember.objects.create(
        name=name, role=role, status=status, shift=shift,
        salary=salary, checkin_time=checkin
    )
print(f"Created {StaffMember.objects.count()} staff members.")
print("\n✅ Sample data seeded successfully!")
