from django.urls import path
from django.contrib.auth import views as auth_views
from django.conf import settings # NEW IMPORT
from django.conf.urls.static import static # NEW IMPORT
from . import views

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

    # 3. Password Reset Flow (Full setup preserved)
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

    # 4. QR Ordering & SaaS APIs
    path('order/<str:username>/<int:table_num>/', views.customer_menu, name='customer_menu'),
    path('api/place-order/', views.place_order_api, name='place_order_api'),
    path('api/latest-orders/', views.latest_orders_api, name='latest_orders_api'),
    
    # Kitchen Display System & Order Management
    path('kitchen/', views.kitchen_orders, name='kitchen_orders'),
    path('api/update-order-status/<int:order_id>/', views.update_order_status, name='update_status'),
    
    # CRITICAL: These paths solve the Edit/Cancel button issue in KDS
    path('api/get-order-details/<int:order_id>/', views.get_order_details_api, name='get_order_details_api'),
    path('api/edit-order/<int:order_id>/', views.edit_order_api, name='edit_order_api'),

    # Bill Settlement & Table Reset Logic
    path('api/settle-bill/', views.settle_bill_api, name='settle_bill_api'),
]

# --- THE FIX: Serving Media Files in Development ---
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)