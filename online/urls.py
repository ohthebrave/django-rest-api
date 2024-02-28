from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="about"),
    path("docs/", views.user_list_view),
    path("docs/<int:pk>/", views.user_detail_view),
    path("signup/", views.farmer_list_view),
    path("login/", views.login_view),
    path("logout/", views.logout_view),
    path("animals/", views.animal_list_view),
    path("categories/", views.category_list),
    path("cart/", views.cart_list),
    path("order/", views.order_create),
    path("animals_filter/", views.filtered_animal),
    path('stk/', views.stk_push, name='stk_push'),
]
