resource "aws_ecs_task_definition" "backend" {
  family                   = "amigo-oculto-backend"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_tasks_execution_role.arn
  container_definitions    = <<DEFINITION
  [
    {
      "name": "backend",
      "image": "nginx",
      "portMappings": [
        {
          "containerPort": 80,
          "hostPort": 80
        }
      ],
      "environment": [
        {
          "name": "BASE_URL",
          "value": "api.mumuz.in"
        },
        {
          "name": "POSRT",
          "value": "80"
        },
        {
          "name": "JWT_SECRET",
          "value": "${JWT_SECRET}"
        },
        {
          "name": "DATABASE_URL",
          "value": "${DATABASE_URL}"
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
