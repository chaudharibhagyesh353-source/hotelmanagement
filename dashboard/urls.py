from django.urls import path
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static
from . import views

# NEW: Flutter app login ke liye Token views import karein
from rest_framework.authtoken import views as auth_views_drf

urlpatterns = [
    # 1. Authentication (Login/Logout/Register)
    path('', auth_views.LoginView.as_view(template_name='dashboard/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('register/', views.register, name='register'),
    
    # 2. Main Dashboard & Management (User Isolated)
    path('dashboard/', views.dashboard_overview, name='dashboard'),
    path('floor-plan/', views.floor_plan, name='floor_plan'),
    path('menu/', views.menu_manager, name='menu_manager'),
    path('billing/', views.billing_pos, name='billing_pos'),
    path('staff/', views.staff, name='staff'),
    
    # --- Restaurant Settings ---
    path('settings/', views.settings_view, name='settings'),
    
    # Permanent record management for manager insights
    path('history/', views.order_history, name='order_history'),

    # 3. Password Reset Flow (FIXED: Corrected PasswordResetDoneView)
    path('password-reset/', 
         auth_views.PasswordResetView.as_view(template_name='dashboard/password_reset.html'), 
         name='password_reset'),
    path('password-reset/done/', 
         auth_views.PasswordResetDoneView.as_view(template_name='dashboard/password_reset_done.html'), 
         name='password_reset_done'),
    path('password-reset-confirm/<uidb64>/<token>/', 
         auth_views.PasswordResetConfirmView.as_view(template_name='dashboard/password_reset_confirm.html'), 
         name='password_reset_confirm'),
    path('password-reset-complete/', 
         auth_views.PasswordResetCompleteView.as_view(template_name='dashboard/password_reset_complete.html'), 
         name='password_reset_complete'),

    # 4. QR Ordering & SaaS APIs (Using <str:> to allow name-based table URLs)
    path('order/<str:username>/<str:table_name>/', views.customer_menu, name='customer_menu'),
    path('api/place-order/', views.place_order_api, name='place_order_api'),
    path('api/latest-orders/', views.latest_orders_api, name='latest_orders_api'),
    
    # Kitchen Display System & Order Management
    path('kitchen/', views.kitchen_orders, name='kitchen_orders'),
    path('api/update-order-status/<int:order_id>/', views.update_order_status, name='update_status'),
    
    # APIs for KDS Order Details & Editing
    path('api/get-order-details/<int:order_id>/', views.get_order_details_api, name='get_order_details_api'),
    path('api/edit-order/<int:order_id>/', views.edit_order_api, name='edit_order_api'),

    # Bill Settlement & Table Reset Logic
    path('api/settle-bill/', views.settle_bill_api, name='settle_bill_api'),

    # ─── 5. UPDATED: MOBILE APP (FLUTTER) APIs ───
    # Isi endpoint par Flutter app username/password bhejkar Token lega
    path('api/v1/login/', auth_views_drf.obtain_auth_token, name='api_login'),
    
    # Data fetch karne ke liye endpoints
    path('api/v1/menu-items/', views.get_menu_api, name='api_menu_items'),
    path('api/v1/tables-status/', views.get_tables_api, name='api_tables_status'),
    path('api/v1/restaurant-profile/', views.get_profile_api, name='api_profile'),
]

# Serving Media Files (Images for Menu Items)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)