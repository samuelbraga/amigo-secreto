module "backend_lb_security_group" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "backend-amigo-oculto-lb"
  description = "Security Group para o load balance do backend"

  vpc_id = module.vpc.vpc_id

  ingress_with_cidr_blocks = [
    {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = "0.0.0.0/0"
    }
  ]

  egress_with_cidr_blocks = [
    {
      from_port   = 0
      to_port     = 0
      protocol    = -1
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 0
      to_port     = 0
      protocol    = -1
      cidr_blocks = "10.0.0.0/16"
    },
  ]

  tags = {
    Name        = "backend-amigo-oculto-lb"
    Terraform   = "true"
    Environment = "amigo-oculto"
  }
}

module "backend_service_security_group" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "backend-amigo-oculto-service"
  description = "Security Group para o service do backend"

  vpc_id = module.vpc.vpc_id

  ingress_with_cidr_blocks = [
    {
      from_port   = 80
      to_port     = 80
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
    {
      from_port   = 0
      to_port     = 0
      protocol    = -1
      cidr_blocks = "10.0.0.0/16"
    },
  ]

  tags = {
    Name        = "backend-amigo-oculto-service"
    Terraform   = "true"
    Environment = "amigo-oculto"
  }
}
