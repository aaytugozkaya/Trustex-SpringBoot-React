# Use OpenJDK 21 as the base image
FROM openjdk:21-jdk

# Set the JAVA_HOME environment variable
ENV JAVA_HOME=/usr/local/openjdk-21
ENV PATH=$JAVA_HOME/bin:$PATH
ENV DB_URL=jdbc:sqlserver://localhost:1433;databaseName=TrustEXDB;trustServerCertificate=true
ENV DB_USERNAME=sa
ENV DB_PASS=admin
ENV MAIL_USERNAME=aaytugozkaya@gmail.com
ENV MAIL_PASSWORD="quii yesl bgmc cksi"
# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and the project files to the container
COPY . .

# Run the Maven package command to build the application
RUN ./mvnw package -DskipTests

# Define the location of the JAR file to be copied
ARG JAR_FILE=target/trustex.jar

# Copy the generated JAR file to the container as app.jar
COPY ${JAR_FILE} app.jar

# Expose port 80
EXPOSE 80

# Set the entry point to run the JAR file
ENTRYPOINT ["java","-jar","app.jar"]
