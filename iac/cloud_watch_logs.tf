resource "aws_cloudwatch_log_group" "logs" {
  name = "amigo-oculto"

  tags = {
    Name        = "amigo-oculto-logs"
    Terraform   = "true"
    Environment = "amigo-oculto"
  }
}
