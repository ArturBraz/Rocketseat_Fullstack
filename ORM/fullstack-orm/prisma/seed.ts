import { prisma } from "@/prisma";

async function seed() {
  await prisma.user.createMany({
    data:[
      {name: "Moisés Fausto",email: "mosess@mail.com"},
      {name: "Jairo Gomes",email: "jair0@mail.com"},
      {name: "Sheila Neves",email: "she1la@mail.com"},
      {name: "Beatriz Orlando",email: "b_o@mail.com"},
    ]
  })
}
seed().then(()=>{
  console.log("Database seeded!")
  prisma.$disconnect()
})