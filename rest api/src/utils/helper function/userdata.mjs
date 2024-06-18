import { read_data } from "../database/database.mjs";
export const userinfo = (req, res, next) => {
    const {
      params: { id },
    } = req;
    const parse_id = parseInt(id);
    console.log(parse_id);
  
  
    if (isNaN(parse_id)) {
      return res.status(400).json({
        error: "Id must be a number!!!",
      });
    }
  
    const find_user_id = read_data.findIndex((event) => {
      return event.id === parse_id;
    });
  
    if (find_user_id === -1) {
      return res.status(404).json({
        error: "Event does not exist",
        info: "learn what error 404 is!!!",
      });
    }
    req.find_user_id = find_user_id;
  
    next();
  };
  