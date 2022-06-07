module "db_security_group" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "db-amigo-oculto"
  description = "Security Group para o banco de dados"

  vpc_id = module.vpc.vpc_id

  ingress_with_cidr_blocks = [
    {
      from_port   = 0
      to_port     = 5432
      protocol    = "tcp"
      cidr_blocks = "10.0.0.0/16"
    }
  ]

  egress_with_cidr_blocks = [
    {
      from_port   = 0
      to_port     = 0
      protocol    = -1
      cidr_blocks = "0.0.0.0/0"
    },
  ]

  tags = {
    Name        = "db-amigo-oculto"
    Terraform   = "true"
    Environment = "amigo-oculto"
  }
}
