import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getallevents = async (req, res) => {
  res.send(await prisma.events.findMany());
};
export const create_an_event = async (req, res) => {
  const error_results = validationResult(req);
  if (!error_results.isEmpty()) {
    return res.send(error_results);
  } else {
 
 
 
  const { body } = req;
  body.date = new Date(body.date);
  console.log(typeof body.date);

  const new_data = await prisma.events.create({
    data: {
      ...body,
    },
  });
  res.send(new_data);}
};

export const getbyid = async (req, res) => {
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

export const deletebyid = async (req, res) => {
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

export const updateevent = async (req, res) => {
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
  res.send(updated_data);
};
