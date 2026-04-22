#!/bin/bash

echo "🚀 Starting services..."

# Check Docker access
if ! docker ps > /dev/null 2>&1; then
  echo "❌ Docker permission issue. Run:"
  echo "   sudo usermod -aG docker \$USER && newgrp docker"
  exit 1
fi

# Start RabbitMQ if not already running
if [ "$(docker ps -q -f name=rabbitmq)" ]; then
  echo "✅ RabbitMQ already running"
else
  if [ "$(docker ps -aq -f name=rabbitmq)" ]; then
    echo "🔁 Restarting existing RabbitMQ container..."
    docker start rabbitmq
  else
    echo "🐰 Starting new RabbitMQ container..."
    docker run -d \
      --name rabbitmq \
      --restart unless-stopped \
      -p 5672:5672 \
      -p 15672:15672 \
      rabbitmq:3-management
  fi
fi

# Run docker compose
echo "📦 Starting docker compose services..."
docker compose up -d --build

echo "✅ All services started!"
