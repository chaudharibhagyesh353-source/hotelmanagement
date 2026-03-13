import json
from decimal import Decimal
from functools import wraps
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Sum
from django.utils import timezone
from django.contrib.auth.models import User 
from django.contrib.auth import update_session_auth_hash 
from .models import Table, MenuItem, StaffMember, Order, Category, MenuItemVariant, RestaurantProfile

# ─── HELPER: GET DATA OWNER (SaaS Logic) ───
def get_data_owner(request):
    """Staff ko unke owner ka data dikhane ke liye helper."""
    if hasattr(request.user, 'staff_profile'):
        return request.user.staff_profile.owner
    return request.user

# ─── CUSTOM DECORATOR: ACCESS CONTROL ───
def owner_only(view_func):
    """Sirf Restaurant Owners ke liye, Staff ke liye nahi."""
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if hasattr(request.user, 'staff_profile'):
            return redirect('kitchen_orders')
        return view_func(request, *args, **kwargs)
    return _wrapped_view

# 1. User Registration
def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, f'Account created! You can now login.')
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'dashboard/register.html', {'form': form})

# 2. Dashboard Overview
@login_required
@owner_only
def dashboard_overview(request):
    today = timezone.now().date()
    total_sales = Order.objects.filter(user=request.user, status='served', created_at__date=today).aggregate(Sum('total_price'))['total_price__sum'] or 0
    active_tables = Table.objects.filter(user=request.user, status='occupied').count()
    total_tables = Table.objects.filter(user=request.user).count()
    pending_orders = Order.objects.filter(user=request.user, status='pending').count()
    recent_activity_objects = Order.objects.filter(user=request.user).order_by('-created_at')[:8]

    chart_labels, chart_values = [], []
    for i in range(6, -1, -1):
        day = today - timezone.timedelta(days=i)
        day_sales = Order.objects.filter(user=request.user, status='served', created_at__date=day).aggregate(Sum('total_price'))['total_price__sum'] or 0
        chart_labels.append(day.strftime('%a'))
        chart_values.append(float(day_sales))

    context = {
        'total_sales': total_sales, 'active_tables': active_tables, 'total_tables': total_tables,
        'pending_orders': pending_orders, 'recent_activity_objects': recent_activity_objects,
        'chart_labels': chart_labels, 'chart_values': chart_values, 'active_page': 'dashboard',
    }
    return render(request, 'dashboard/dashboard.html', context)

# 3. Staff Management
@login_required
@owner_only 
def staff(request):
    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'add_staff':
            username = request.POST.get('staff_username')
            if User.objects.filter(username=username).exists():
                messages.error(request, "Username already exists!")
            else:
                new_user = User.objects.create_user(username=username, email=request.POST.get('staff_email'), password=request.POST.get('staff_password'))
                StaffMember.objects.create(
                    owner=request.user, staff_user=new_user, 
                    name=request.POST.get('name'), role=request.POST.get('role'),
                    shift=request.POST.get('shift', 'Morning'), salary=int(request.POST.get('salary', 0)),
                    status='active'
                )
                messages.success(request, f"Staff '{username}' added successfully!")
        
        elif action == 'delete_staff':
            staff_id = request.POST.get('staff_id')
            staff_obj = get_object_or_404(StaffMember, id=staff_id, owner=request.user)
            if staff_obj.staff_user: staff_obj.staff_user.delete()
            staff_obj.delete()
            messages.info(request, "Staff member removed.")
            
        return redirect('staff')

    staff_list = StaffMember.objects.filter(owner=request.user)
    context = {
        'staff_members': staff_list, 'active_count': staff_list.filter(status='active').count(),
        'total_salary': sum(s.salary for s in staff_list), 'active_page': 'staff',
    }
    return render(request, 'dashboard/staff.html', context)

# 4. Menu Manager
@login_required
@owner_only
def menu_manager(request):
    if request.method == 'POST':
        action = request.POST.get('action')
        
        if action == 'add_category':
            name = request.POST.get('cat_name')
            if name: Category.objects.get_or_create(user=request.user, name=name)
        
        elif action == 'edit_category':
            cat = get_object_or_404(Category, id=request.POST.get('cat_id'), user=request.user)
            cat.name = request.POST.get('cat_name'); cat.save()
        
        elif action == 'delete_category':
            Category.objects.filter(id=request.POST.get('cat_id'), user=request.user).delete()
        
        elif action == 'add_item':
            cat = get_object_or_404(Category, id=request.POST.get('category_id'), user=request.user)
            MenuItem.objects.create(
                user=request.user, 
                name=request.POST.get('name'), 
                category=cat, 
                price=float(request.POST.get('price', 0)),
                description=request.POST.get('description'),
                image=request.FILES.get('image')
            )
        
        elif action == 'edit_item':
            item_id = request.POST.get('item_id')
            item = get_object_or_404(MenuItem, id=item_id, user=request.user)
            item.name = request.POST.get('name')
            item.price = float(request.POST.get('price', 0))
            item.description = request.POST.get('description')
            if request.FILES.get('image'):
                item.image = request.FILES.get('image')
            item.save()
        
        elif action == 'add_variant':
            item = get_object_or_404(MenuItem, id=request.POST.get('item_id'), user=request.user)
            MenuItemVariant.objects.create(item=item, size_name=request.POST.get('size_name'), price=float(request.POST.get('price', 0)))
        
        elif action == 'delete_variant':
            MenuItemVariant.objects.filter(id=request.POST.get('variant_id'), item__user=request.user).delete()

        return redirect('menu_manager')

    context = {
        'menu_items': MenuItem.objects.filter(user=request.user).prefetch_related('variants'),
        'categories': Category.objects.filter(user=request.user),
        'active_page': 'menu',
    }
    return render(request, 'dashboard/menu_manager.html', context)

# 5. Settings View
@login_required
@owner_only
def settings_view(request):
    profile, created = RestaurantProfile.objects.get_or_create(user=request.user)
    
    if request.method == 'POST':
        action = request.POST.get('action')
        
        if action == 'update_profile':
            profile.restaurant_name = request.POST.get('restaurant_name')
            profile.phone = request.POST.get('phone')
            profile.address = request.POST.get('address')
            profile.gst_percentage = Decimal(request.POST.get('gst_percentage', '5.00'))
            profile.save()
            
            new_email = request.POST.get('email')
            if new_email:
                request.user.email = new_email
                request.user.save()
            
            messages.success(request, "Settings updated successfully!")

        elif action == 'change_password':
            old_pass = request.POST.get('old_password')
            new_pass = request.POST.get('new_password')
            if request.user.check_password(old_pass):
                request.user.set_password(new_pass)
                request.user.save()
                update_session_auth_hash(request, request.user)
                messages.success(request, "Password changed successfully!")
            else:
                messages.error(request, "Old password was incorrect.")
        
        return redirect('settings')

    return render(request, 'dashboard/settings.html', {
        'profile': profile,
        'active_page': 'settings'
    })

# 6. Kitchen Display
@login_required
def kitchen_orders(request):
    owner = get_data_owner(request)
    profile, created = RestaurantProfile.objects.get_or_create(user=owner)
    orders = Order.objects.filter(user=owner).exclude(status='served').order_by('created_at')
    context = {
        'orders': orders, 'tables': Table.objects.filter(user=owner),
        'menu_items': MenuItem.objects.filter(user=owner).prefetch_related('variants'),
        'categories': Category.objects.filter(user=owner), 
        'active_page': 'kitchen',
        'profile': profile
    }
    return render(request, 'dashboard/kitchen.html', context)

# 7. Floor Plan (UPDATED: Number to Name)
@login_required
@owner_only
def floor_plan(request):
    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'add_table':
            name = request.POST.get('name') # 'number' ki jagah 'name'
            domain = request.get_host()
            # Link generation ab name use karega
            link = f"http://{domain}/order/{request.user.username}/{name}/"
            if name: 
                Table.objects.get_or_create(
                    user=request.user, 
                    name=name, 
                    defaults={'qr_link': link, 'capacity': request.POST.get('capacity', 4)}
                )
        elif action == 'delete_table':
            Table.objects.filter(id=request.POST.get('table_id'), user=request.user).delete()
        return redirect('floor_plan')
    context = {'tables': Table.objects.filter(user=request.user), 'active_page': 'floor_plan'}
    return render(request, 'dashboard/floor_plan.html', context)

# 8. Order Placement API (UPDATED: Queries by Name)
@csrf_exempt
def place_order_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            owner = get_data_owner(request) if request.user.is_authenticated else User.objects.get(username=data['username'])
            # 'number' field ko 'name' se badla gaya
            table = Table.objects.get(user=owner, name=data['table_num']) 
            payload = {'items': data['items'], 'customer_phone': data.get('phone_number', 'Staff Order')}
            Order.objects.create(user=owner, table=table, items_json=json.dumps(payload), total_price=Decimal(str(data['total'])))
            table.status = 'occupied'
            table.current_amount = (table.current_amount or 0) + Decimal(str(data['total']))
            table.items_count = (table.items_count or 0) + len(data['items'])
            table.save()
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

# 9. Billing & POS
@login_required
@owner_only
def billing_pos(request):
    profile, created = RestaurantProfile.objects.get_or_create(user=request.user)
    active_orders = Order.objects.filter(user=request.user, table__status='occupied').exclude(status='served')
    context = {
        'menu_items': MenuItem.objects.filter(user=request.user),
        'tables': Table.objects.filter(user=request.user),
        'categories': Category.objects.filter(user=request.user),
        'orders': active_orders, 
        'active_page': 'billing',
        'profile': profile
    }
    return render(request, 'dashboard/billing_pos.html', context)

# 10. APIs and Utils (UPDATED: Settle Bill queries by Name)
@csrf_exempt
@login_required
def settle_bill_api(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # number ki jagah name
        table = get_object_or_404(Table, user=request.user, name=data.get('table_num'))
        Order.objects.filter(user=request.user, table=table).exclude(status='served').update(status='served')
        table.status, table.current_amount, table.items_count = 'available', Decimal('0.00'), 0
        table.save()
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'}, status=400)

@csrf_exempt
@login_required
def update_order_status(request, order_id):
    owner = get_data_owner(request)
    order = get_object_or_404(Order, id=order_id, user=owner)
    if request.method == 'POST':
        new_status = request.POST.get('status')
        if new_status in ['preparing', 'cooked', 'served']:
            order.status = new_status; order.save()
            return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'}, status=400)

@login_required
def get_order_details_api(request, order_id):
    owner = get_data_owner(request)
    order = get_object_or_404(Order, id=order_id, user=owner)
    data = json.loads(order.items_json) if order.items_json else {}
    return JsonResponse({'status': 'success', 'items': data.get('items', [])})

@csrf_exempt
@login_required
def edit_order_api(request, order_id):
    owner = get_data_owner(request)
    order = get_object_or_404(Order, id=order_id, user=owner)
    if request.method == 'POST':
        data = json.loads(request.body)
        order.items_json = json.dumps(data['items_payload'])
        order.total_price = Decimal(str(data['total_price']))
        order.save()
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'}, status=400)

# UPDATED: table_num rename to table_name for clarity
def customer_menu(request, username, table_name):
    owner = get_object_or_404(User, username=username)
    table = get_object_or_404(Table, user=owner, name=table_name)
    return render(request, 'dashboard/customer_menu.html', {
        'table': table, 'owner': owner, 
        'menu_items': MenuItem.objects.filter(user=owner),
        'categories': Category.objects.filter(user=owner)
    })

@login_required
@owner_only
def order_history(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    history_list = []
    for o in orders:
        data = json.loads(o.items_json) if o.items_json else {}
        history_list.append({'order': o, 'phone': data.get('customer_phone', 'N/A'), 'items': data.get('items', [])})
    return render(request, 'dashboard/history.html', {'history_data': history_list, 'active_page': 'history'})

# UPDATED: Activity logging uses name
@login_required
def latest_orders_api(request):
    today = timezone.now().date()
    new_orders = Order.objects.filter(user=request.user, is_notified=False)
    new_activities = []
    for order in new_orders:
        new_activities.append({
            'action': f"New Order: Table {order.table.name}", 
            'amount': f"{order.total_price}", 
            'table': order.table.name, 
            'id': order.id
        })
        order.is_notified = True; order.save()
    total_sales = Order.objects.filter(user=request.user, status='served', created_at__date=today).aggregate(Sum('total_price'))['total_price__sum'] or 0
    return JsonResponse({'total_pending': Order.objects.filter(user=request.user, status='pending').count(), 'total_sales': float(total_sales), 'new_activities': new_activities})