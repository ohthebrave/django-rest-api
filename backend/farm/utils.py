import datetime
import jwt
from django.conf import settings


def generate_access_token(user):

    # Determine the user's role (e.g., based on a field in the User model)
    role = 'farmer' if user.is_farmer else 'admin' if user.is_admin else 'customer'
    
    payload = {
        'id': user.id,
        'name': user.username,
        'role': role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow()
    }
    access_token = jwt.encode(payload, 'secret', algorithm='HS256')

    return access_token


def generate_refresh_token(user):

    role = 'farmer' if user.is_farmer else 'admin' if user.is_admin else 'customer'
    
    payload = {
        'id': user.id,
        'name': user.username,
        'role': role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow()
    }

    refresh_token = jwt.encode(payload, 'secret', algorithm='HS256')
    
    return refresh_token