import { PrismaClient } from "@prisma/client";
import { validationResult,matchedData} from "express-validator"
const prisma = new PrismaClient();

export const get_all_events = async (req, res) => {


  res.send(await prisma.events.findMany());
};
export const create_an_event = async (req, res) => {
  const error_results = validationResult(req);
  if (!error_results.isEmpty()) {
    return res.send(error_results);
  } else {
 const data_s = matchedData(req)
 
 

data_s.date = new Date(data_s.date);
  console.log(typeof data_s.date);

  const new_data = await prisma.events.create({
    data: {
      ...data_s,
    },
  });
  res.send(new_data);} 
};

export const get_by_id = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await prisma.events.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  
  res.send(user);
};

export const delete_by_id = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await prisma.events.delete({
    where: {
      id: parseInt(id),
    },
  });
  
  res.send(user);
};

export const update_event = async (req, res) => {
  const { params :{id},body } = req;
  if (body.date ) {
    body.date = new Date(body.date);
  }

  const updated_data = await prisma.events.update({
    data: {
      ...body,
    },
    where: {
      id: parseInt(id),
    },
  });
  // if (updated_data ===null ){
  //   res.status(404).send("user not found")
  
  // }
  res.send(updated_data);
};
