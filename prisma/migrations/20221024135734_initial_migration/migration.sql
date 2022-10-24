-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY', 'ALL');

-- CreateTable
CREATE TABLE "Students" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurants" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestaurantOwners" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "RestaurantOwners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menus" (
    "id" TEXT NOT NULL,
    "weekday" "WeekDay" NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "restaurantsId" TEXT,

    CONSTRAINT "Menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItens" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "menusId" TEXT,

    CONSTRAINT "MenuItens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_password_key" ON "Students"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Students_email_key" ON "Students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Students_phoneNumber_key" ON "Students"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantOwners_password_key" ON "RestaurantOwners"("password");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantOwners_email_key" ON "RestaurantOwners"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantOwners_phoneNumber_key" ON "RestaurantOwners"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantOwners_restaurantId_key" ON "RestaurantOwners"("restaurantId");

-- AddForeignKey
ALTER TABLE "RestaurantOwners" ADD CONSTRAINT "RestaurantOwners_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menus" ADD CONSTRAINT "Menus_restaurantsId_fkey" FOREIGN KEY ("restaurantsId") REFERENCES "Restaurants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItens" ADD CONSTRAINT "MenuItens_menusId_fkey" FOREIGN KEY ("menusId") REFERENCES "Menus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
