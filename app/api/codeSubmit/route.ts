import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/lib/redisClient';
console.log("Compilation Complete");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { problemId, userId, code, language } = req.body;
    try {
      await client.lPush('submissions', JSON.stringify({ problemId, userId, code, language }));
      res.status(200).json({ message: "Submission successful" });
      console.log("Submission successful");
    } catch (err) {
      res.status(500).json({ message: `Submission failed: ${err}` });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
