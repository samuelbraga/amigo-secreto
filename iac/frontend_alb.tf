resource "aws_lb" "frontend" {
  name               = "amigo-oculto-frontend"
  load_balancer_type = "application"
  subnets            = ["subnet-02f77cc9bcbc026bf", "subnet-054ea7573cf33fc47", "subnet-0b824bc893c403af0"]

  security_groups = [module.frontend_lb_security_group.security_group_id]

  tags = {
    Name = "load balancer service ecs"
  }
}

resource "aws_lb_target_group" "frontend" {
  name                 = "frontend"
  port                 = 80
  protocol             = "HTTP"
  vpc_id               = "vpc-03f99d7f0db04e8ef"
  target_type          = "ip"
  deregistration_delay = "300"

  health_check {
    healthy_threshold   = 5
    unhealthy_threshold = 5
    interval            = 60
    path                = "/"
  }

  tags = {
    Name        = "amigo-oculto-lb-frontend"
    Terraform   = "true"
    Environment = "amigo-oculto"
  }
}

resource "aws_lb_listener" "frontend" {
  load_balancer_arn = aws_lb.frontend.id
  port              = 80
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.frontend.id
    type             = "forward"
  }
}
