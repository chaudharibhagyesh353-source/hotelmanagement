from django.db import models
from django.contrib.auth.models import User
# NEW: Cloudinary field for permanent image storage
from cloudinary.models import CloudinaryField

# --- FIREBASE IMPORTS --- ✅
from django.db.models.signals import post_save
from django.dispatch import receiver
from firebase_admin import messaging

# ─── 0. RESTAURANT PROFILE (For Settings Page) ───
class RestaurantProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    restaurant_name = models.CharField(max_length=200, default="Restaurant Pro")
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    gst_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=5.00)
    currency_symbol = models.CharField(max_length=10, default="₹")
    owner_name = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.restaurant_name} Settings ({self.user.username})"

# 1. Category Model
class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=100)

    class Meta:
        unique_together = ['user', 'name']
        verbose_name_plural = "Categories"

    def __str__(self):
        return f"{self.name} ({self.user.username})"

# 2. Table Model
class Table(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('occupied', 'Occupied'),
        ('billed', 'Bill Printed'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tables')
    name = models.CharField(max_length=100) 
    capacity = models.IntegerField(default=4)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    qr_link = models.URLField(max_length=500, null=True, blank=True)
    current_guests = models.IntegerField(null=True, blank=True)
    current_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    duration = models.CharField(max_length=50, null=True, blank=True)
    items_count = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ['name']
        unique_together = ['user', 'name']

    def __str__(self):
        return f"{self.name} ({self.user.username})"

# 3. MenuItem Model
class MenuItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='menu_items')
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='items', null=True, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    has_variants = models.BooleanField(default=False)
    image = CloudinaryField('image', folder='menu_items/', upload_preset='hotel_menu_preset', null=True, blank=True)
    description = models.TextField(null=True, blank=True) 

    class Meta:
        ordering = ['category', 'name']

    def __str__(self):
        return f"{self.name} - {self.user.username}"

class MenuItemVariant(models.Model):
    item = models.ForeignKey(MenuItem, on_delete=models.CASCADE, related_name='variants')
    size_name = models.CharField(max_length=50) 
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.item.name} ({self.size_name})"

# 4. StaffMember Model
class StaffMember(models.Model):
    STATUS_CHOICES = [
        ('active', 'On Duty'),
        ('off', 'Off Duty'),
    ]
    SHIFT_CHOICES = [
        ('Morning', 'Morning'),
        ('Afternoon', 'Afternoon'),
        ('Evening', 'Evening'),
        ('Night', 'Night'),
    ]
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='restaurant_staff')
    staff_user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='staff_profile', null=True, blank=True)
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    shift = models.CharField(max_length=20, choices=SHIFT_CHOICES, default='Morning')
    salary = models.IntegerField(default=0)
    checkin_time = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} (Works for {self.owner.username})"

    def initials(self):
        parts = self.name.split()
        return ''.join(p[0].upper() for p in parts if p)

# 5. Order Model (UPDATED Status choices to match Flutter logic)
class Order(models.Model):
    STATUS_CHOICES = [
        ('placed', 'Placed'),      # Flutter app 'placed' use karti hai
        ('cooking', 'Cooking'),    # Flutter app 'cooking' use karti hai
        ('ready', 'Ready'),        # Flutter app 'ready' use karti hai
        ('served', 'Served')
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='placed')
    created_at = models.DateTimeField(auto_now_add=True)
    is_notified = models.BooleanField(default=False) 
    items_json = models.TextField(null=True, blank=True) 

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Order {self.id} - {self.table.name} ({self.user.username})"

# 6. OrderItem Model
class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    variant = models.ForeignKey(MenuItemVariant, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        variant_info = f" ({self.variant.size_name})" if self.variant else ""
        return f"{self.quantity} x {self.menu_item.name}{variant_info}"

# ─── FIREBASE SIGNAL ─── ✅
@receiver(post_save, sender=Order)
def send_order_notification(sender, instance, created, **kwargs):
    """
    Jab naya order create hoga, kitchen staff ko notification bhejega.
    """
    if created:
        try:
            topic = "kitchen_staff"
            message = messaging.Message(
                notification=messaging.Notification(
                    title="Naya Order Mila! 🔔",
                    body=f"Table {instance.table.name} ke liye naya order aaya hai.",
                ),
                data={
                    "type": "new_order",
                    "order_id": str(instance.id),
                    "table": instance.table.name
                },
                topic=topic,
            )
            response = messaging.send(message)
            print(f"Firebase Notification Sent: {response}")
        except Exception as e:
            print(f"Firebase Signal Error: {e}")