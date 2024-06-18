import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const event_info = async (req,res,next) =>{
const {
    params: { id },
  } = req;
  const user = await prisma.events.findUnique({
    where: {
      id: parseInt(id),
    },
  });
if (user ===null ){
  res.status(404).send("user not found")

}else{

next()}
}