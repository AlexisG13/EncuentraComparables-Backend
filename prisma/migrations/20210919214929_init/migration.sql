-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userAuthId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAuth" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL,

    CONSTRAINT "UserAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estate" (
    "id" TEXT NOT NULL,
    "websiteCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Estate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteEstate" (
    "id" TEXT NOT NULL,
    "estateId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FavoriteEstate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reportId" TEXT,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_userAuthId_unique" ON "User"("userAuthId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAuth_email_key" ON "UserAuth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Estate_websiteCode_key" ON "Estate"("websiteCode");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userAuthId_fkey" FOREIGN KEY ("userAuthId") REFERENCES "UserAuth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteEstate" ADD CONSTRAINT "FavoriteEstate_estateId_fkey" FOREIGN KEY ("estateId") REFERENCES "Estate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteEstate" ADD CONSTRAINT "FavoriteEstate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;
