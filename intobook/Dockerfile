FROM openjdk:8-jdk-alpine
COPY build/libs/intobook-0.0.1-SNAPSHOT.jar app.jar
COPY src/main/resources/reboot-623ba-firebase-adminsdk-zj8bg-d7fdba28b4.json /app/fcm.json
ENV SPRING_PROFILES_ACTIVE=prod
ENV FCM_CERTIFICATION=/app/fcm.json
ENTRYPOINT ["java", "-jar", "app.jar"]