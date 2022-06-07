resource "aws_ecs_task_definition" "frontend" {
  family                   = "amigo-oculto"
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
      "networkMode": "awsvpc",
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "${aws_cloudwatch_log_group.logs.name}",
          "awslogs-region": "${var.aws_region}",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
  DEFINITION
}
