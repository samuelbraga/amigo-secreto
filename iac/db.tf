module "cluster" {
  source = "terraform-aws-modules/rds-aurora/aws"

  name           = "amigo-oculto"
  engine         = "aurora-postgresql"
  engine_version = "13.6"
  instance_class = "db.t4g.small"
  instances = {
    one = {}
    2 = {
      instance_class = "db.t4g.medium"
    }
  }

  vpc_id  = "vpc-03f99d7f0db04e8ef"
  subnets = ["subnet-072d3e61289094707", "subnet-010b351a8d5d9e6a9", "subnet-06fc2e1ab86624082"]

  allowed_security_groups = ["sg-08800afad0112f4f5"]

  storage_encrypted   = true
  apply_immediately   = true
  monitoring_interval = 10

  enabled_cloudwatch_logs_exports = ["postgresql"]

  tags = {
    Environment = "amigo-oculto"
    Terraform   = "true"
  }
}
