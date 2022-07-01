-- AlterTable
ALTER TABLE "group_user" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "invited_user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "invited_user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invited_user" ADD CONSTRAINT "invited_user_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
