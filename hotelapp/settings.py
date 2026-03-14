"""
Django settings for hotelapp project.
"""
import os
import dj_database_url
import cloudinary # SDK configuration ke liye
import cloudinary.uploader
import cloudinary.api
from pathlib import Path
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# --- Load .env file explicitly ---
load_dotenv(BASE_DIR / '.env')

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
    'rest_framework',      # For Flutter App APIs
    'cloudinary',          # For permanent image storage
    'corsheaders',         # To allow Flutter app connections
    
    # Internal Apps
    'dashboard',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware', # Position is important
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


# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

if not DEBUG:
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# --- UPDATED: ROBUST CLOUDINARY CONFIGURATION (Hardcoded for Debugging) ---

# SDK configuration for manual uploads and permission bypass
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

# Django-Cloudinary-Storage configuration
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'dsf6jykmx',
    'API_KEY': '942971569282224',
    'API_SECRET': 'rsRxF5AMCCpO0nAgRyHVHmtVaMI',
    'UPLOAD_PRESET': 'bhagyesh_final_test'
}

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Login/Logout redirects
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
LOGIN_URL = 'login'
LOGIN_REDIRECT_URL = 'dashboard'
LOGOUT_REDIRECT_URL = 'login'
LOGOUT_ON_GET = True