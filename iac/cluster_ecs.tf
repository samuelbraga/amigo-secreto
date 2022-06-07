resource "aws_ecs_cluster" "cluster_ecs" {
  name = "amigo-oculto"

  tags = {
    Name        = "amigo-oculto-ecs"
    Terraform   = "true"
    Environment = "amigo-oculto"
  }
}
