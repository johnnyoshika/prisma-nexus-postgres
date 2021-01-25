/*
  Warnings:

  - You are about to drop the `_CategoryToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_B_fkey";

-- CreateTable
CREATE TABLE "post_category" (
    "category_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    PRIMARY KEY ("category_id","post_id")
);

-- DropTable
DROP TABLE "_CategoryToPost";

-- AddForeignKey
ALTER TABLE "post_category" ADD FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_category" ADD FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
