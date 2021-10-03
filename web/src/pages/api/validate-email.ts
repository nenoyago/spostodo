import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const { email } = request.body;

    const { data } = await axios.get(`${process.env.API_LAYER}/check`, {
      params: {
        access_key: process.env.API_LAYER_KEY,
        email: String(email)
      }
    });


    if (data.error) {
      return response.status(500).json({ message: data.error.info });
    }

    const responseData = {
      email,
      didYouMean: data.did_you_mean,
      formatValid: data.format_valid,
      mxFound: data.mx_found
    }

    return response.status(200).json(responseData);
  }

}