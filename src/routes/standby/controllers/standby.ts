import { fetchFlights } from "../helpers/fetch-flights";
import { isValidQuery } from "../helpers/helpers";
import { parseFlights } from "../helpers/parse-flights";

export class Controller {
  public async root(req: any, res: any) {
    const { code, role, base, day } = req.query;

    const isValid = isValidQuery(req.query);
    if (isValid.error) return res.status(200).send(isValid.error);

    console.log(
      `Searching flights from ${base} without ${role} for ${day} for ${code}.`
    );

    try {
      const flights = await fetchFlights({ sampleData: false });

      const output = parseFlights(flights, req.query);
      res.status(200).send(output);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export const StandbyController = new Controller();
