# Use the official Rasa image as the base image
FROM rasa/rasa:3.0.0

# Set the working directory inside the container
WORKDIR /app

# Copy the entire Rasa project directory into the container
COPY . /app

# Install any additional dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port that Rasa server runs on
EXPOSE 5005

# Set the entry point command to train the model and run the Rasa server
ENTRYPOINT ["rasa"]
CMD ["run", "--enable-api", "--cors", "*", "-p", "5005"]
