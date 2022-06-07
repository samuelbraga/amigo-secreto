resource "aws_ecs_service" "frontend" {
  name            = "frontend"
  cluster         = aws_ecs_cluster.cluster_ecs.arn
  task_definition = aws_ecs_task_definition.frontend.id
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [module.frontend_service_security_group.security_group_id]
    subnets          = ["subnet-02f77cc9bcbc026bf", "subnet-054ea7573cf33fc47", "subnet-0b824bc893c403af0"]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend.arn
    container_name   = "frontend"
    container_port   = 80
  }

  depends_on = [aws_lb_listener.frontend]

  tags = {
    Name        = "amigo-oculto-service-frontend"
    Terraform   = "true"
    Environment = "amigo-oculto"
  }
}
