module "db" {
  source = "terraform-aws-modules/rds/aws"

  identifier = "amigo-oculto"

  engine            = "postgres"
  engine_version    = "13.6"
  instance_class    = "db.t3.small"
  allocated_storage = 20
  family            = "postgres13"


  db_name  = "amigo_oculto"
  username = "postgres"
  port     = "5432"

  publicly_accessible    = true
  create_db_subnet_group = true
  vpc_security_group_ids = ["sg-08800afad0112f4f5"]
  subnet_ids             = ["subnet-02f77cc9bcbc026bf", "subnet-054ea7573cf33fc47", "subnet-0b824bc893c403af0"]

  tags = {
    Terraform   = "true"
    Environment = "amigo-oculto"
  }
}
