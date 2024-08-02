# Use a base image with Java runtime
FROM openjdk:17-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/EKA-backend-0.0.1-SNAPSHOT.jar /app/EKA-backend-0.0.1-SNAPSHOT.jar

# Expose port 8080 to the outside world
EXPOSE 8080

# Specify the command to run the JAR file
ENTRYPOINT ["java", "-jar", "EKA-backend-0.0.1-SNAPSHOT.jar"]
