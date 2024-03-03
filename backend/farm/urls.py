from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path("", views.home, name="home"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("docs/", views.user_list_view),
    path("docs/<int:pk>/", views.user_detail_view),
    path("signup/", views.farmer_list_view),
    path("login/", views.login_view),
    path("logout/", views.logout_view),
    path("animals/", views.animal_list_view),
    path("animals/<int:pk>/", views.animal_detail_view),
    path('update/<int:pk>/',views.animal_update_view, name='animal-update'),
    path("categories/", views.category_list),
    path("cart/", views.cart_list),
    path("orders/", views.order_list_create_view),
    path("orders/<int:pk>/delete/", views.destroy_orders_list),
    path("list/", views.filtered_farmer),
    path('stk/', views.stk_push, name='stk_push'),
]
