resource "aws_ecs_task_definition" "frontend" {
  family                   = "amigo-oculto-frontend"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_tasks_execution_role.arn
  container_definitions    = <<DEFINITION
  [
    {
      "name": "frontend",
      "image": "nginx",
      "portMappings": [
        {
          "containerPort": 80,
          "hostPort": 80
        }
      ],
      "environment": [
        {
          "name": "API_BASE_URL",
          "value": "http://api.mumuz.in/v1"
        }
      ],
      "networkMode": "awsvpc",
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "amigo-oculto",
          "awslogs-region": "us-east-2",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
  DEFINITION
}
