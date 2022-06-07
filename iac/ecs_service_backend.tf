resource "aws_ecs_service" "backend" {
  name            = "backend"
  cluster         = aws_ecs_cluster.cluster_ecs.arn
  task_definition = aws_ecs_task_definition.backend.id
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [module.backend_service_security_group.security_group_id]
    subnets          = ["subnet-02f77cc9bcbc026bf", "subnet-054ea7573cf33fc47", "subnet-0b824bc893c403af0"]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend.arn
    container_name   = "backend"
    container_port   = 80
  }

  depends_on = [aws_lb_listener.backend]

  tags = {
    Name        = "amigo-oculto-service-backend"
    Terraform   = "true"
    Environment = "amigo-oculto"
  }
}
