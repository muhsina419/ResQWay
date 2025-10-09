from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.views import UserViewSet, IncidentViewSet, HospitalViewSet, AmbulanceViewSet, request_ambulance

# DRF router for viewsets
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'incidents', IncidentViewSet)
router.register(r'hospitals', HospitalViewSet)
router.register(r'ambulances', AmbulanceViewSet)

urlpatterns = [
    # API endpoints
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/request-ambulance/', request_ambulance, name='request_ambulance'),

    # Admin site
    path('admin/', admin.site.urls),
]
