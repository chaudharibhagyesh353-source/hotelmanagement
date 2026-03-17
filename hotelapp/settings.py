"""
Django settings for hotelapp project.
"""
import os
import dj_database_url
import cloudinary 
import cloudinary.uploader
import cloudinary.api
import firebase_admin # NEW: Firebase Admin SDK ✅
from firebase_admin import credentials # NEW: Firebase credentials ✅
from pathlib import Path
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# --- Load .env file explicitly ---
load_dotenv(BASE_DIR / '.env')

# --- NEW: FIREBASE ADMIN SDK INITIALIZATION --- ✅
# Is block se Django aur Firebase aapas mein connect ho jayenge
try:
    # Maan lijiye aapne file ka naam 'firebase_key.json' rakha hai
    FIREBASE_KEY_PATH = os.path.join(BASE_DIR, 'firebase_key.json')
    
    if os.path.exists(FIREBASE_KEY_PATH):
        cred = credentials.Certificate(FIREBASE_KEY_PATH)
        firebase_admin.initialize_app(cred)
        print("Successfully connected to Firebase Admin SDK!")
    else:
        print("Warning: Firebase key file not found at", FIREBASE_KEY_PATH)
except Exception as e:
    print(f"Error initializing Firebase: {e}")


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-a#v2bu#7^dmdm&)h=9*%q+j*v7v_&!()*sty=f(n=05=g%opmh')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'True').lower() == 'true' if 'RENDER' in os.environ else True

# ALLOWED_HOSTS configuration for Render and Local
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']

render_external_hostname = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if render_external_hostname:
    ALLOWED_HOSTS.append(render_external_hostname)

extra_hosts = os.environ.get('ALLOWED_HOSTS')
if extra_hosts:
    ALLOWED_HOSTS.extend(extra_hosts.split(','))


# Application definition

INSTALLED_APPS = [
    'cloudinary_storage', # MUST be before staticfiles
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third Party Apps
    'rest_framework',      
    'rest_framework.authtoken',
    'cloudinary',          
    'corsheaders',         
    
    # Internal Apps
    'dashboard',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware', 
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Allow Flutter App connections
CORS_ALLOW_ALL_ORIGINS = True 

ROOT_URLCONF = 'hotelapp.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.media', 
            ],
        },
    },
]

WSGI_APPLICATION = 'hotelapp.wsgi.application'


# Database Configuration
DATABASES = {
    'default': dj_database_url.config(
        default='sqlite:///' + os.path.join(BASE_DIR, 'db.sqlite3'),
        conn_max_age=600
    )
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# --- STATIC & MEDIA FILES CONFIGURATION ---
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STORAGES = {
    "default": {
        "BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.StaticFilesStorage",
    },
}

WHITENOISE_MANIFEST_STRICT = False
WHITENOISE_USE_FINDERS = True

STATICFILES_STORAGE = 'whitenoise.storage.StaticFilesStorage'
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# --- ROBUST CLOUDINARY CONFIGURATION ---
cloudinary.config(
    cloud_name = os.environ.get('CLOUDINARY_CLOUD_NAME',),
    api_key = os.environ.get('CLOUDINARY_API_KEY'),
    api_secret = os.environ.get('CLOUDINARY_API_SECRET'),
    secure = True
)

CLOUDINARY_STORAGE = {
    'CLOUDINARY_CLOUD_NAME': os.environ.get('CLOUDINARY_CLOUD_NAME'),
    'CLOUDINARY_API_KEY': os.environ.get('CLOUDINARY_API_KEY'),
    'CLOUDINARY_API_SECRET': os.environ.get('CLOUDINARY_API_SECRET'),
    'UPLOAD_PRESET': os.environ.get('UPLOAD_PRESET')
}


# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Login/Logout redirects
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
LOGIN_URL = 'login'
LOGIN_REDIRECT_URL = 'dashboard'
LOGOUT_REDIRECT_URL = 'login'
LOGOUT_ON_GET = True

# Django Rest Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication', 
        'rest_framework.authentication.SessionAuthentication', 
    ],
}