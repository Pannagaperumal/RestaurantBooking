# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import User
from .serializers import UserSerializer

class LoginView(APIView):
    @swagger_auto_schema(
        operation_description="Login with phone number and username",
        request_body=UserSerializer,
        responses={
            200: openapi.Response('JWT Token', schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'refresh': openapi.Schema(type=openapi.TYPE_STRING, description='Refresh token'),
                    'access': openapi.Schema(type=openapi.TYPE_STRING, description='Access token'),
                },
            )),
            400: 'Bad Request'
        },
        tags=['Authentication']
    )
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            phone = serializer.validated_data['phone']
            username = serializer.validated_data['username']

            user = User.objects.filter(phone=phone).first()

            if user:
                # if user.username != username:
                #     return Response({'detail': 'Username does not match with the phone number.'}, status=status.HTTP_400_BAD_REQUEST)
                pass
            else:
                user = User.objects.create(phone=phone, username=username)

            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
